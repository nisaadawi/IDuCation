/*
 * IDuCation - RFID + Fingerprint Login System (Firebase Integration)
 * Hardware: ESP32
 * 
 * Pin Connections:
 * MFRC522 RFID:
 *   SDA    -> GPIO 4
 *   SCK    -> GPIO 18 (SPI default)
 *   MOSI   -> GPIO 23 (SPI default)
 *   MISO   -> GPIO 19 (SPI default)
 *   RST    -> GPIO 21
 *   3.3V   -> 3.3V
 *   GND    -> GND
 * 
 * Fingerprint Sensor (AS608):
 *   TX     -> GPIO 16 (RX)
 *   RX     -> GPIO 17 (TX)
 *   VCC    -> 3.3V or 5V
 *   GND    -> GND
 * 
 * Libraries Required:
 * - FirebaseESP32 (for ESP32)
 * - WiFi (built-in for ESP32)
 * - MFRC522
 * - Adafruit Fingerprint Sensor Library
 */

#include <SPI.h>
#include <MFRC522.h>
#include <HardwareSerial.h>
#include <Adafruit_Fingerprint.h>
#include <WiFi.h>  // ESP32 WiFi
#include <FirebaseESP32.h>  // ESP32 Firebase
#include "mbedtls/sha256.h"  // For proper SHA256 hashing
 
 // WiFi Credentials
 #define WIFI_SSID ""
 #define WIFI_PASSWORD ""
 
// Firebase Configuration
const char* FIREBASE_HOST = "";
const char* FIREBASE_AUTH = "";

// RFID Module Pins (ESP32)
#define SS_PIN 4     // SDA connected to GPIO 4
#define RST_PIN 21   // RST connected to GPIO 21
#define SCK_PIN 18
#define MOSI_PIN 23
#define MISO_PIN 19

// Must match PHP logic
const char* SECRET_SALT = "";
 
 // Fingerprint Module Pins (ESP32 - Using Serial2)
 // TX from sensor -> GPIO 16 (RX2)
 // RX to sensor   -> GPIO 17 (TX2)
 HardwareSerial fingerSerial(2); // Use Serial2 (GPIO 16=RX, GPIO 17=TX)
 Adafruit_Fingerprint finger = Adafruit_Fingerprint(&fingerSerial);
 
 // Initialize MFRC522
 MFRC522 mfrc522(SS_PIN, RST_PIN);
 
// Firebase objects
FirebaseConfig firebaseConfig;
FirebaseAuth firebaseAuth;
FirebaseData firebaseData;
FirebaseJson json;
 
// State variables
bool rfidDetected = false;
bool fingerprintDetected = false;
String currentRFIDHash = "";
int currentFingerprintID = -1;
unsigned long rfidTimestamp = 0;
unsigned long fingerprintTimestamp = 0;
unsigned long rfidStatusResetTime = 0;
unsigned long fingerprintStatusResetTime = 0;
const unsigned long TIMEOUT_WINDOW = 5000; // 5 seconds window
const unsigned long STATUS_DISPLAY_TIME = 3000; // Show status for 3 seconds
 
