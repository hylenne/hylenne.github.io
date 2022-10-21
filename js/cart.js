let userID = 25801
let returnInfo = []
let cartItems = []
let currentItem = {}
let amount = null
let subtotal = 0
let price = 0


const table = document.getElementById("cart")
const currentCartUrl = CART_INFO_URL + userID + ".json"

function addProduct(pr) {
    table.insertAdjacentHTML("beforeend", `<tr id=${pr.id}>
    <td><img src="${pr.image}" class="smallimg"></td>
    <td>${pr.name} (${pr.id})</td>
    <td>${pr.unitCost} ${pr.currency}</td>
    <td><input class="amount" type="number" oninput="subtotalCalc(${pr.id})" style="max-width: 100px;"></td>
    <td class="subtotal"></td></tr>`)}

function subtotalCalc(prID){
    
    amount = document.getElementById(prID).children[3].children[0].value
    if ((amount != undefined) && (amount != "") && (parseInt(amount)) >= 0){amount = parseInt(amount)}
    price = currentItem.unitCost
    subtotal = amount * price
    document.getElementById(prID).children[4].innerHTML = `${subtotal} ${currentItem.currency}`
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