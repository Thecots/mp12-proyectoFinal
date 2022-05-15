  const form = document.querySelector('form')
  const p = document.querySelector('p')
  
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    p.style.display = 'none';
    if(form.children[0].children[0].value.length >= 4
      && form.children[1].children[0].value.length >= 4
      && form.children[1].children[0].value === form.children[2].children[0].value){
        fetch('/register',
          {method: 'PUT',
          body: JSON.stringify({
            username: form.children[0].children[0].value,
            password: form.children[1].children[0].value
          }),
          headers:{
            'Content-Type': 'application/json'
          }}
        ).then(res => res.json())
        .then(res => {
          if(res.ok){
            alert('Usuario creado correctamente')
            window.location.href = '/login?username='+form.children[0].children[0].value;
          }else{
            p.innerHTML = 'Este nombre de usuario ya está en uso.';
            p.style.display = 'block';
          }
        });
      }else{    
       if(form.children[1].children[0].value.length !== form.children[2].children[0].value.length){
          p.innerHTML = 'Las contraseñas no coinciden.';
          p.style.display = 'block';
        }else{
          p.innerHTML = 'error';
          p.style.display = 'block';
        }
        
      }
  });