const URL = 'https://api.app.spectoos.com';
var pad = document.querySelector('button');



pad.addEventListener('click', function (event) {
  var nodes = document.querySelectorAll('input');
  var user = { };
  nodes.forEach(function(node){
    user[node.id] = node.value;
  });
  console.log(user)
  var request = fetch(`${URL}/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
  .then(function(json){
    Object.keys(json.errors).forEach(function(key){
      var screen = document.querySelector('output');
      var errorWindow = document.querySelector('.error');
      if(key == 'base'){ 
        errorWindow.classList.add('errored'); 
        return screen.value = json.errors.base;
      } 
      var val = key.toString();
      var value = document.getElementById(`${val}-node`);
      value.classList.add('errored');
      var text = document.getElementById(`${val}-error-text`);
      text.textContent = json.errors[key];
      return text
    });
  })
  .catch(error => console.error('Error:', error))
}) 

function clearner(){
  var errorWindow = document.querySelector('.error');
  document.querySelectorAll('input').forEach(function(item){
    item.addEventListener('focus', function(event){
      var val = this.closest('.textfield');
      errorWindow.classList.remove('errored');
      val.classList.remove('errored');
    });
  });
}

clearner();





