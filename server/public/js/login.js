const urlParams = new URLSearchParams( window.location.search);
  const form = document.querySelector('form')
  const p = document.querySelector('p')
  
  if(urlParams.get('username') != null){
    form.children[0].children[0].value = urlParams.get('username')
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    p.style.display = 'none';
    if(form.children[0].children[0].value.length >= 4
      && form.children[1].children[0].value.length >= 4){
        fetch('/login',
          {method: 'POST',
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
            document.cookie = `session=${res.token}; expires=Thu, 18 Dec 2050 12:00:00 UTC; path=/`;
            window.location.href = '/';
          }else{
            p.innerHTML = 'Usuaio o contraseña incorrectos';
            p.style.display = 'block';
          }
        });
      }else{
        p.innerHTML = 'Usuaio o contraseña incorrectos';
        p.style.display = 'block';
      }
  });