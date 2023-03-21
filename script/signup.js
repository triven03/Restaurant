var usernameNode = document.getElementById("username");
var phoneNode = document.getElementById("phone");
var emailNode = document.getElementById("email");
var passwordNode = document.getElementById("password");
var signupNode = document.getElementById("signup");
var errorNode = document.getElementById("error");

signupNode.addEventListener("click", function()
{
  var isFormValid = validateForm([usernameNode.value, phoneNode.value, emailNode.value, passwordNode.value])

  if(!isFormValid)
  {
    errorNode.innerText = "Fill entire form";
    return
  }

  var username = usernameNode.value;
  var password = passwordNode.value;
  var phone = phoneNode.value;
  var email = emailNode.value;

  errorNode.innerText = "";
  singupUser(username, password, phoneNode, email)
})


function singupUser(username, password, phone, email)
{
  var request = new XMLHttpRequest();
  request.open("POST","https://foodbukka.herokuapp.com/api/v1/auth/register");

  request.setRequestHeader("Content-Type","application/json");

  var body = {
      "username": username,
      "password":password,
      email: email,
      phone: phone
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
      successFullSignUp(result)
    }
  })

}


function showError(data)
{
  errorNode.innerText = data.error
}


function successFullSignUp(data)
{
  localStorage.setItem("token", data.token);
  window.location.href = "/"
}


function validateForm(data)
{
  return data.every(function(value)
  {
    return value !== ""
  })
}