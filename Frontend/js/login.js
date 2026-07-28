// ==========================================
// Modern Chain Link Company
// Login Validation
// ==========================================

// Admin Credentials
const ADMIN_USERNAME = "Kumar@modernchainlink.com";
const ADMIN_PASSWORD = "modern@123";

// HTML Elements
const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

// ==========================================
// If already logged in
// ==========================================

if(localStorage.getItem("isLoggedIn") === "true"){

    window.location.href = "dashboard.html";

}

// ==========================================
// Login
// ==========================================

loginForm.addEventListener("submit", function(event){

    event.preventDefault();

    const user = username.value.trim();
    const pass = password.value.trim();

    errorMessage.innerHTML = "";
    errorMessage.style.color = "#ffffff";

    // Empty Validation
    if(user === "" && pass === ""){

        errorMessage.innerHTML = "Please enter Email and Password.";

        return;

    }

    if(user === ""){

        errorMessage.innerHTML = "Email Address is required.";

        username.focus();

        return;

    }

    if(pass === ""){

        errorMessage.innerHTML = "Password is required.";

        password.focus();

        return;

    }

    // Username Validation
    if(user !== ADMIN_USERNAME){

        errorMessage.innerHTML = "Invalid Email Address.";

        username.focus();

        return;

    }

    // Password Validation
    if(pass !== ADMIN_PASSWORD){

        errorMessage.innerHTML = "Invalid Password.";

        password.focus();

        return;

    }

    // Login Success

    errorMessage.style.color = "#C7FFD8";

    errorMessage.innerHTML = "Login Successful... Redirecting";

    // Store Session

    localStorage.setItem("isLoggedIn","true");

    localStorage.setItem("adminName","SanthoshKumar");

    // Redirect

    setTimeout(function(){

        window.location.href = "dashboard.html";

    },1200);

});

// ==========================================
// Enter Key Support
// ==========================================

password.addEventListener("keypress",function(event){

    if(event.key === "Enter"){

        loginForm.requestSubmit();

    }

});

// ==========================================
// Clear Error While Typing
// ==========================================

username.addEventListener("input",function(){

    errorMessage.innerHTML = "";

});

password.addEventListener("input",function(){

    errorMessage.innerHTML = "";

});