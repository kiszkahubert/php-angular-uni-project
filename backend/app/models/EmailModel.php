<?php
require_once __DIR__ . '/../config/database.php';

class EmailModel{
    private $conn;
    public function __construct($conn){
        $this->conn = $conn;
    }
    public function saveEmail($emailData){
        $stmt = $this->conn->prepare("
            INSERT INTO formdata (name, email, phone_number, topic, message)
            VALUES (:name, :email, :phone_number, :topic, :message)
        ");
        $stmt->bindValue(':name', $emailData['name'], PDO::PARAM_STR);
        $stmt->bindValue(':email', $emailData['email'], PDO::PARAM_STR);
        $stmt->bindValue(':phone_number', $emailData['phone_number'], PDO::PARAM_STR);
        $stmt->bindValue(':topic', $emailData['topic'], PDO::PARAM_STR);
        $stmt->bindValue(':message', $emailData['message'], PDO::PARAM_STR);
        return $stmt->execute();
    }
}

