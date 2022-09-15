document.getElementById("confirm").addEventListener("click",function(){
localStorage.setItem("uemail",document.getElementById("email").value);
localStorage.setItem("upass",document.getElementById("pass").value);
location = "index.html"})