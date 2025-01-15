<?php
try {
    $conn = new PDO("pgsql:host=php-db;dbname=postgres", 'postgres', 'root');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
