/*==========================================
    INSTALLATION.JS
    PART 4D-1
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

const place = document.getElementById("place");

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

const labourCost = document.getElementById("labourCost");

const travelExpense = document.getElementById("travelExpense");

const stoneRequired = document.getElementById("stoneRequired");

const stoneCount = document.getElementById("stoneCount");

const stoneCost = document.getElementById("stoneCost");

const advancePaid = document.getElementById("advancePaid");

const amountPaid = document.getElementById("amountPaid");

const totalAmount = document.getElementById("totalAmount");

const balance = document.getElementById("balance");

const status = document.getElementById("status");


/*==========================================
    GLOBAL VARIABLES
==========================================*/

let installationOrders =
JSON.parse(localStorage.getItem("installationOrders")) || [];

let editIndex = -1;


/*==========================================
    OPEN POPUP
==========================================*/

addOrderBtn.addEventListener("click", function () {

    popup.style.display = "flex";

    popupTitle.innerHTML = "Add Installation Order";

    orderForm.reset();

    totalAmount.value = "";

    balance.value = "";

    stoneCount.disabled = true;

    stoneCost.disabled = true;

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
    STONE REQUIRED
==========================================*/

stoneRequired.addEventListener("change", function () {

    if (stoneRequired.value === "Yes") {

        stoneCount.disabled = false;

        stoneCost.disabled = false;

    }

    else {

        stoneCount.disabled = true;

        stoneCost.disabled = true;

        stoneCount.value = "";

        stoneCost.value = "";

    }

});


/*==========================================
    GENERATE ORDER ID
==========================================*/

function generateOrderId() {

    let number = installationOrders.length + 1;

    return "INST" + number.toString().padStart(4, "0");

}


/*==========================================
    SAVE DATA
==========================================*/

function saveOrders() {

    localStorage.setItem(

        "installationOrders",

        JSON.stringify(installationOrders)

    );

}


/*==========================================
    LOAD DATA
==========================================*/

function loadOrders() {

    installationOrders =

    JSON.parse(

        localStorage.getItem("installationOrders")

    ) || [];

}


/*==========================================
    REFRESH DATA
==========================================*/

function refreshData() {

    loadOrders();

}
/*==========================================
    CALCULATE TOTAL
==========================================*/

function calculateTotal() {

    let h = Number(height.value) || 0;

    let l = Number(length.value) || 0;

    let sqft = Number(sqftPrice.value) || 0;

    let labour = Number(labourCost.value) || 0;

    let travel = Number(travelExpense.value) || 0;

    let stone = Number(stoneCost.value) || 0;

    let materialCost = h * l * sqft;

    let grandTotal = materialCost + labour + travel + stone;

    totalAmount.value = grandTotal.toFixed(2);

    calculateBalance();

}


/*==========================================
    CALCULATE BALANCE
==========================================*/

function calculateBalance() {

    let total = Number(totalAmount.value) || 0;

    let paid = Number(amountPaid.value) || 0;

    balance.value = (total - paid).toFixed(2);

}


/*==========================================
    AUTO CALCULATE
==========================================*/

height.addEventListener("input", calculateTotal);

length.addEventListener("input", calculateTotal);

sqftPrice.addEventListener("input", calculateTotal);

labourCost.addEventListener("input", calculateTotal);

travelExpense.addEventListener("input", calculateTotal);

stoneCost.addEventListener("input", calculateTotal);

amountPaid.addEventListener("input", calculateBalance);


/*==========================================
    SAVE ORDER
==========================================*/

orderForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (

        customerName.value.trim() === "" ||

        customerNumber.value.trim() === "" ||

        place.value.trim() === "" ||

        orderDate.value === ""

    ) {

        alert("Please fill all required fields.");

        return;

    }

    let order = {

        orderId:

            editIndex === -1

                ? generateOrderId()

                : installationOrders[editIndex].orderId,

        customerName: customerName.value,

        customerNumber: customerNumber.value,

        place: place.value,

        type: type.value,

        diamondSize: diamondSize.value,

        brand: brand.value,

        height: height.value,

        length: length.value,

        orderDate: orderDate.value,

        deliveryDate: deliveryDate.value,

        sqftPrice: sqftPrice.value,

        barbedWire: barbedWire.value,

        bindingWire: bindingWire.value,

        labourCost: labourCost.value,

        travelExpense: travelExpense.value,

        stoneRequired: stoneRequired.value,

        stoneCount: stoneCount.value,

        stoneCost: stoneCost.value,

        advancePaid: advancePaid.value,

        amountPaid: amountPaid.value,

        totalAmount: totalAmount.value,

        balance: balance.value,

        status: status.value

    };


    if (editIndex === -1) {

        installationOrders.push(order);

    }

    else {

        installationOrders[editIndex] = order;

    }


    saveOrders();

    popup.style.display = "none";

    orderForm.reset();

    totalAmount.value = "";

    balance.value = "";

    editIndex = -1;

    displayOrders();

});
/*==========================================
    DISPLAY ORDERS
==========================================*/

