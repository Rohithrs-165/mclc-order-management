/*==========================================
    MATERIAL.JS
    PART 3C-1
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

const popup = document.getElementById("popup");

const addOrderBtn = document.getElementById("addOrderBtn");

const cancelBtn = document.getElementById("cancelBtn");

const orderForm = document.getElementById("orderForm");

const popupTitle = document.getElementById("popupTitle");

const backBtn = document.getElementById("backBtn");

const orderTable = document.getElementById("orderTable");

const searchBox = document.getElementById("searchBox");

const exportBtn = document.getElementById("exportBtn");


/*==========================================
    FORM ELEMENTS
==========================================*/

const customerName = document.getElementById("customerName");

const customerNumber = document.getElementById("customerNumber");

const type = document.getElementById("type");

const diamondSize = document.getElementById("diamondSize");

const brand = document.getElementById("brand");

const height = document.getElementById("height");

const length = document.getElementById("length");

const orderDate = document.getElementById("orderDate");

const deliveryDate = document.getElementById("deliveryDate");

const sqftPrice = document.getElementById("sqftPrice");

const barbedWire = document.getElementById("barbedWire");

const bindingWire = document.getElementById("bindingWire");

const advancePaid = document.getElementById("advancePaid");

const amountPaid = document.getElementById("amountPaid");

const totalAmount = document.getElementById("totalAmount");

const balance = document.getElementById("balance");

const status = document.getElementById("status");


/*==========================================
    GLOBAL VARIABLES
==========================================*/

let materialOrders =
JSON.parse(localStorage.getItem("materialOrders")) || [];

let editIndex = -1;


/*==========================================
    OPEN POPUP
==========================================*/

addOrderBtn.addEventListener("click", function () {

    popup.style.display = "flex";

    popupTitle.innerHTML = "Add Material Order";

    orderForm.reset();

    totalAmount.value = "";

    balance.value = "";

    editIndex = -1;

});


/*==========================================
    CLOSE POPUP
==========================================*/

cancelBtn.addEventListener("click", function () {

    popup.style.display = "none";

});


window.addEventListener("click", function (event) {

    if (event.target === popup) {

        popup.style.display = "none";

    }

});


/*==========================================
    DASHBOARD BUTTON
==========================================*/

backBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});


/*==========================================
    GENERATE ORDER ID
==========================================*/

function generateOrderId() {

    let number = materialOrders.length + 1;

    return "MCLC" + number.toString().padStart(4, "0");

}


/*==========================================
    SAVE DATA
==========================================*/

function saveOrders() {

    localStorage.setItem(

        "materialOrders",

        JSON.stringify(materialOrders)

    );

}


/*==========================================
    LOAD DATA
==========================================*/

function loadOrders() {

    materialOrders =

        JSON.parse(

            localStorage.getItem("materialOrders")

        ) || [];

}


/*==========================================
    REFRESH DATA
==========================================*/

function refreshData() {

    loadOrders();

}
/*==========================================
    AUTO CALCULATE TOTAL AMOUNT
==========================================*/

function calculateTotal() {

    let h = Number(height.value) || 0;

    let l = Number(length.value) || 0;

    let price = Number(sqftPrice.value) || 0;

    let area = h * l;

    let total = area * price;

    totalAmount.value = total;

    calculateBalance();

}


/*==========================================
    AUTO CALCULATE BALANCE
==========================================*/

function calculateBalance() {

    let total = Number(totalAmount.value) || 0;

    let paid = Number(amountPaid.value) || 0;

    balance.value = total - paid;

}


/*==========================================
    AUTO UPDATE WHEN VALUES CHANGE
==========================================*/

height.addEventListener("input", calculateTotal);

length.addEventListener("input", calculateTotal);

sqftPrice.addEventListener("input", calculateTotal);

amountPaid.addEventListener("input", calculateBalance);


/*==========================================
    FORM SUBMIT
==========================================*/

orderForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /*========== VALIDATION ==========*/

    if (customerName.value.trim() === "") {

        alert("Enter Customer Name");

        customerName.focus();

        return;

    }

    if (customerNumber.value.trim() === "") {

        alert("Enter Customer Number");

        customerNumber.focus();

        return;

    }

    if (orderDate.value === "") {

        alert("Select Order Date");

        orderDate.focus();

        return;

    }


    /*========== ORDER OBJECT ==========*/

    const order = {

        orderId:
            editIndex === -1
                ? generateOrderId()
                : materialOrders[editIndex].orderId,

        customerName: customerName.value,

        customerNumber: customerNumber.value,

        type: type.value,

        diamondSize: diamondSize.value,

        brand: brand.value,

        height: Number(height.value) || 0,

        length: Number(length.value) || 0,

        orderDate: orderDate.value,

        deliveryDate: deliveryDate.value,

        sqftPrice: Number(sqftPrice.value) || 0,

        barbedWire: Number(barbedWire.value) || 0,

        bindingWire: Number(bindingWire.value) || 0,

        advancePaid: Number(advancePaid.value) || 0,

        amountPaid: Number(amountPaid.value) || 0,

        totalAmount: Number(totalAmount.value) || 0,

        balance: Number(balance.value) || 0,

        status: status.value

    };


    /*========== ADD / UPDATE ==========*/

    if (editIndex === -1) {

        materialOrders.push(order);

    }

    else {

        materialOrders[editIndex] = order;

    }


    /*========== SAVE ==========*/

    saveOrders();


    /*========== CLOSE POPUP ==========*/

    popup.style.display = "none";

    orderForm.reset();

    totalAmount.value = "";

    balance.value = "";

    editIndex = -1;


    /*========== REFRESH TABLE ==========*/

    displayOrders();

});
/*==========================================
    DISPLAY ORDERS
==========================================*/

