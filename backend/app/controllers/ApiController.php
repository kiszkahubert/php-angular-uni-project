<?php

require_once __DIR__ . '/../models/OrderModel.php';
require_once __DIR__ . '/../models/EmailModel.php';
require_once __DIR__ . '/../utils/Validator.php';
require_once __DIR__ . '/../utils/Response.php';


class ApiController
{
    private $orderModel;
    private $conn;

    public function __construct($conn){
	$this->conn = $conn;
        $this->orderModel = new OrderModel($conn);
    }
    private function authenticate($userkey, $userHash){
    	$stmt = $this->conn->prepare("SELECT 1 FROM usercredentials WHERE userkey = :userkey AND userhash = :userhash");
    	$stmt->bindValue(':userkey', $userkey, PDO::PARAM_INT);
    	$stmt->bindValue(':userhash', $userHash, PDO::PARAM_STR);
    	$stmt->execute();
    	return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }

    public function receiveData($request){
        $validationRules = [
            'name' => 'required|regex:/^[a-zA-Z]{3,20}$/',
            'email' => 'required|email',
            'phone_number' => 'required|regex:/^[0-9]{9}$/',
            'topic' => 'required|max:30',
            'message' => 'required|max:200',
        ];
        $errors = Validator::validate($request, $validationRules);
        if (!empty($errors)) {
            Response::json(['errors' => $errors], 400);
	}
	$emailModel = new EmailModel($this->conn);
        if ($emailModel->saveEmail($request)) {
      	    Response::json(['message' => 'data recevied and saved'], 200);
        } else {
            Response::json(['error' => 'failed to save data'], 500);
        }
    }
    public function receiveOrders($request){
    	foreach ($request as $order) {
            if (!isset($order['userkey'])) {
            	Response::json(['error' => 'userkey is required'], 400);
            	return;
            }
            $this->orderModel->saveOrder($order);
        }
   	 Response::json(['message' => 'orders received'], 200);
    }
    public function getOrders($request){
	$userkey = $request['userkey'] ?? null;
	$userHash = $request['userHash'] ?? null;
	if (!$this->authenticate($userkey, $userHash)) {
            Response::json(['error' => 'unauthorized'], 401);
            return;
    	}
    	$orders = $this->orderModel->getOrdersByUserKey($userkey);
    	if (empty($orders)) {
            Response::json(['message' => 'no orders found for this user'], 404);
    	} else {
            Response::json(['orders' => $orders], 200);
    	}
    }
}

