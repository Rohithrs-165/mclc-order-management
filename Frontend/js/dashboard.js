/*==========================================
 Modern Chain Link Company
 Dashboard JavaScript
 Part 3B-1
==========================================*/


/*==========================================
 LOGIN PROTECTION
==========================================*/

if (localStorage.getItem("isLoggedIn") !== "true") {

    window.location.href = "index.html";

}


/*==========================================
 HTML ELEMENTS
==========================================*/

const adminName = localStorage.getItem("adminName") || "Admin";

document.getElementById("welcomeText").textContent =
    `👋 Welcome, ${adminName}`;

const logoutBtn = document.getElementById("logoutBtn");

const totalOrders = document.getElementById("totalOrders");

const pendingOrders = document.getElementById("pendingOrders");

const processingOrders = document.getElementById("processingOrders");

const deliveredOrders = document.getElementById("deliveredOrders");


/*==========================================
 LOAD ADMIN NAME
==========================================*/

const name = localStorage.getItem("adminName");

if (name) {

    adminName.innerHTML = name;

}
else {

    adminName.innerHTML = "Administrator";

}


/*==========================================
 LOAD ORDERS
==========================================*/

let materialOrders =
    JSON.parse(localStorage.getItem("materialOrders")) || [];

let installationOrders =
    JSON.parse(localStorage.getItem("installationOrders")) || [];


/*==========================================
 MERGE BOTH ORDER LISTS
==========================================*/

let allOrders = [

    ...materialOrders,

    ...installationOrders

];


/*==========================================
 CALCULATE DASHBOARD COUNTS
==========================================*/

function updateDashboardCards() {

    totalOrders.innerHTML = allOrders.length;

    let pending = 0;

    let processing = 0;

    let delivered = 0;


    for (let i = 0; i < allOrders.length; i++) {

        let status = allOrders[i].status;

        if (status === "Pending") {

            pending++;

        }

        else if (status === "Processing") {

            processing++;

        }

        else if (

            status === "Delivered"

            ||

            status === "Completed"

        ) {

            delivered++;

        }

    }

    pendingOrders.innerHTML = pending;

    processingOrders.innerHTML = processing;

    deliveredOrders.innerHTML = delivered;

}


/*==========================================
 REFRESH DATA
==========================================*/

function refreshDashboard() {

    materialOrders =
        JSON.parse(localStorage.getItem("materialOrders")) || [];

    installationOrders =
        JSON.parse(localStorage.getItem("installationOrders")) || [];

    allOrders = [

        ...materialOrders,

        ...installationOrders

    ];

    updateDashboardCards();

}


/*==========================================
 LOGOUT
==========================================*/

logoutBtn.addEventListener("click", function () {

    let answer = confirm("Do you want to logout?");

    if (answer) {

        localStorage.removeItem("isLoggedIn");

        localStorage.removeItem("adminName");

        window.location.href = "index.html";

    }

});


/*==========================================
 PAGE LOAD
==========================================*/

refreshDashboard();
/*==========================================
    HTML ELEMENTS
==========================================*/

const recentOrders = document.getElementById("recentOrders");

const searchBox = document.getElementById("searchBox");

const fromDate = document.getElementById("fromDate");

const toDate = document.getElementById("toDate");

const filterBtn = document.getElementById("filterBtn");


/*==========================================
    DISPLAY RECENT ORDERS
==========================================*/

function displayOrders(orderList){

    recentOrders.innerHTML = "";

    if(orderList.length === 0){

        recentOrders.innerHTML =

        `
        <tr>

            <td colspan="6" class="no-data">

                No Orders Found

            </td>

        </tr>
        `;

        return;

    }

    orderList.forEach(function(order){

        let row =

        `
        <tr>

            <td>${order.orderId}</td>

            <td>${order.customerName}</td>

            <td>${order.customerNumber}</td>

            <td>${order.type}</td>

            <td>

                <span class="status ${order.status.toLowerCase()}">

                    ${order.status}

                </span>

            </td>

            <td>₹ ${order.totalAmount}</td>

        </tr>
        `;

        recentOrders.innerHTML += row;

    });

}


/*==========================================
    INITIAL TABLE
==========================================*/

displayOrders(allOrders);


/*==========================================
    SEARCH
==========================================*/

searchBox.addEventListener("keyup",function(){

    let value = searchBox.value.toLowerCase().trim();

    let filteredOrders = allOrders.filter(function(order){

        return(

            order.customerName.toLowerCase().includes(value)

            ||

            order.customerNumber.includes(value)

            ||

            order.orderId.toLowerCase().includes(value)

        );

    });

    displayOrders(filteredOrders);

});


/*==========================================
    DATE FILTER
==========================================*/

filterBtn.addEventListener("click",function(){

    if(fromDate.value === "" || toDate.value === ""){

        alert("Please select both dates.");

        return;

    }

    let start = new Date(fromDate.value);

    let end = new Date(toDate.value);

    let filteredOrders = allOrders.filter(function(order){

        let orderDate = new Date(order.orderDate);

        return(

            orderDate >= start

            &&

            orderDate <= end

        );

    });

    displayOrders(filteredOrders);

});


/*==========================================
    RESET FILTER
==========================================*/

fromDate.addEventListener("change",function(){

    if(fromDate.value === "" && toDate.value === ""){

        displayOrders(allOrders);

    }

});

toDate.addEventListener("change",function(){

    if(fromDate.value === "" && toDate.value === ""){

        displayOrders(allOrders);

    }

});
/*==========================================
    EXPORT TO EXCEL (CSV)
==========================================*/

const exportExcel = document.getElementById("exportExcel");

exportExcel.addEventListener("click", function () {

    if (allOrders.length === 0) {

        alert("No orders available to export.");

        return;

    }

    let csv =
        "Order ID,Customer Name,Phone Number,Type,Status,Order Date,Total Amount\n";

    allOrders.forEach(function (order) {

        csv +=
            `"${order.orderId}",` +
            `"${order.customerName}",` +
            `"${order.customerNumber}",` +
            `"${order.type}",` +
            `"${order.status}",` +
            `"${order.orderDate}",` +
            `"${order.totalAmount}"\n`;

    });

    const blob = new Blob([csv], {

        type: "text/csv;charset=utf-8;"

    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "Modern_Chain_Link_Orders.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

});


/*==========================================
    SORT ORDERS (LATEST FIRST)
==========================================*/

function sortOrders() {

    allOrders.sort(function (a, b) {

        return new Date(b.orderDate) - new Date(a.orderDate);

    });

}


/*==========================================
    REFRESH TABLE
==========================================*/

function refreshTable() {

    refreshDashboard();

    sortOrders();

    displayOrders(allOrders);

}


/*==========================================
    SAFE INITIALIZATION
==========================================*/

window.addEventListener("load", function () {

    try {

        refreshTable();

    }

    catch (error) {

        console.log("Dashboard Error :", error);

        alert("Unable to load dashboard.");

    }

});


/*==========================================
    AUTO REFRESH WHEN PAGE IS FOCUSED
==========================================*/

window.addEventListener("focus", function () {

    refreshTable();

});


/*==========================================
    PREVENT BACK BUTTON AFTER LOGOUT
==========================================*/

window.history.pushState(null, null, window.location.href);

window.onpopstate = function () {

    window.history.pushState(null, null, window.location.href);

};


/*==========================================
    END OF DASHBOARD.JS
==========================================*/