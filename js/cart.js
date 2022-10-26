let userID = 25801
let returnInfo = []
let cartItems = []
let currentItem = {}
let amount = null
let subtotal = 0
let subtotalAll = 0
let price = 0

const table = document.getElementById("cart")
const currentCartUrl = CART_INFO_URL + userID + ".json"

function addProduct(pr) {
    table.insertAdjacentHTML("beforeend", `<tr id=${pr.id}>
    <td><img src="${pr.image}" class="smallimg"></td>
    <td>${pr.name} (${pr.id})</td>
    <td>${pr.unitCost} ${pr.currency}</td>
    <td><input id="amount${pr.id}" class="amount" type="number" oninput="subtotalCalc(${pr.id})" style="max-width: 100px;" value=0></td>
    <td id="subtotal${pr.id}"></td></tr>`)
    console.log(pr)
    console.log(pr.currency)}

function subtotalCalc(prID){
    amount = document.getElementById(`amount${prID}`).value
    if ((amount != undefined) && (amount != "") && (parseInt(amount)) >= 0){amount = parseInt(amount)}
    price = currentItem.unitCost
    subtotal = amount * price
    document.getElementById(`subtotal${prID}`).innerHTML = `${subtotal} ${currentItem.currency}`

    cartItems[cartItems.findIndex((found) => found = prID)].subtotal = subtotal
    updateSubtotal()
}

function updateSubtotal(){
    subtotalAll = 0
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].currency === "UYU") {subtotalAll += Math.round(cartItems[i].subtotal / 41.20)}
        //Al día de hoy, 26 de octubre, el dólar está a 41.20 pesos.
        else {subtotalAll += cartItems[i].subtotal}
    }
    document.getElementById("subtotalAllCont").innerHTML = subtotalAll + " USD"
}

function showCart(){
for (let i = 0; i < cartItems.length; i++) {
    currentItem = cartItems[i]
    addProduct(currentItem)
}}

function fetchAndShow(){
    getJSONData(currentCartUrl).then(function(resultObj){
        if (resultObj.status === "ok"){
            returnInfo = resultObj.data
            cartItems = returnInfo.articles
            console.log(returnInfo)
            console.log(cartItems)
            showCart()
        }
    })}

addEventListener("DOMContentLoaded", fetchAndShow())