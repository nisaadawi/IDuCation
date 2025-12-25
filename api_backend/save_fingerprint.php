<?php
require_once "db_config.php";

if (!isset($_POST['id']) || !isset($_POST['finger_id'])) {
    die("Missing data");
}

$id = intval($_POST['id']);               // identity ID
$finger_id = intval($_POST['finger_id']); // AS608 ID

$sql = "INSERT INTO tbl_fingerprint (id, finger_id) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id, $finger_id);

if ($stmt->execute()) {
    echo "Fingerprint linked to identity successfully";
} else {
    echo "Error saving fingerprint";
}

$stmt->close();
$conn->close();
?>
