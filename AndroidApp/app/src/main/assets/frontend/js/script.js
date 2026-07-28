// ===============================
// Modern Chain Link Company
// Login Validation
// ===============================

// Correct Login Details
const adminUsername = "Kumar@modernchainlink.com";
const adminPassword = "modern@123";

// Get HTML Elements
const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

// Login Event
loginForm.addEventListener("submit", function (event) {

    // Stop page refresh
    event.preventDefault();

    // Remove spaces
    let enteredUsername = username.value.trim();
    let enteredPassword = password.value.trim();

    // Empty Validation
    if (enteredUsername === "" && enteredPassword === "") {
        errorMessage.innerHTML = "Please enter Username and Password";
        return;
    }

    if (enteredUsername === "") {
        errorMessage.innerHTML = "Username is required";
        username.focus();
        return;
    }

    if (enteredPassword === "") {
        errorMessage.innerHTML = "Password is required";
        password.focus();
        return;
    }

    // Username Validation
    if (enteredUsername !== adminUsername) {
        errorMessage.innerHTML = "Invalid Username";
        username.focus();
        return;
    }

    // Password Validation
    if (enteredPassword !== adminPassword) {
        errorMessage.innerHTML = "Invalid Password";
        password.focus();
        return;
    }

    // Login Success
    errorMessage.style.color = "lightgreen";
    errorMessage.innerHTML = "Login Successful...";

    // Store Login Status
    localStorage.setItem("isLoggedIn", "true");

    // Redirect after 1 second
    setTimeout(function () {
        window.location.href = "dashboard.html";
    }, 1000);

});