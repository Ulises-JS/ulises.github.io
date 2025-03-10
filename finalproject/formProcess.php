<!--this is the php code that allows to process the data being submitted by the user-->
<?php
//connect to database
$servername = "sql305.infinityfree.com";
$username = "if0_36254352";
$password = "mWriN9jg6S";
$dbname = "if0_36254352_final_project_ctec393";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//process data
$ClientA = $_POST['ClientAddress'];
$ClientN = $_POST['ClientName'];
$ClientPN = $_POST['ClientPhoneNumber'];
$ContraID = $_POST['ContractorID'];

//validate data to make sure that no empty spaces are left by the user.
if (empty($ClientA) || empty($ClientN) || empty($ClientPN) || empty($ContraID)) {
    echo "Please fill in all fields.";
    exit;
}

// retrieve the last JobID inserted by the user
$sql_last_id = "SELECT MAX(JobID) AS max_id FROM Jobs";
$result = $conn->query($sql_last_id);
$row = $result->fetch_assoc();
$max_id = $row['max_id'];

//add plus 1 to the retrieved JobID so the number continues increasing
$new_job_id = $max_id + 1;
//insert data to the Jobs table.
$sql2 = "INSERT INTO Jobs (JobID, ClientAddress, ClientName, ClientPhoneNumber, ContractorID) VALUES (?, ?, ?, ?, ?)"; 

$stmt = $conn->prepare($sql2);
$stmt->bind_param("issss", $new_job_id, $ClientA, $ClientN, $ClientPN, $ContraID);

// validata data insertion, displays new JobID if success or error message if not successful
if ($stmt->execute()) {
    echo "Data for JobID: " .$new_job_id . " Inserted Succesfully!";
} else {
    echo "Error: " . $stmt->error;
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
<!--navigation buttoms to go HOME or go back to Contractor Form-->
<button class="button1" onclick="document.location='landscape.html'">HOME</button>
<button class="button2" onclick="document.location='contractorForm.html'">CONTRACTOR FORM</button>
<div>
<img src="landscape/garden.jpg" class"garden" alt="Image of a garden" style="width:500px; height:600px;"> 
</div>
</body>
</html>