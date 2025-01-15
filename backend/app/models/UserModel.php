<?php
require_once __DIR__ . '/../config/database.php';


class UserModel{
    private $conn;
    public function __construct($conn){
        $this->conn = $conn;
    }
    public function findUserByEmail($email){
    	$stmt = $this->conn->prepare("SELECT userkey, email, password FROM usercredentials WHERE email = :email");
    	$stmt->bindValue(':email', $email, PDO::PARAM_STR);
    	$stmt->execute();
    	return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public function saveUser($user){
        $stmt = $this->conn->prepare("
           INSERT INTO usercredentials (email, password)
            VALUES (:email, :password)
        ");
        $hashedPassword = password_hash($user['password'], PASSWORD_BCRYPT);
        $stmt->bindValue(':email', $user['email'], PDO::PARAM_STR);
        $stmt->bindValue(':password', $hashedPassword, PDO::PARAM_STR);
        return $stmt->execute();
    }
    public function updateUserHash($userkey, $userHash){
    	$stmt = $this->conn->prepare("UPDATE usercredentials SET userhash = :userhash WHERE userkey = :userkey");
    	$stmt->bindValue(':userhash', $userHash, PDO::PARAM_STR);
    	$stmt->bindValue(':userkey', $userkey, PDO::PARAM_INT);
    	return $stmt->execute();
    }
}

