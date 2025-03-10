<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Validation</title>
</head>

<body>
<?php
function passValidation($password){
	$errors = [];
	
	if(strlen($password)< 12 || strlen($password) > 20) {
		$errors[] = "Password length must be between 12 and 20 characters!";
		
	}
	
	if(!preg_match('/[A-Z]', $password)) {
		$errors[] = "Password must contain at least one uppercase letter.";
	}
	
		if(!preg_match('/[a-z]', $password)) {
		$errors[] = "Password must contain at least one lowercase letter.";
	}
	
		if(!preg_match('/[0-9]', $password)) {
		$errors[] = "Password must contain at least one number.";
	}
	
		if(!preg_match('/[!@#$%^&*()\-_=+{};:,<.>]/', $password)) {
		$errors[] = "Password must contain at least one special character.";
	}
	
	return $errors;
}

if($_SERVER["REQUEST_METHOD"] == "POST"){
	$fname = $_POST['fname'];
	$lname = $_POST['lname'];
	$password = $_POST['password'];
	
	$errors = passValidation($password);
	
	if (!empty($errors)) {
		foreach ($errors as $error) {
			echo "<p>Error: $error</p>";
		}
		
	} else {
		echo "<p>Name: $fname $lname</p>";
		echo"<p>Password: $password</p>";
		echo "<p>Password Accepted!</p>;
	}
	
}

?>
</body>
</html>
	