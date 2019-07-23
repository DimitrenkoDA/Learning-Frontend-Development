var screen = document.querySelector('output')
var nodes = document.querySelectorAll('input');
var pad = document.querySelector('button');
var user = { email: '0', password: '0' };
var errorWindow = document.querySelector('.error');

pad.addEventListener('click', function (event) {
  var a = nodes[0].value;
  var b = nodes[1].value;
  user.email = a;
  user.password = b;
  console.log(user);
  var request = fetch('https://api.app.spectoos.com/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(function(json){
    console.log(json.errors);
    Object.keys(json.errors).forEach(function(key){
      if(key == 'base'){ 
        errorWindow.classList.add('errored'); 
        return screen.value = json.errors.base;
      } 
      var value = document.getElementById(key.toString());;
      value.classList.add('errored');
      var text = document.getElementById(key.toString()+'-error-text');
      return text.textContent = json.errors[key]
    });
  })
  .catch(error => console.error('Error:', error))
}) 

nodes[0].addEventListener('focus', function(event){
  errorWindow.classList.remove('errored');
  var email = document.getElementById('email');
  var emailErrTxt = document.getElementById('email-error-text');
  email.classList.remove('errored');
  emailErrTxt.classList.remove('errored');
});

nodes[1].addEventListener('focus', function(event){
  errorWindow.classList.remove('errored');
  var password = document.getElementById('password');
  var passwordErrTxt = document.getElementById('password-error-text');
  password.classList.remove('errored');
  passwordErrTxt.classList.remove('errored');
});



