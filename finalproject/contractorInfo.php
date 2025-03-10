<!--This code allows to retrieve different Information related to the contractor,
the clients, and services provided.-->
<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Spectrum Gardening Services Contractor Information</title>   
        <link rel="stylesheet" href="landscape.css">
    </head>
   <!--navigation bar-->
    <body class="back">
        <ul class="nav-bar">
            <li><a href="landscape.html">Home</a></li>
            <li><a href="contractorForm.html">Contractor Form</a></li>
            <li><a href="contractorInfo.php">Contractor Information</a></li>
            <li><a href="aboutus.html">About Us</a></li>
        </ul>

        <div class="container">
<!--starts php code-->
<?php
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
echo "Connected successfully";

echo "<br>";
//title displayed above the table
        echo "<h1>Contractor Information.</h1>";
echo "<br/>List Contractor Information from all Contractors.<br/>";
$sql1="SELECT * FROM Contractor";
$result = mysqli_query($conn, $sql1);

if (mysqli_num_rows($result) > 0) {
  // output data of each row in a table
  echo "<table border='1'>
        <th>Contractor ID</th>
        <th>Contractor Name</th>
        <th>Number Of Employees</th>
        <th>Contractor Phone Number</th>";
  while($row = mysqli_fetch_assoc($result)) {
    echo "<tr>";
    echo "<td>".$row['ContractorID']."</td>";
    echo "<td>".$row['ContractorName']."</td>";
    echo "<td>".$row['NumberOfEmployees']."</td>";
    echo "<td>".$row['ContractorPhoneNumber']."</td>";
    echo "</tr>";
  }
  echo "</table>";

} else {
  echo "0 results";
}

echo "<h1>Client Information</h1>";
//title displayed above the table
echo "<br/>List Information Related to Clients.<br/>";
$sql2="SELECT * FROM Jobs";
$result = mysqli_query($conn, $sql2);

if (mysqli_num_rows($result) > 0) {
  // output data of each row in a table
  echo "<table border='1'>
        <th>Job ID</th>
        <th>Client Address</th>
        <th>Client Name</th>
        <th>Client Phone Number</th>
        <th>Contractor ID</th>";
  while($row = mysqli_fetch_assoc($result)) {
    echo "<tr>";
    echo "<td>".$row['JobID']."</td>";
    echo "<td>".$row['ClientAddress']."</td>";
    echo "<td>".$row['ClientName']."</td>";
    echo "<td>".$row['ClientPhoneNumber']."</td>";
    echo "<td>".$row['ContractorID']."</td>";
    echo "</tr>";
  }
  echo "</table>";

} else {
  echo "0 results";
}
//title above the table
echo "<h1>Service Provided</h1>";
echo "<br/>List Information of Jobs Completed.<br/>";
$sql3="SELECT * FROM PerformJobs";
$result = mysqli_query($conn, $sql3);

if (mysqli_num_rows($result) > 0) {
  // output data of each row in a table
  echo "<table border='1'>
        <th>ContractorID</th>
        <th>ServiceID</th>
        <th>ProductCode</th>
        <th>JobID</th>
        <th>TotalCost</th>";
  while($row = mysqli_fetch_assoc($result)) {
    echo "<tr>";
    echo "<td>".$row['ContractorID']."</td>";
    echo "<td>".$row['ServiceID']."</td>";
    echo "<td>".$row['ProductCode']."</td>";
    echo "<td>".$row['JobID']."</td>";
    echo "<td>".$row['TotalCost']."</td>";
    echo "</tr>";
  }
  echo "</table>";

} else {
  echo "0 results";
}
mysqli_close($conn);
?>
<!--ends php code-->
</div>
    </body>
</html>