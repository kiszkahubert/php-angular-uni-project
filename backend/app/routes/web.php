<?php

require_once __DIR__ . '/../controllers/AuthController.php';
require_once __DIR__ . '/../controllers/ApiController.php';
require_once __DIR__ . '/../config/database.php';

$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Origin: *');

try {
    $conn = new PDO("pgsql:host=php-db;dbname=postgres", 'postgres', 'root');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
	    http_response_code(204);
	    exit();
    }
    if ($requestUri === '/api/register' && $requestMethod === 'POST') {
        $authController = new AuthController($conn);
        $input = json_decode(file_get_contents('php://input'), true);
        $authController->register($input);
    } elseif ($requestUri === '/api/orders' && $requestMethod === 'POST') {
        $apiController = new ApiController($conn);
        $input = json_decode(file_get_contents('php://input'), true);
        $apiController->receiveOrders($input);
    } elseif ($requestUri === '/api/contact' && $requestMethod === 'POST') {
        $apiController = new ApiController($conn);
        $input = json_decode(file_get_contents('php://input'), true);
        $apiController->receiveData($input);
    } elseif ($requestUri === '/api/login' && $requestMethod === 'POST') {
        $authController = new AuthController($conn);
        $input = json_decode(file_get_contents('php://input'), true);
        $authController->login($input);
    } elseif (strpos($requestUri, '/api/orders') === 0 && $requestMethod === 'GET') {
	$apiController = new ApiController($conn);
    	$input = $_GET;
    	$apiController->getOrders($input);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'not found']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'database conn failed', 'message' => $e->getMessage()]);
}

