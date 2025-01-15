<?php
require_once __DIR__ . '/../config/database.php';

class OrderModel{
    private $conn;
    public function __construct($conn){
        $this->conn = $conn;
    }
    public function saveOrder($order){
        $stmt = $this->conn->prepare("
            INSERT INTO orders (item, quantity, totalprice, orderdate, sauce, meat, userkey, statuskey)
            VALUES (:item, :quantity, :totalprice, NOW(), :sauce, :meat, :userkey, :statuskey)
        ");
        $stmt->bindValue(':item', $order['item'], PDO::PARAM_STR);
        $stmt->bindValue(':quantity', $order['quantity'], PDO::PARAM_INT);
        $stmt->bindValue(':totalprice', $order['totalPrice'], PDO::PARAM_STR);
        $stmt->bindValue(':sauce', $order['sauce'], PDO::PARAM_STR);
        $stmt->bindValue(':meat', $order['meat'], PDO::PARAM_STR);
        $stmt->bindValue(':userkey', $order['userkey'], PDO::PARAM_INT);
        $stmt->bindValue(':statuskey', 1, PDO::PARAM_INT);
        return $stmt->execute();
    }
    public function getOrdersByUserKey($userkey){
    	$stmt = $this->conn->prepare("
	    SELECT
 		item,
		quantity,
		totalprice,
		orderDate,
		sauce, 
		meat
	    FROM orders WHERE userkey = :userkey
    	");
    	$stmt->bindValue(':userkey', $userkey, PDO::PARAM_INT);
    	$stmt->execute();
    	return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }	
}

