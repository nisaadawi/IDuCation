<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ✅ SAFE absolute path
require_once __DIR__ . "/db_config.php";

echo "DB_OK\n";

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit("METHOD_NOT_ALLOWED");
}

if (!isset($_POST['hash_uid'])) {
    exit("NO_UID");
}

$hash_uid = $_POST['hash_uid'];

if (strlen($hash_uid) !== 64) {
    exit("INVALID_UID");
}

// Check duplicate
$check = $conn->prepare(
    "SELECT id FROM tbl_identity WHERE hash_uid = ? LIMIT 1"
);
if (!$check) exit("PREPARE_CHECK_FAILED");

$check->bind_param("s", $hash_uid);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    exit("EXISTS");
}

// Insert
$stmt = $conn->prepare(
    "INSERT INTO tbl_identity (hash_uid, created_at) VALUES (?, NOW())"
);
if (!$stmt) exit("PREPARE_INSERT_FAILED");

$stmt->bind_param("s", $hash_uid);

if ($stmt->execute()) {
    echo "SUCCESS";
} else {
    echo "DB_ERROR";
}
