<?php
/**
 * Check Login Status Endpoint
 * Used for polling method when Web Serial API is not available
 * The bridge service should update this file or a database table with pending logins
 */

require_once "db_config.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// For this implementation, we'll use a simple file-based status
// In production, use a database table or Redis cache
$statusFile = __DIR__ . '/login_status.json';

if (!file_exists($statusFile)) {
    echo json_encode(['pending_login' => false]);
    exit;
}

$status = json_decode(file_get_contents($statusFile), true);

if ($status && isset($status['pending_login']) && $status['pending_login']) {
    // Clear the status after reading
    file_put_contents($statusFile, json_encode(['pending_login' => false]));
    echo json_encode([
        'pending_login' => true,
        'rfid_hash' => $status['rfid_hash'],
        'fingerprint_id' => $status['fingerprint_id']
    ]);
} else {
    echo json_encode(['pending_login' => false]);
}
?>

