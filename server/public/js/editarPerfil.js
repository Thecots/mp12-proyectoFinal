const f1 = document.querySelector('#fusername');
const f2 = document.querySelector('#fpassword');

f1.addEventListener('submit', e => {
  e.preventDefault();
  fetch('/profile/username/'+id, {
    method: 'POST',
    body: JSON.stringify({
      username: f1.children[1].children[0].value,
      passwd: f1.children[2].children[0].value
    })
    ,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(r => r.json())
  .then(r => {
    document.querySelector('#fusername p').style.display = 'block';
    if(r.ok){
      document.querySelector('#fusername p').style.color = 'green';
      document.querySelector('#fusername p').innerText = 'Nombre de usuario cambiado correctametne';
      document.querySelector('.sessionon h1').innerText = f1.children[1].children[0].value
      f1.reset()
    }else{
      document.querySelector('#fusername p').style.color = 'red';
      document.querySelector('#fusername p').innerText = r.err;
    }
  })
})

f2.addEventListener('submit', e => {
  e.preventDefault();
  fetch('/profile/passwd/'+id, {
    method: 'POST',
    body: JSON.stringify({
      passwd: f2.children[1].children[0].value,
      newpasswd: f2.children[2].children[0].value
    })
    ,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(r => r.json())
  .then(r => {
    document.querySelector('#fpassword p').style.display = 'block';
    if(r.ok){
      document.querySelector('#fpassword p').style.color = 'green';
      document.querySelector('#fpassword p').innerText = 'Contraseña actualizada correctamente';
      f2.reset()
    }else{
      document.querySelector('#fpassword p').style.color = 'red';
      document.querySelector('#fpassword p').innerText = r.err;
    }
  })
})