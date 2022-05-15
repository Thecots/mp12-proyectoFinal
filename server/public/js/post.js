function postLike(e){
  fetch('/post/like/',{
    method: 'POST',
    body: JSON.stringify({id: e}),
    headers:{ 'Content-Type': 'application/json'}
  })
  .then(resp => resp.json())
  .then(resp => {
    if(resp.ok){
      x = document.querySelector(`#post${e}`)
      c = document.querySelector(`#postimg${e}`)
      if(resp.action === '+'){
        x.innerHTML = parseInt(x.innerHTML)+1
        c.classList.add('imlikeon')
      }else{
        x.innerHTML = parseInt(x.innerHTML)-1
        c.classList.remove('imlikeon')
      }
    }
  })
}

function likeComment(e){
  fetch('/comment/like/',{
    method: 'POST',
    body: JSON.stringify({id: e}),
    headers:{ 'Content-Type': 'application/json'}
  })
  .then(resp => resp.json())
  .then(resp => {
    if(resp.ok){
      x = document.querySelector(`#comment${e}`)
      c = document.querySelector(`#commentimg${e}`)
      if(resp.action === '+'){
        x.innerHTML = parseInt(x.innerHTML)+1
        c.classList.add('imlikeon')
      }else{
        x.innerHTML = parseInt(x.innerHTML)-1
        c.classList.remove('imlikeon')
      }
    }
  })
}