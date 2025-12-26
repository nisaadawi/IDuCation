/**
 * IDuCation - RFID + Fingerprint Login Handler (Firebase Integration)
 * Handles dual-factor authentication using RFID card and fingerprint via Firebase
 */

class RFIDFingerprintLogin {
    constructor() {
        this.apiUrl = 'api_backend/login_rfid_fingerprint.php';
        this.firebaseConfig = null;
        this.database = null;
        this.statusListener = null;
        this.isListening = false;
        this.listenerStartTime = null; // Track when listener started
        this.modalElements = null; // Store modal element references
    }

    /**
     * Initialize Firebase
     */
    initFirebase() {
        // Firebase configuration - Replace with your Firebase config
        // Get your config from: Firebase Console → Project Settings → General → Your apps → Web app
        this.firebaseConfig = {
            apiKey: "YOUR_FIREBASE_API_KEY",
            authDomain: "your-project.firebaseapp.com",
            databaseURL: "https://your-project-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "your-project-id"
        };

        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(this.firebaseConfig);
        }
        this.database = firebase.database();
        console.log('Firebase initialized');
        return true;
    }

    /**
     * Clear Firebase status data
     */
    async clearFirebaseData() {
        if (!this.database) return;
        
        try {
            // Clear status and set initial state (overwrites, doesn't create new entries)
            await this.database.ref('status').set({
                rfid_detected: false,
                fingerprint_detected: false,
                login_data: null
            });
            console.log('🧹 Cleared status');
        } catch (error) {
            console.log('⚠️ Could not clear status:', error);
        }
    }

    /**
     * Listen for login requests from Firebase
     */
    async startFirebaseListener() {
        if (!this.database) {
            if (!this.initFirebase()) {
                this.showStatus('Firebase initialization failed', 'error');
                console.error('❌ Firebase initialization failed');
                return false;
            }
        }

        console.log('🔌 Starting Firebase listener...');
        
        // Clear status and set initial state
        await this.clearFirebaseData();
        
        this.isListening = true;
        
        // Store current time - only process entries added after this
        this.listenerStartTime = Date.now();
        console.log('⏰ Listener start time:', this.listenerStartTime);
        
        // Listen to status path only (login_data will be written here)
        const statusRef = this.database.ref('status');
        console.log('👂 Listening to Firebase path: status');

        // Track if we've already processed the current login_data to prevent duplicates
        let lastProcessedHash = null;
        
        // Listen for changes to status (including login_data)
        this.statusListener = statusRef.on('value', (snapshot) => {
            const status = snapshot.val();
            
            console.log('📡 Firebase status update received:', JSON.stringify(status, null, 2));
            
            if (!status) {
                console.log('⚠️ Status is null or empty');
                return;
            }
            
            // Show RFID/Fingerprint detection status
            if (status.rfid_detected === true) {
                console.log('✅ RFID detected: true');
                const message = 'RFID card detected. Please place your finger on the sensor...';
                this.showStatus(message, 'info');
                this.updateModalStatus(message, 'info');
            }
            if (status.fingerprint_detected === true) {
                console.log('✅ Fingerprint detected: true');
                const message = 'Fingerprint detected. Please tap your RFID card...';
                this.showStatus(message, 'info');
                this.updateModalStatus(message, 'info');
            }
            
            // Check for login data
            if (status.login_data) {
                console.log('📦 login_data found:', status.login_data);
                
                if (status.login_data.rfid_hash && status.login_data.fingerprint_id) {
                    const loginData = status.login_data;
                    
                    // Create unique key for this request
                    const requestKey = loginData.rfid_hash + '|' + loginData.fingerprint_id + '|' + (loginData.timestamp || '');
                    
                    // Check if we've already processed this exact request
                    if (lastProcessedHash === requestKey) {
                        console.log('⏭️ Already processed this login request, skipping...');
                        return;
                    }
                    
                    console.log('🔥 Firebase: NEW login request detected!');
                    console.log('RFID Hash:', loginData.rfid_hash);
                    console.log('Fingerprint ID:', loginData.fingerprint_id);
                    console.log('Timestamp:', loginData.timestamp);
                    
                    // Mark as processed
                    lastProcessedHash = requestKey;
                    
                    // Clear login_data immediately to prevent reprocessing
                    statusRef.child('login_data').set(null).then(() => {
                        console.log('🗑️ Cleared login_data from Firebase');
                    }).catch((error) => {
                        console.warn('⚠️ Could not clear login_data:', error);
                    });
                    
                    // Process login
                    console.log('🚀 Starting login process...');
                    this.processLogin(loginData.rfid_hash, loginData.fingerprint_id).catch((error) => {
                        console.error('❌ Login processing error:', error);
                        // Reset processed flag on error so it can be retried
                        lastProcessedHash = null;
                    });
                } else {
                    console.warn('⚠️ login_data exists but missing required fields:', status.login_data);
                }
            } else {
                console.log('ℹ️ No login_data in status');
            }
        });

        const waitingMessage = 'Waiting for RFID card and fingerprint...';
        this.showStatus(waitingMessage, 'info');
        if (this.modalElements) {
            this.updateModalStatus(waitingMessage, 'info');
        }
        return true;
    }

    /**
     * Process login with RFID and Fingerprint
     */
    async processLogin(rfidHash, fingerprintID) {
        const verifyingMessage = 'Verifying credentials...';
        this.showStatus(verifyingMessage, 'loading');
        this.updateModalStatus(verifyingMessage, 'loading');
        
        console.log('📡 Sending to PHP API:', this.apiUrl);
        console.log('Data:', { rfid_hash: rfidHash, fingerprint_id: fingerprintID });

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rfid_hash: rfidHash,
                    fingerprint_id: fingerprintID
                })
            });

            console.log('📥 PHP API Response Status:', response.status);
            const result = await response.json();
            console.log('📥 PHP API Response:', result);

            if (result.success) {
                const successMessage = `Login successful! Welcome ${result.student.name || ''}`;
                this.showStatus('Login successful! Redirecting...', 'success');
                this.updateModalStatus(successMessage, 'success');
                
                // Store ALL student info in sessionStorage
                const student = result.student;
                sessionStorage.setItem('student_id', student.id);
                sessionStorage.setItem('student_name', student.name);
                sessionStorage.setItem('student_age', student.age || '');
                sessionStorage.setItem('student_gender', student.gender || '');
                sessionStorage.setItem('student_date_of_birth', student.date_of_birth || '');
                sessionStorage.setItem('student_citizenship', student.citizenship || '');
                sessionStorage.setItem('student_religion', student.religion || '');
                sessionStorage.setItem('student_address', student.address || '');
                sessionStorage.setItem('student_state_of_birth', student.state_of_birth || '');
                
                // Store entire student object as JSON for easy access
                sessionStorage.setItem('student_data', JSON.stringify(student));
                
                // Stop listening before redirect
                this.stopListening();
                
                // Close modal and redirect after showing success
                setTimeout(() => {
                    this.closeRFIDFingerprintModal();
                    setTimeout(() => {
                        window.location.href = 'pages/student/home.html';
                    }, 500);
                }, 2000);
            } else {
                const errorMessage = result.message || 'Authentication failed. Please try again.';
                this.showStatus(errorMessage, 'error');
                this.updateModalStatus(errorMessage, 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = 'Connection error. Please try again.';
            this.showStatus(errorMessage, 'error');
            this.updateModalStatus(errorMessage, 'error');
        }
    }

    /**
     * Start listening for RFID + Fingerprint input
     */
    async startListening() {
        // Initialize Firebase and start listening
        const started = await this.startFirebaseListener();
        if (started) {
            console.log('✅ Listening for Firebase login requests...');
        } else {
            this.showStatus('Failed to connect to Firebase', 'error');
        }
    }

    /**
     * Open RFID + Fingerprint Modal (similar to scan modal)
     */
    openRFIDFingerprintModal() {
        const scanModal = document.getElementById('scanModal');
        if (!scanModal) return;
        
        const modalContent = scanModal.querySelector('.scan-modal-content');
        const scanAnimation = modalContent.querySelector('.scan-animation');
        const scanTitle = modalContent.querySelector('h3');
        const scanText = modalContent.querySelector('p');
        const progressBar = modalContent.querySelector('.scan-progress-bar');
        
        // Open modal with RFID+Fingerprint UI
        scanModal.classList.add('active');
        scanTitle.textContent = 'RFID + Fingerprint Authentication';
        scanText.textContent = 'Please tap your RFID card and place your finger on the sensor';
        progressBar.style.width = '0%';
        progressBar.style.animation = 'pulse 2s ease-in-out infinite';
        
        // Show fingerprint icon
        scanAnimation.innerHTML = `
            <div class="scan-ring"></div>
            <i class="fas fa-fingerprint scan-icon"></i>
        `;
        
        // Store reference to modal elements for status updates
        this.modalElements = {
            scanModal,
            scanTitle,
            scanText,
            scanAnimation,
            progressBar
        };
    }

    /**
     * Close RFID + Fingerprint Modal
     */
    closeRFIDFingerprintModal() {
        const scanModal = document.getElementById('scanModal');
        if (scanModal) {
            scanModal.classList.remove('active');
        }
        this.modalElements = null;
    }

    /**
     * Update modal status based on detection
     */
    updateModalStatus(message, type = 'info') {
        if (!this.modalElements) return;
        
        const { scanTitle, scanText, scanAnimation, progressBar } = this.modalElements;
        
        if (type === 'success') {
            scanAnimation.innerHTML = `
                <div class="scan-complete">
                    <i class="fas fa-check-circle"></i>
                </div>
            `;
            scanTitle.textContent = 'Authentication Successful!';
            scanText.textContent = message;
            progressBar.style.width = '100%';
            progressBar.style.animation = 'none';
        } else if (type === 'error') {
            scanAnimation.innerHTML = `
                <div class="scan-error" style="color: #ff4444;">
                    <i class="fas fa-exclamation-circle" style="font-size: 3rem;"></i>
                </div>
            `;
            scanTitle.textContent = 'Authentication Failed';
            scanText.textContent = message;
            progressBar.style.width = '0%';
            progressBar.style.animation = 'none';
        } else if (type === 'loading') {
            scanAnimation.innerHTML = `
                <div class="scan-ring"></div>
                <i class="fas fa-spinner fa-spin scan-icon"></i>
            `;
            scanTitle.textContent = 'Verifying Credentials...';
            scanText.textContent = message;
            progressBar.style.width = '50%';
        } else {
            // Info status - update text but keep animation
            scanText.textContent = message;
            
            // Update icon based on message
            if (message.includes('RFID') || message.includes('card')) {
                scanAnimation.innerHTML = `
                    <div class="scan-ring"></div>
                    <i class="fas fa-credit-card scan-icon"></i>
                `;
                progressBar.style.width = '33%';
            } else if (message.includes('Fingerprint') || message.includes('finger')) {
                scanAnimation.innerHTML = `
                    <div class="scan-ring"></div>
                    <i class="fas fa-fingerprint scan-icon"></i>
                `;
                progressBar.style.width = '66%';
            } else {
                scanAnimation.innerHTML = `
                    <div class="scan-ring"></div>
                    <i class="fas fa-fingerprint scan-icon"></i>
                `;
            }
        }
    }

    /**
     * Stop listening
     */
    stopListening() {
        this.isListening = false;
        
        if (this.statusListener && this.database) {
            this.database.ref('status').off('value', this.statusListener);
            this.statusListener = null;
        }
        
        console.log('🛑 Stopped Firebase listener');
    }

    /**
     * Show status message to user
     */
    showStatus(message, type = 'info') {
        // Remove existing status
        const existing = document.getElementById('rfid-fp-status');
        if (existing) {
            existing.remove();
        }

        // Create status element
        const status = document.createElement('div');
        status.id = 'rfid-fp-status';
        status.className = `rfid-fp-status ${type}`;
        
        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        else if (type === 'error') icon = 'fa-exclamation-circle';
        else if (type === 'loading') icon = 'fa-spinner fa-spin';

        status.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;

        // Add to login form
        const loginForm = document.getElementById('student-form');
        if (loginForm) {
            loginForm.insertBefore(status, loginForm.firstChild);
        } else {
            document.body.appendChild(status);
        }

        // Auto-remove after 5 seconds for info messages
        if (type === 'info' || type === 'error') {
            setTimeout(() => {
                if (status.parentNode) {
                    status.remove();
                }
            }, 5000);
        }
    }
}

