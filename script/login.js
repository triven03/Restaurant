var usernameNode = document.getElementById("username");
var passwordNode = document.getElementById("password");
var loginNode = document.getElementById("login");
var errorNode = document.getElementById("error");

loginNode.addEventListener("click", function()
{
  
  var username = usernameNode.value;
  var password = passwordNode.value;

  errorNode.innerText = "";
  loginUser(username, password)
})


function loginUser(username, password)
{
  
  var request = new XMLHttpRequest();
  request.open("POST","https://foodbukka.herokuapp.com/api/v1/auth/login");

  request.setRequestHeader("Content-Type","application/json");

  var body = {
      "username": username,
      "password":password
  }

  request.send( JSON.stringify(body) );

  request.addEventListener("load", function()
  {
    const result = JSON.parse(request.responseText);

    if(request.status !== 200)
    {
      showError(result)
    }
    else
    {
      loginSuccess(result)
    }
  })

}


function showError(data)
{
  errorNode.innerText = data.error
}


function loginSuccess(data)
{
  localStorage.setItem("token", data.token);
  window.location.href = "/"

}