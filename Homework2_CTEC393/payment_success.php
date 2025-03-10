<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Success</title>
</head>
<body>
<?php
if($_SERVER['REQUEST_METHOD'] == 'POST'){
	if(!empty($_REQUEST['fname'])){
	$name = $_REQUEST['name'];
	}
	
	else {
		$name="";
		echo "You forgot to enter";
	}
	
	if($name != "" && $name != "") {
		echo "Thank you";
	
?>
</body>
</html>

