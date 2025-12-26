<?php
/**
 * IDuCation - Dual Factor Login API
 * Verifies both RFID and Fingerprint match the same student
 */

require_once "db_config.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Check if required parameters are provided
if (!isset($data['rfid_hash']) || !isset($data['fingerprint_id'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Missing required parameters: rfid_hash and fingerprint_id'
    ]);
    exit;
}

$rfidHash = trim($data['rfid_hash']);
$fingerprintID = intval($data['fingerprint_id']);

// Validate inputs
if (empty($rfidHash) || $fingerprintID <= 0) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Invalid parameters'
    ]);
    exit;
}

// Find student by RFID hash - Get ALL fields
$sql_rfid = "SELECT id, name, citizenship, gender, religion, address, date_of_birth, state_of_birth 
             FROM tbl_identity 
             WHERE hash_uid = ? 
             LIMIT 1";
$stmt_rfid = $conn->prepare($sql_rfid);

if (!$stmt_rfid) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Database error: ' . $conn->error
    ]);
    exit;
}

$stmt_rfid->bind_param("s", $rfidHash);
$stmt_rfid->execute();
$result_rfid = $stmt_rfid->get_result();

if ($result_rfid->num_rows === 0) {
    $stmt_rfid->close();
    http_response_code(404);
    echo json_encode([
        'success' => false, 
        'message' => 'RFID card not found in system'
    ]);
    exit;
}

// Get all student data
$student_data = $result_rfid->fetch_assoc();
$student_id_from_rfid = $student_data['id'];
$stmt_rfid->close();

// Check if fingerprint is linked to the same student ID
// First, try with finger_id column (new schema)
$sql_fp = "SELECT id FROM tbl_fingerprint WHERE id = ? AND finger_id = ? LIMIT 1";
$stmt_fp = $conn->prepare($sql_fp);

if (!$stmt_fp) {
    // If finger_id column doesn't exist, check if id_fp matches fingerprint_id
    // This is a fallback for older schema where id_fp might be the fingerprint ID
    $sql_fp_alt = "SELECT id FROM tbl_fingerprint WHERE id = ? AND id_fp = ? LIMIT 1";
    $stmt_fp = $conn->prepare($sql_fp_alt);
    
    if (!$stmt_fp) {
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'message' => 'Database schema error. Please run database_update.sql to add finger_id column.',
            'debug' => $conn->error
        ]);
        exit;
    }
}

$stmt_fp->bind_param("ii", $student_id_from_rfid, $fingerprintID);
$stmt_fp->execute();
$result_fp = $stmt_fp->get_result();

if ($result_fp->num_rows === 0) {
    $stmt_fp->close();
    http_response_code(403);
    echo json_encode([
        'success' => false, 
        'message' => 'Fingerprint does not match the RFID card. Authentication failed.'
    ]);
    exit;
}

$stmt_fp->close();

// Both RFID and Fingerprint match the same student
// Calculate age from date_of_birth if available
$age = null;
if (!empty($student_data['date_of_birth'])) {
    $birthDate = new DateTime($student_data['date_of_birth']);
    $today = new DateTime();
    $age = $today->diff($birthDate)->y;
}

// Return all student information
echo json_encode([
    'success' => true,
    'message' => 'Authentication successful',
    'student' => [
        'id' => $student_data['id'],
        'name' => $student_data['name'],
        'age' => $age,
        'date_of_birth' => $student_data['date_of_birth'],
        'gender' => $student_data['gender'],
        'citizenship' => $student_data['citizenship'],
        'religion' => $student_data['religion'],
        'address' => $student_data['address'],
        'state_of_birth' => $student_data['state_of_birth']
    ]
]);

$conn->close();
?>