function displayOrders() {

    orderTable.innerHTML = "";

    if (installationOrders.length === 0) {

        orderTable.innerHTML =

        `
        <tr>

            <td colspan="8">

                No Installation Orders Found

            </td>

        </tr>
        `;

        return;

    }

    installationOrders.forEach(function (order, index) {

        orderTable.innerHTML +=

        `
        <tr>

            <td>${order.orderId}</td>

            <td>${order.customerName}</td>

            <td>${order.customerNumber}</td>

            <td>${order.place}</td>

            <td>${order.type}</td>

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

    });

}


/*==========================================
    EDIT ORDER
==========================================*/

function editOrder(index) {

    editIndex = index;

    let order = installationOrders[index];

    popup.style.display = "flex";

    popupTitle.innerHTML = "Edit Installation Order";

    customerName.value = order.customerName;

    customerNumber.value = order.customerNumber;

    place.value = order.place;

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

    labourCost.value = order.labourCost;

    travelExpense.value = order.travelExpense;

    stoneRequired.value = order.stoneRequired;

    if (order.stoneRequired === "Yes") {

        stoneCount.disabled = false;

        stoneCost.disabled = false;

    }

    else {

        stoneCount.disabled = true;

        stoneCost.disabled = true;

    }

    stoneCount.value = order.stoneCount;

    stoneCost.value = order.stoneCost;

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
    INITIAL DISPLAY
==========================================*/

refreshTable();
/*==========================================
    SEARCH ORDERS
==========================================*/

searchBox.addEventListener("keyup", function () {

    let value = searchBox.value.toLowerCase();

    let filteredOrders = installationOrders.filter(function (order) {

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

            <td colspan="8">

                No Matching Orders Found

            </td>

        </tr>
        `;

        return;

    }

    orderList.forEach(function (order) {

        let originalIndex = installationOrders.findIndex(function (item) {

            return item.orderId === order.orderId;

        });

        orderTable.innerHTML +=

        `
        <tr>

            <td>${order.orderId}</td>

            <td>${order.customerName}</td>

            <td>${order.customerNumber}</td>

            <td>${order.place}</td>

            <td>${order.type}</td>

            <td>

                <span class="status ${order.status.toLowerCase()}">

                    ${order.status}

                </span>

            </td>

            <td>₹${order.totalAmount}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editOrder(${originalIndex})">

                    Edit

                </button>



            </td>

        </tr>

        `;

    });

}


/*==========================================
    EXPORT CSV
==========================================*/

exportBtn.addEventListener("click", function () {

    if (installationOrders.length === 0) {

        alert("No Orders Available");

        return;

    }

    let csv =

"Order ID,Customer Name,Phone,Place,Type,Brand,Height,Length,Order Date,Delivery Date,Sq.ft Price,Labour Cost,Travel Expense,Stone Required,Stone Count,Stone Cost,Total Amount,Amount Paid,Balance,Status\n";

    installationOrders.forEach(function (order) {

        csv +=

`${order.orderId},
${order.customerName},
${order.customerNumber},
${order.place},
${order.type},
${order.brand},
${order.height},
${order.length},
${order.orderDate},
${order.deliveryDate},
${order.sqftPrice},
${order.labourCost},
${order.travelExpense},
${order.stoneRequired},
${order.stoneCount},
${order.stoneCost},
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

    a.download = "Installation_Orders.csv";

    a.click();

    URL.revokeObjectURL(url);

});


/*==========================================
    SORT ORDERS
==========================================*/

function sortOrders() {

    installationOrders.sort(function (a, b) {

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
