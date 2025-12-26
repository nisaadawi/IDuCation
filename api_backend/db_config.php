<?php
// Database Configuration
// Replace with your database credentials
$DB_HOST = "localhost";
$DB_USER = "your_database_username";
$DB_PASS = "your_database_password";
$DB_NAME = "your_database_name";

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

if ($conn->connect_error) {
    die("Database connection failed");
}
?>
