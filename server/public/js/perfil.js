
  document.querySelector('form').addEventListener('submit', (e) =>{
    e.preventDefault()
    file = new FormData();
    file.append('img',document.querySelector('form input').files[0])
    
    fetch('/profile/image/',{
      method: 'POST',
      body: file
    }).then(r => r.json())
      .then(r => {
        if(r.ok){
          window.location.reload()
        }else{
          console.error('error xd')
        }
      })
  })

  function imgch(){
    document.querySelector('.extrwindow').style.display = 'flex'
  }

  function closeimgc(){
    document.querySelector('.extrwindow').style.display = 'none'
    document.querySelector('#output').style.display = 'none'
  }

  function loadFile(event) {
    document.querySelector('#output').style.display = 'block'
    var output = document.querySelector('#output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src)
    }
  };