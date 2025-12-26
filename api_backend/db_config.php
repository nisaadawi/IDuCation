<?php
$DB_HOST = "localhost";
$DB_USER = "hfshaxva_ojou_sama";
$DB_PASS = "ojouSama2025";
$DB_NAME = "hfshaxva_iducation";

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

if ($conn->connect_error) {
    die("Database connection failed");
}
?>
