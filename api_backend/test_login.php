<?php
/**
 * Test Login API - For debugging
 * Use this to test if PHP API is working correctly
 */

require_once "db_config.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');

// Allow GET for testing
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'status' => 'API is working',
        'message' => 'PHP API is accessible',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit;
}

// Handle POST
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Log the request
error_log("Test Login API - Received: " . print_r($data, true));

if (!isset($data['rfid_hash']) || !isset($data['fingerprint_id'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Missing required parameters',
        'received' => $data
    ]);
    exit;
}

$rfidHash = trim($data['rfid_hash']);
$fingerprintID = intval($data['fingerprint_id']);

// Test database connection
$testQuery = "SELECT COUNT(*) as count FROM tbl_identity";
$result = $conn->query($testQuery);
$row = $result->fetch_assoc();

echo json_encode([
    'success' => true,
    'message' => 'Test successful',
    'rfid_hash_received' => $rfidHash,
    'fingerprint_id_received' => $fingerprintID,
    'database_connected' => true,
    'total_students' => $row['count'],
    'timestamp' => date('Y-m-d H:i:s')
]);

$conn->close();
?>

