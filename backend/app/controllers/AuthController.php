<?php

require_once __DIR__ . "/../models/UserModel.php";
require_once __DIR__ . "/../utils/Validator.php";
require_once __DIR__ . "/../utils/Response.php";


class AuthController
{
    private $userModel;
    public function __construct($conn){
        $this->userModel = new UserModel($conn);
    }
    public function register($request){
        $validationRules = [
            'email' => 'required|email',
            'password' => 'required|min:8|max:20',
        ];
        $errors = Validator::validate($request, $validationRules);
        if (!empty($errors)) {
            Response::json(['errors' => $errors], 400);
        }
        if ($this->userModel->findUserByEmail($request['email'])) {
            Response::json(['error' => 'account exists'], 409);
        }
        $this->userModel->saveUser($request);
        Response::json(['message' => 'user registered'], 201);
    }
    public function login($request){
        $email = $request['email'] ?? null;
        $password = $request['password'] ?? null;
        if (empty($email) || empty($password)) {
            Response::json(['error' => 'email and password req'], 400);
        }
        $user = $this->userModel->findUserByEmail($email);
        if (!$user || !password_verify($password, $user['password'])) {
            Response::json(['error' => 'invalid email or passw'], 401);
	}
	$userHash = bin2hex(random_bytes(16));
        $this->userModel->updateUserHash($user['userkey'], $userHash);
	Response::json([
		'message' => 'login succeded',
		'userId' => $user['userkey'],
		'userHash' => $userHash
	], 200);
    }
}