void setup() {
  Serial.begin(115200);
  
  // Initialize SPI for RFID with explicit pins (ESP32)
  SPI.begin(SCK_PIN, MISO_PIN, MOSI_PIN, SS_PIN);
  pinMode(RST_PIN, OUTPUT);
  digitalWrite(RST_PIN, HIGH);
  delay(50);
  
  // Initialize RFID
  mfrc522.PCD_Init();
  mfrc522.PCD_DumpVersionToSerial();
   
   // Initialize Fingerprint sensor using Serial2 (GPIO 16, 17)
   fingerSerial.begin(57600, SERIAL_8N1, 16, 17); // RX=16, TX=17
   finger.begin(57600);
   
   if (finger.verifyPassword()) {
     Serial.println("Fingerprint sensor OK");
   } else {
     Serial.println("Fingerprint sensor FAILED");
     while (1) delay(1);
   }
   
   // Connect to WiFi
   WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
   Serial.print("Connecting to WiFi");
   while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.print(".");
   }
   Serial.println();
   Serial.print("Connected! IP: ");
   Serial.println(WiFi.localIP());
   
  // Initialize Firebase - CORRECTED METHOD
  firebaseConfig.host = FIREBASE_HOST;
  firebaseConfig.signer.tokens.legacy_token = FIREBASE_AUTH;
  
  Firebase.begin(&firebaseConfig, &firebaseAuth);
  Firebase.reconnectWiFi(true);
  
  Serial.println("Firebase connected");
  Serial.println("READY");
}
 
 void loop() {
   // Check for RFID card
   if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
     String uid = "";
     for (byte i = 0; i < mfrc522.uid.size; i++) {
       if (mfrc522.uid.uidByte[i] < 0x10) uid += "0";
       uid += String(mfrc522.uid.uidByte[i], HEX);
     }
    uid.toUpperCase();
    
    // Hash the UID using same method as database (SHA256 with salt)
    String hash = hashUID(uid);
    
    rfidDetected = true;
    currentRFIDHash = hash;
    rfidTimestamp = millis();
    
    Serial.print("UID: ");
    Serial.println(uid);
    Serial.print("RFID HASH: ");
    Serial.println(hash);
     
    // Update Firebase status
    Firebase.setBool(firebaseData, "/status/rfid_detected", true);
    rfidStatusResetTime = millis() + STATUS_DISPLAY_TIME; // Schedule reset after 3 seconds
    
    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();
    
    // Check if both are detected (don't block with delay)
    checkBothDetected();
  }
  
  // Reset RFID status flag after display time (non-blocking)
  if (rfidStatusResetTime > 0 && millis() > rfidStatusResetTime) {
    Firebase.setBool(firebaseData, "/status/rfid_detected", false);
    rfidStatusResetTime = 0;
  }
  
  // Reset if timeout
  if (rfidDetected && (millis() - rfidTimestamp > TIMEOUT_WINDOW)) {
    rfidDetected = false;
    currentRFIDHash = "";
  }
  
  // Check Fingerprint
  checkFingerprint();
  
  // Reset fingerprint status flag (non-blocking)
  resetFingerprintStatus();
  
  delay(100);
}
 
 void checkFingerprint() {
   int p = finger.getImage();
   if (p != FINGERPRINT_OK) return;
   
   p = finger.image2Tz(1);
   if (p != FINGERPRINT_OK) return;
   
   p = finger.fingerFastSearch();
   if (p != FINGERPRINT_OK) return;
   
   fingerprintDetected = true;
   currentFingerprintID = finger.fingerID;
   fingerprintTimestamp = millis();
   
   Serial.print("FINGERPRINT:");
   Serial.println(finger.fingerID);
   
  // Update Firebase status
  Firebase.setBool(firebaseData, "/status/fingerprint_detected", true);
  fingerprintStatusResetTime = millis() + STATUS_DISPLAY_TIME; // Schedule reset after 3 seconds
  
  // Check if both are detected (don't block with delay)
  checkBothDetected();
  
  // Reset if timeout
  if (fingerprintDetected && (millis() - fingerprintTimestamp > TIMEOUT_WINDOW)) {
    fingerprintDetected = false;
    currentFingerprintID = -1;
  }
}

void resetFingerprintStatus() {
  // Reset fingerprint status flag after display time (non-blocking)
  if (fingerprintStatusResetTime > 0 && millis() > fingerprintStatusResetTime) {
    Firebase.setBool(firebaseData, "/status/fingerprint_detected", false);
    fingerprintStatusResetTime = 0;
  }
}
 
void checkBothDetected() {
  if (rfidDetected && fingerprintDetected) {
    unsigned long timeDiff = abs((long)(rfidTimestamp - fingerprintTimestamp));
    
    if (timeDiff <= TIMEOUT_WINDOW) {
      // Both detected within time window - Send to Firebase
      // Use status/login_data path (overwrites, doesn't create new entries)
      json.clear();
      json.set("rfid_hash", currentRFIDHash);
      json.set("fingerprint_id", currentFingerprintID);
      json.set("timestamp", millis());
      
      String path = "/status/login_data";
      if (Firebase.setJSON(firebaseData, path, json)) {  // Use setJSON instead of pushJSON
        Serial.println("Login request sent to Firebase (status/login_data)");
      } else {
        Serial.println("Firebase error: " + firebaseData.errorReason());
      }
      
      // Reset states
      rfidDetected = false;
      fingerprintDetected = false;
      currentRFIDHash = "";
      currentFingerprintID = -1;
      
      delay(1000);
    }
  }
}
 
// SHA256 hashing with salt - matches your existing method
String hashUID(String uid) {
  String input = uid + SECRET_SALT;
  byte hash[32];
  
  mbedtls_sha256_context ctx;
  mbedtls_sha256_init(&ctx);
  mbedtls_sha256_starts(&ctx, 0);
  mbedtls_sha256_update(&ctx, (const unsigned char*)input.c_str(), input.length());
  mbedtls_sha256_finish(&ctx, hash);
  mbedtls_sha256_free(&ctx);
  
  String out = "";
  for (int i = 0; i < 32; i++) {
    if (hash[i] < 0x10) out += "0";
    out += String(hash[i], HEX);
  }
  out.toUpperCase();
  
  return out;
}