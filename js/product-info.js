const CurrPrID /*current product URL*/ = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE 
const ProdComm /*product comments*/ = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE

function showProductInfo(){
    document.getElementById("prname").innerHTML = `<h2>${info.name}</h2>`
    document.getElementById("desc").innerHTML = info.description
    document.getElementById("priceP").innerHTML = `UYU ${info.cost}`
    document.getElementById("catP").innerHTML = info.category
    document.getElementById("countP").innerHTML = `${info.soldCount}`
    for (let i = 0; i < info.images.length; i++) {
        document.getElementById("imgP").innerHTML += `<img style="max-width: 200px" src="${info.images[i]}">`
    }
    htmlContentToAppend = ""
    currentRelated = []
    for(let i = 0; i < info.relatedProducts.length; i++){
        currentRelated = info.relatedProducts[i]
        htmlContentToAppend += `
        <div onclick="setProdID(${currentRelated.id})" class="list-group-item list-group-item-action cursor-active">
              <div class="row">
                  <div class="col-3">
                      <img src="${currentRelated.image}" class="img-thumbnail" style="max-width: 150px">
                  </div>
                  <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${currentRelated.name} 
                        </div>
                    </div>
              </div>
        </div>`
        }
    document.getElementById("related-container").innerHTML = htmlContentToAppend
}

function showComments(){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < comms.length; i++){
        comment = comms[i]
        let stars = ""
        
        for (let h = 0; h < 5; h++) {
            if(h<comment.score){
                stars += `<span class="fa fa-star checked"></span>`
            }else{
                stars += `<span class="fa fa-star"></span>`
            }
        }
        //console.log(stars)

    htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
              <div class="row">
                  <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                          <h4 class="mb-1">${stars} ${comment.user}</h4>
                          <small class="text-muted" id="ratingP">${comment.dateTime}</small>
                      </div>
                      <p class="mb-1">${comment.description}</p>
                  </div>
              </div>
            </div>
            `
        }
        document.getElementById("comment-container").innerHTML = htmlContentToAppend;
}

function fetchAndShow(){
    getJSONData(CurrPrID).then(function(resultObj){
        if (resultObj.status === "ok"){
            info = resultObj.data
            showProductInfo()
            console.log(info)
        }
    })
    //debugger
    getJSONData(ProdComm).then(function(resultObj){
        if (resultObj.status === "ok"){
            comms = resultObj.data
            if (comms.length != 0) {showComments()}
            //debugger
            console.log(comms)
        }
    })}



// --------------------------- Programs start ---------------------------

document.addEventListener("DOMContentLoaded", function(e){
    fetchAndShow()    
})
// Explicar esto
