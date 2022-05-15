document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  titulo = document.querySelector('.title');
  content = document.querySelector('textarea');
  fetch('/comentar_post',
        {method: 'POST',
        body: JSON.stringify({
          postid: document.querySelector('#postid').value,
          content: document.querySelector('textarea').value
        }),
        headers:{
          'Content-Type': 'application/json'
        }}
      ).then(res => res.json())
      .then(res => {
       if(res.ok){
        Swal.fire(
          'Commentario guardado',
          '',
          'success',
        ).then(() => {
          window.location.href = `/foro/tema/${dataid}/${document.querySelector("#postid").value}/1/`
        })
       }else{
        Swal.fire(
          'Ha ocurrido un error',
          '',
          'error',
          )
       }
    });
})


document.querySelector('textarea').addEventListener('keyup', e=> {
  x = document.querySelector('textarea')
  document.querySelector('.totalletters').innerHTML = 150-x.value.length
})