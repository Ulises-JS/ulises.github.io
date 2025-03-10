<?php
// Start session or resume an existing session
session_start();

// Function to add selected items to the order
function addSelectedItems($formId) {
    if(isset($_POST[$formId])) {
        $selectedItems = $_POST[$formId];
        $selectedItemsList = $_SESSION['selectedItemsList'] ?? [];

        foreach($selectedItems as $itemName => $itemPrice) {
            // Add selected item to the selected items display section
            $selectedItem = $itemName . ' - $' . number_format((float)$itemPrice, 2);
            $selectedItemsList[] = $selectedItem;

            // Store selected item in session
            $_SESSION['selectedItems'][] = ['name' => $itemName, 'price' => (float)$itemPrice];
        }
        $_SESSION['selectedItemsList'] = $selectedItemsList;
    }
}

// Function to calculate total cost
function calculateTotal() {
    $totalCost = 0;
    $storedItems = $_SESSION['selectedItems'] ?? [];

    foreach($storedItems as $item) {
        $totalCost += $item['price'];
    }

    // Return total cost
    return number_format($totalCost, 2);
}

// Function to handle payment
function pay() {
    // Display thank you message
    echo "Thank you for your purchase!";

    // Reset selected items list
    unset($_SESSION['selectedItemsList']);

    // Reset total cost
    unset($_SESSION['selectedItems']);

    // Clear session variables
    session_destroy();
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Add selected items to the order
    addSelectedItems($_POST['formId']);

    // Redirect to payment success page or perform further processing
    header("Location: payment_success.php");
    exit();
}
?>
