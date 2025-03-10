<!--this code displays a message when an is error caused when the wrong data is input by the user-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="landscape.css" rel="stylesheet" type="text/css">
    <title>Error</title>
</head>
<body style="background-color: #FFEDBC;">
<!--allows to show a button so the user can go back when the erro message is displayed.-->
    <div class="error-message">
        <p><?php echo htmlspecialchars($error_message); ?></p>
        <button onclick="history.back()">Go Back to Form</button>
    </div>

    <div>
    <!--when the error message appears, an image appears too-->
    <img src="landscape/error.jpg" alt="error message" style="width:700px;">
    </div>
</body>
</html