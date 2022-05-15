$(document).ready(function() {
  $('#example').DataTable();
} );

let cat = [];
fetch('/getCategorias',{
method: 'POST'
}).then(r => r.json())
.then(r => cat = r.cat );

function crearForo(){
console.log(cat);

let c = '';

cat.forEach(n => {
  c+= `<option value="${n.id}">${n.categoria}</option>`
})

const form = `
<div class="hideeditar">
<div class="hideoncl" onclick="document.querySelector('.hideeditar').remove()"></div>
<div class="boxedit">
  <h2><b>Crear foro</b> </h2>
  <div class="inpts" style="padding: 0 15px;">
    <form id="crearForo" >
      <div class="text-field" >
        <input minlength="4" required autofocus> 
        <label class="label">Nombre</label>
      </div>
      <div class="text-field" >
        <input minlength="4" required autofocus> 
        <label class="label">Descripción</label>
      </div>
      <div class="text-field">
        <select required>
          ${c}
        </select>
      </div>
      <input type="file" required>
      <div class="text-field" >
        <input style="padding: 0;" type="color" required autofocus> 
      </div>
      <button class="btn grn" type="submit">Crear</button>
      </form>
    </div>
  </div>
  </div>`;
    document.querySelector('body').innerHTML += form;
    const cf = document.querySelector('#crearForo')

    cf.addEventListener('submit', e => {
      e.preventDefault();
      
      
      file = new FormData();
      file.append('img',cf.children[3].files[0])
      file.append('data', JSON.stringify(
        {
          name : cf.children[0].children[0].value,
          description:cf.children[1].children[0].value, 
          categoria: cf.children[2].children[0].value,
          fondo: cf.children[4].children[0].value
        }
      ))

      fetch('/createforo',{
        method: 'POST',
        body: file
      }).then(r => r.json())
        .then(r => {
          if(r.ok){
            window.location.reload()
          }else{
            window.location.reload()
          }
        })   

    })
  }
  



  function eliminar(id){
Swal.fire({
title: `Quieres eliminar este foro?`,
text: 'Se eliminarán todos los likes, comentarios y post.\nLos cambios son irreversibles',
showDenyButton: true,
showCancelButton: true,
showConfirmButton: false,
denyButtonText: `Eliminar`,
}).then((result) => {
if (result.isDenied) {
  EliminarSi(id);
}
})
}

function EliminarSi(id){
fetch('/deleteForo',
        {method: 'POST',
        body: JSON.stringify({
          id
        }),
        headers:{
          'Content-Type': 'application/json'
        }}
      ).then(res => res.json())
      .then(res => {
       if(res.ok){
        Swal.fire(
          'Foro eliminado correctamente',
          '',
          'success',
        ).then(() => {
          window.location.href = '/dashboard/foro'
        })
       }else{
        Swal.fire(
          'Ha ocurrido un error',
          '',
          'error',
          )
       }
    });
}

function editar(id){
console.log(cat);

let c = '';
fr = document.querySelector('#foro'+id);
console.log(fr.children[2].innerText)
cat.forEach(n => {
  if(n.categoria == fr.children[2].innerText ) c+= `<option selected value="${n.id}">${n.categoria}</option>`
  else c+= `<option value="${n.id}">${n.categoria}</option>`
  
})

const form = `
<div class="hideeditar">
<div class="hideoncl" onclick="document.querySelector('.hideeditar').remove()"></div>
<div class="boxedit">
  <h2><b>Editar foro</b> </h2>
  <div class="inpts" style="padding: 0 15px;">
    <form id="crearForo" >
      <div class="text-field" >
        <input minlength="4" value="${fr.children[1].innerText}" required autofocus> 
        <label  class="label">Nombre</label>
      </div>
      <div class="text-field" >
        <input minlength="4"  value="${fr.children[3].innerText}" required autofocus> 
        <label class="label">Descripción</label>
      </div>
      <div class="text-field">
        <select required>
          ${c}
        </select>
      </div>
      <input type="file">
      <div class="text-field" >
        <input style="padding: 0;" value="${fr.children[4].innerText}" type="color" required autofocus> 
        <input hidden value="${id}">
      </div>
      <button class="btn grn" type="submit">Editar</button>
      </form>
    </div>
  </div>
  </div>`;
    document.querySelector('body').innerHTML += form;
    const cf = document.querySelector('#crearForo')

    cf.addEventListener('submit', e => {
      e.preventDefault();
      
      
      
      file = new FormData();;
      if(cf.children[3].files[0] != undefined){
        file.append('img',cf.children[3].files[0])
      }
      file.append('data', JSON.stringify(
        {
          id: cf.children[4].children[1].value,
          name : cf.children[0].children[0].value,
          description:cf.children[1].children[0].value, 
          categoria: cf.children[2].children[0].value,
          fondo: cf.children[4].children[0].value
        }
      ))
      

      fetch('/editarForo',{
        method: 'POST',
        body: file
      }).then(r => r.json())
        .then(r => {
          if(r.ok){
            window.location.reload()
          }else{
            window.location.reload()
          }
        })   

    })
  }
  