function displayOrders() {

    orderTable.innerHTML = "";

    if (materialOrders.length === 0) {

        orderTable.innerHTML =

        `
        <tr>

            <td colspan="10">

                No Material Orders Found

            </td>

        </tr>
        `;

        return;

    }

    materialOrders.forEach(function (order, index) {

        let row =

        `
        <tr>

            <td>${order.orderId}</td>

            <td>${order.customerName}</td>

            <td>${order.customerNumber}</td>

            <td>${order.type}</td>

            <td>${order.brand}</td>

            <td>${order.height}</td>

            <td>${order.length}</td>

            <td>

                <span class="status ${order.status.toLowerCase()}">

                    ${order.status}

                </span>

            </td>

            <td>₹${order.totalAmount}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editOrder(${index})">

                    Edit

                </button>


            </td>

        </tr>

        `;

        orderTable.innerHTML += row;

    });

}


/*==========================================
    EDIT ORDER
==========================================*/

function editOrder(index) {

    editIndex = index;

    const order = materialOrders[index];

    popup.style.display = "flex";

    popupTitle.innerHTML = "Edit Material Order";

    customerName.value = order.customerName;

    customerNumber.value = order.customerNumber;

    type.value = order.type;

    diamondSize.value = order.diamondSize;

    brand.value = order.brand;

    height.value = order.height;

    length.value = order.length;

    orderDate.value = order.orderDate;

    deliveryDate.value = order.deliveryDate;

    sqftPrice.value = order.sqftPrice;

    barbedWire.value = order.barbedWire;

    bindingWire.value = order.bindingWire;

    advancePaid.value = order.advancePaid;

    amountPaid.value = order.amountPaid;

    totalAmount.value = order.totalAmount;

    balance.value = order.balance;

    status.value = order.status;

}


/* Delete functionality removed */


/*==========================================
    REFRESH TABLE
==========================================*/

function refreshTable() {

    loadOrders();

    displayOrders();

}


/*==========================================
    INITIAL LOAD
==========================================*/

refreshTable();
/*==========================================
    SEARCH ORDERS
==========================================*/

searchBox.addEventListener("keyup", function () {

    let value = searchBox.value.toLowerCase();

    let filteredOrders = materialOrders.filter(function (order) {

        return (

            order.customerName.toLowerCase().includes(value) ||

            order.customerNumber.includes(value) ||

            order.orderId.toLowerCase().includes(value)

        );

    });

    displayFilteredOrders(filteredOrders);

});


/*==========================================
    DISPLAY FILTERED ORDERS
==========================================*/

function displayFilteredOrders(orderList) {

    orderTable.innerHTML = "";

    if (orderList.length === 0) {

        orderTable.innerHTML =

        `
        <tr>

            <td colspan="10">

                No Matching Orders Found

            </td>

        </tr>
        `;

        return;

    }

    orderList.forEach(function (order, index) {

        orderTable.innerHTML +=

        `
        <tr>

            <td>${order.orderId}</td>

            <td>${order.customerName}</td>

            <td>${order.customerNumber}</td>

            <td>${order.type}</td>

            <td>${order.brand}</td>

            <td>${order.height}</td>

            <td>${order.length}</td>

            <td>

                <span class="status ${order.status.toLowerCase()}">

                    ${order.status}

                </span>

            </td>

            <td>₹${order.totalAmount}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editOrder(materialOrders.findIndex(o => o.orderId==='${order.orderId}'))">

                    Edit

                </button>



            </td>

        </tr>

        `;

    });

}


/*==========================================
    EXPORT TO CSV
==========================================*/

exportBtn.addEventListener("click", function () {

    if (materialOrders.length === 0) {

        alert("No Orders Available");

        return;

    }

    let csv =

"Order ID,Customer Name,Phone,Type,Brand,Height,Length,Order Date,Delivery Date,Sqft Price,Total Amount,Amount Paid,Balance,Status\n";

    materialOrders.forEach(function (order) {

        csv +=

`${order.orderId},

${order.customerName},

${order.customerNumber},

${order.type},

${order.brand},

${order.height},

${order.length},

${order.orderDate},

${order.deliveryDate},

${order.sqftPrice},

${order.totalAmount},

${order.amountPaid},

${order.balance},

${order.status}\n`;

    });

    let blob = new Blob([csv], {

        type: "text/csv"

    });

    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");

    a.href = url;

    a.download = "Material_Orders.csv";

    a.click();

    URL.revokeObjectURL(url);

});


/*==========================================
    SORT ORDERS
==========================================*/

function sortOrders() {

    materialOrders.sort(function (a, b) {

        return new Date(b.orderDate) - new Date(a.orderDate);

    });

}


/*==========================================
    PAGE LOAD
==========================================*/

window.onload = function () {

    refreshData();

    sortOrders();

    displayOrders();

};


/*==========================================
    REFRESH ON WINDOW FOCUS
==========================================*/

window.addEventListener("focus", function () {

    refreshData();

    displayOrders();

});