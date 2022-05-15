
  apihtml = `<menu><a onclick="execCmd('undo')"><i class="fa-solid fa-rotate-left"></i></a><a onclick="execCmd('redo')"><i class="fa-solid fa-rotate-right"></i></a><select onchange="execCmd('fontSize',this.value)"><option value="3" selected="selected">Texto normal</option><option value="6">Título</option><option value="5">Subtítulo</option></select><a onclick="execCmd('bold')"><i class="fa-solid fa-bold"></i></a><a onclick="execCmd('italic')"><i class="fa-solid fa-italic"></i></a><a onclick="execCmd('underline')"><i class="fa-solid fa-underline"></i></a><a onclick="execCmd('strikethrough')"><i class="fa-solid fa-strikethrough"></i></a><div><a type="a"><i class="fa-solid fa-paintbrush"></i></a><input type="color" onchange="execCmd('foreColor',this.value)"></div><a onclick="execCmd('justifyLeft')"><i class="fa-solid fa-align-left"></i></a><a onclick="execCmd('justifyCenter')"><i class="fa-solid fa-align-center"></i></a><a onclick="execCmd('justifyRight')"><i class="fa-solid fa-align-right"></i></a><a onclick="execCmd('justifyFull')"><i class="fa-solid fa-align-justify"></i></a><a onclick="execCmd('indent')"><i class="fa-solid fa-indent"></i></a><a onclick="execCmd('outdent')"><i class="fa-solid fa-dedent"></i></a><a onclick="execCmd('subscript')"><i class="fa-solid fa-subscript"></i></a><a onclick="execCmd('superscript')"><i class="fa-solid fa-superscript"></i></a><a onclick="execCmd('insertUnorderedList')"><i class="fa-solid fa-list-ul"></i></a><a onclick="execCmd('insertOrderedList')"><i class="fa-solid fa-list-ol"></i></a><a onclick="execCmd('insertHorizontalRule')">HR</a><a onclick="execCmd('createLink',prompt('Enter a URL','http://'))"><i class="fa-solid fa-link"></i></a><a onclick="execCmd('unlink')"><i class="fa-solid fa-unlink"></i></a><a onclick="execCmd('formatBlock','div')"><i class="fa-solid fa-list-ol"></i></a></menu><iframe id="iframe" name="richTextField"></iframe>`

  function init(){
    document.querySelector('#texteditor').innerHTML = apihtml
    enableEditMode()
  }
  
  init()
  function enableEditMode(){
    richTextField.document.designMode = 'On'
    document.getElementById("iframe").contentDocument.body.style.fontFamily = "sans-serif";
  }

  function execCmd(command, arg){
    richTextField.document.execCommand(command, false, arg)
  }

  document.getElementById('iframe').contentWindow.document.body.addEventListener('click', e => {
    const rect = document.getElementById('iframe').contentWindow.document.body.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top ;
    
    document.getElementById('iframe').contentWindow.document.querySelectorAll('img').forEach(n => {
      console.log({x,y});
      console.log('x:'+n.x+" "+n.width);
      console.log('y:'+n.y+" "+n.height);
      if(x > n.x && x < n.x+n.width && y > n.y && y < n.y+n.height){
      
        size = prompt("Tamaño de la foto")
        if(size > 0){
          n.style.width = size
        }
      }
    });


  })


  document.getElementById('iframe').contentWindow.document.body.addEventListener('mousemove', e => {
    const rect = document.getElementById('iframe').contentWindow.document.body.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top ;
    document.getElementById('iframe').contentWindow.document.querySelectorAll('img').forEach(n => {
      if(x > n.x && x < n.x+n.width && y > n.y && y < n.y+n.height){
        n.style["boxShadow"] = '0 0 0 3px red'
        n.style["cursor"] = 'pointer'
        n.style["filter"] = 'brightness(0.5)'

      }else{
        n.style["boxShadow"] = '0 0 0 red'
        n.style["cursor"] = 'auto'
        n.style["filter"] = 'brightness(1)'
      }
    });

  })



  document.querySelector('form').addEventListener('submit', e => {
    document.getElementById('iframe').contentWindow.document.querySelectorAll('img').forEach(n => {
      n.style["boxShadow"] = '0 0 0 red'
      n.style["cursor"] = 'auto'
      n.style["filter"] = 'brightness(1)'
    });
    
    e.preventDefault();
    titulo = document.querySelector('.title');
    content = document.querySelector('.__editor');
    fetch('/save_post',
          {method: 'POST',
          body: JSON.stringify({
            foro: document.querySelector('#foroid').value,
            title:  document.querySelector('.title').value,
            content: document.querySelector('#iframe').contentWindow.document.body.innerHTML
          }),
          headers:{
            'Content-Type': 'application/json'
          }}
        ).then(res => res.json())
        .then(res => {
         if(res.ok){
          Swal.fire(
            'Post creado correctamente',
            '',
            'success',
          ).then(() => {
            window.location.href = `/foros/${dataid}/1/`
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