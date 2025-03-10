<!--this is the php code that allows to process data entered when a new contrator is added to the database.-->
<?php
//connect to database
$servername = "sql305.infinityfree.com";
$username = "if0_36254352";
$password = "mWriN9jg6S";
$dbname = "if0_36254352_final_project_ctec393";

$error_message = "";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//process data
$conID = $_POST['ContractorID'];
$employNum = $_POST['NumberOfEmployees'];
$conName = $_POST['ContractorName'];
$conPhoneNum = $_POST['ContractorPhoneNumber'];

//validate data to make sure that the user enters data on all the boxes.
if (empty($conID) || empty($employNum) || empty($conName) || empty($conPhoneNum)) {
    echo "Please fill in all fields.";
        include 'errorhandle.php';
    exit;
}

//limit the length of ContractorID
if (!preg_match('/^\d{5}$/',$conID)){
    echo "The Contractor ID must be 5 digits.";
        include 'errorhandle.php';
    exit;
}

//limit the number of employees a Contractor can have, max number is 20
if($employNum < 1 || $employNum > 20) {
    echo "The Contractor cannot have less than 1 or more than 20 employees";
        include 'errorhandle.php';
    exit;
}
//try and catch code that makes sure the information entered is correct, and continues the count from the database. This provides a way to avoid repeating contractorIDs
try {
    $sql5 = "INSERT INTO Contractor (ContractorID, NumberOfEmployees, ContractorName, ContractorPhoneNumber) VALUES (?, ?, ?, ?)";

    $stmt = $conn->prepare($sql5);
    $stmt->bind_param("isss", $conID, $employNum, $conName, $conPhoneNum);

    if ($stmt->execute()) {
        echo "Contractor number: " . $conID . " Inserted Successfully!";
    } else {
        throw new Exception("Error executing statement.");
    }
} catch (mysqli_sql_exception $e) {
    if ($e->getCode() === 1062) { // 1062 this number represents a duplicate entry on MySQL
        $error_message = "Contractor ID already exists. Please use a different ID.";
    } else {
        $error_message = "Database error: " . $e->getMessage();
    }
    include 'errorhandle.php';
} catch (Exception $e) {
    $error_message = "General error: " . $e->getMessage();
    include 'errorhandle.php';
}

$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="eng">
<head>
<meta charset="UTF-8">
<meta name="viewport" Content="width=device-width, initial-scale=1.0">
<link href="landscape.css" rel="stylesheet" type="text/css">
<title>Form Submission</title>
</head>

<body>

<!--navigation buttoms for when the insertion is successful-->

<button class="button1" onclick="document.location='landscape.html'">HOME</button>
<button class="button2" onclick="document.location='contractorForm.html'">CONTRACTOR FORM</button>
<div>
<img src="landscape/garden.jpg" class"garden" alt="Image of a garden" style="width:500px; height:600px;"> 
</div>
</body>
</html>