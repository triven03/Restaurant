var authButton = document.getElementById("authButton");
var restaurents = document.getElementById("restaurents");
var sinupdiv = document.getElementById("siup")
var btn = document.getElementById('Supbtn');



var token = localStorage.getItem("token");

if (token) {
    authButton.innerText = "Logout";
    sinupdiv.removeChild(btn);
    fetchAllResturents();
} else {
    authButton.innerText = "Login";



}

authButton.addEventListener("click", function() {
    if (token) {
        logoutUser()
        return
    }

    window.location.href = "/pages/login.html";

})
btn.addEventListener("click", function() {
    window.location.href = "/pages/signup.html";

})

function logoutUser() {
    localStorage.removeItem("token");
    window.location.reload();
}



function fetchAllResturents() {
    var request = new XMLHttpRequest();

    request.open("GET", "https://foodbukka.herokuapp.com/api/v1/restaurant")
    request.send();

    request.addEventListener("load", function() {
        if (request.status === 200) {
            showAllResults(JSON.parse(request.responseText))
        } else {
            console.log("something went wrong")
                // error handling
        }
    })

}

function showAllResults(reestaurentData) {
    console.log(reestaurentData)
    reestaurentData.Result.forEach(function(restaurent) {
        var container = document.createElement("div");
        container.classList.add("restaurentContainer");

        var name = document.createElement("h2");
        name.setAttribute('id', 'nameres')
        name.innerText = restaurent.businessname;
        container.appendChild(name);

        var address = document.createElement("p");
        address.innerHTML = `Restro Location :  <b>${restaurent.address}</b>`;
        container.appendChild(address);

        var image = document.createElement("img");
        image.setAttribute("src", restaurent.image)
        container.appendChild(image);
        let phone = document.createElement("p");
        let email = document.createElement("p");
        let btn = document.createElement("button");
        btn.setAttribute("id", "sbtn");
        btn.innerText = "Show Contact"
        container.appendChild(btn);
        console.log("NOde Type : " + container.lastElementChild.tagName)
        btn.addEventListener("click", () => {
            if (phone.innerText == "") {
                btn.innerText = "Hide Contact"

                phone.innerHTML = `Phone No :  <b>${restaurent.phone}</b>`;
                email.innerHTML = `Email :  <b>${restaurent.email}</b>`;

                container.appendChild(phone);
                container.appendChild(email);
            } else {
                phone.innerHTML = "";
                email.innerHTML = "";
                btn.innerText = "Show Contact"
                    // container.removeChild(phone);
                    // container.removeChild(email);
            }


        });


        restaurents.appendChild(container);

    });
}