<?php
class Validator{
    public static function validate($data, $rules){
        $errors = [];
        foreach ($rules as $field => $rule) {
            $value = $data[$field] ?? null;
            if ($field === 'phoneNumber' && !isset($data['phone_number'])) {
                $field = 'phone_number';
            }
            if (strpos($rule, 'required') !== false && empty($value)) {
                $errors[$field] = "$field is required";
            }
            if (strpos($rule, 'email') !== false && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
                $errors[$field] = "$field must be a valid email";
            }
            if (strpos($rule, 'max:') !== false) {
                preg_match('/max:(\d+)/', $rule, $matches);
                $maxLength = $matches[1];
                if (strlen($value) > $maxLength) {
                    $errors[$field] = "$field must not exceed $maxLength characters";
                }
            }
            if (strpos($rule, 'regex:') !== false) {
                preg_match('/regex:(.+)/', $rule, $matches);
                $pattern = $matches[1];
                if (!preg_match($pattern, $value)) {
                    $errors[$field] = "$field has an invalid format";
                }
            }
        }
        return $errors;
    }
}

