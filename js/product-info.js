const CurrPrID /*current product URL*/ = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE 

function showProductInfo(){
    document.getElementById("prname").innerHTML = `<h2>${info.name}</h2>`
    document.getElementById("desc").innerHTML = info.description
    document.getElementById("priceP").innerHTML = `UYU ${info.cost}`
    document.getElementById("catP").innerHTML = info.category
    document.getElementById("countP").innerHTML = `${info.soldCount}`
    
    
    for (let i = 0; i < info.images.length; i++) {
        document.getElementById("imgP").innerHTML += `<img style="max-width: 200px" src="${info.images[i]}">`
    }
}





// --------------------------- Programs start ---------------------------

document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(CurrPrID).then(function(resultObj){
        if (resultObj.status === "ok"){
            info = resultObj.data
            showProductInfo()
            console.log(info)
        }
    })
})
