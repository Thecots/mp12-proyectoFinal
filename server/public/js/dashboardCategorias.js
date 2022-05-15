$(document).ready(function() {
  $('#example').DataTable();
} );

function editar(id){
let categoria = document.querySelector('#categoria'+id).children[1].innerText;

const form = `
  <div class="hideeditar">
  <div class="hideoncl" onclick="document.querySelector('.hideeditar').remove()"></div>
  <div class="boxedit">
    <h2><b>Editar -</b> ${categoria}</h2>
    <div class="inpts">
      <form id="fomeditars">
        <div class="text-field" id="password">
          <input minlength="4" value="${categoria}" required autofocus> 
          <label class="label">Categoria</label>
        </div>
        <input hidden value="${id}">
        <button class="btn grn" type="submit">Editar</button>
        </form>
    </div>
    </div>
    </div>`;
    document.querySelector('body').innerHTML += form;

    document.querySelector('#fomeditars').addEventListener('submit', e => {
      e.preventDefault()
      fetch('/editarCategoria',
        {method: 'POST',
        body: JSON.stringify({
          id: e.currentTarget[1].value,
          categoria: e.currentTarget[0].value,
        }),
        headers:{
          'Content-Type': 'application/json'
        }}
      ).then(res => res.json())
      .then(res => {
        console.log(res);
       if(res.ok){
        document.querySelector('#categoria'+id).children[1].innerText = res.categoria;
        Swal.fire(
          'Categoria editado correctamente',
          '',
          'success',
        ).then(() => {
          document.querySelector('.hideeditar').remove()
        })
       }else{
        Swal.fire(
          'Ha ocurrido un error en el servidor',
          '',
          'error',
        ).then(() => {
          document.querySelector('.hideeditar').remove()
        })
       }
    });
    })
  }
  



  function eliminar(id){
Swal.fire({
title: `Quieres eliminar esta categoria?`,
text: 'Se eliminaran todos los foros de esta.\nLos cambios son irreversibles',
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
fetch('/deleteCategoria',
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
          'Categoria eliminado correctamente',
          '',
          'success',
        ).then(() => {
          document.querySelector('#categoria'+id).remove()
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

function crearCategoria(){
let categoria = document.querySelector('#categoria1').children[1].innerText;

const form = `
  <div class="hideeditar">
  <div class="hideoncl" onclick="document.querySelector('.hideeditar').remove()"></div>
  <div class="boxedit">
    <h2><b>Crear categoria</b></h2>
    <div class="inpts">
      <form id="newcategory">
        <div class="text-field" id="password">
          <input minlength="4" required autofocus> 
          <label class="label">Categoria</label>
        </div>
        <button class="btn grn" type="submit">Crear</button>
        </form>
    </div>
    </div>
    </div>`;
    document.querySelector('body').innerHTML += form;

    document.querySelector('#newcategory').addEventListener('submit', e => {
      e.preventDefault()
      fetch('/newCategory',
        {method: 'POST',
        body: JSON.stringify({
          categoria: e.currentTarget[0].value,
        }),
        headers:{
          'Content-Type': 'application/json'
        }}
      ).then(res => res.json())
      .then(res => {
        console.log(res);
       if(res.ok){
        Swal.fire(
          'Categoria editado correctamente',
          '',
          'success',
        ).then(() => {
          window.location.href = '/dashboard/categorias';
        })
       }else{
        Swal.fire(
          'Ha ocurrido un error en el servidor',
          '',
          'error',
        ).then(() => {
          document.querySelector('.hideeditar').remove()
        })
       }
    });
    })
}