function validateForm() {
    const name = document.getElementById('name').value;
    if (name === "") {
        alert("Please enter your name.");
        return false;
    }
    // Add validation for other fields (email, phone, card info) as needed
    return true;
}