// Initialize on page load - AUTO-START LISTENING
document.addEventListener('DOMContentLoaded', function() {
    const loginManager = new RFIDFingerprintLogin();
    
    // Auto-start listening when page loads
    console.log('🚀 Page loaded, starting Firebase listener automatically...');
    loginManager.startListening();
    
    // Keep the button for manual restart if needed
    const studentForm = document.getElementById('student-form');
    if (studentForm) {
        // Hide regular input by default when using RFID+Fingerprint
        const inputWrapper = studentForm.querySelector('.input-wrapper');
        if (inputWrapper) {
            inputWrapper.style.display = 'none';
        }
        
        const scanBtnContainer = studentForm.querySelector('.input-actions');
        if (scanBtnContainer) {
            // Create RFID + Fingerprint reconnect button
            const rfidFpBtn = document.createElement('button');
            rfidFpBtn.type = 'button';
            rfidFpBtn.className = 'scan-btn modern-scan-btn rfid-fp-btn';
            rfidFpBtn.id = 'rfid-fp-login-btn';
            rfidFpBtn.innerHTML = `
                <i class="fas fa-fingerprint"></i>
                <span>RFID + Fingerprint</span>
            `;
            
            rfidFpBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering scan modal
                e.preventDefault(); // Prevent form submission
                console.log('🔘 RFID+Fingerprint button clicked');
                loginManager.openRFIDFingerprintModal();
                loginManager.startListening();
            });
            
            scanBtnContainer.appendChild(rfidFpBtn);
        }
    }
    
    // Make loginManager globally available
    window.rfidFpLogin = loginManager;
});
