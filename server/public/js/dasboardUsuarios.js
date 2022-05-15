$(document).ready(function() {
  $('#example').DataTable();
} );

function editar(i,id, j){
let admins = j == 1 ? 'style="display:none;"' : "";
let user = document.querySelector('#user'+id).children[1].children[0].innerText;
let rank = document.querySelector('#user'+id).children[4].innerText;
let k = rank == 'Admin' ? "checked=true" : "";
const form = `
  <div class="hideeditar">
  <div class="hideoncl" onclick="document.querySelector('.hideeditar').remove()"></div>
  <div class="boxedit">
    <h2><b>Editar -</b> ${user}</h2>
    <div class="inpts">
      <form id="fomeditars">
        <div class="text-field" id="password">
          <input minlength="4" value="${user}" required autofocus> 
          <label class="label">Usuario</label>
        </div>
        <p style="color:red; display:none;">El nombre de usuario ya existe</p>
        <div class="admins" ${admins}>
          <label for="ddd">Administrador</label>
          <input id="ddd" ${k} type="checkbox">
        </div>
        <div class="foto">
          <label for="aaa">Borrar foto</label>
          <input id="aaa" type="checkbox">
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
      
      fetch('/editarUser',
        {method: 'POST',
        body: JSON.stringify({
          id: e.currentTarget[3].value,
          username: e.currentTarget[0].value,
          admin: e.currentTarget[1].checked,
          deletefoto: e.currentTarget[2].checked
        }),
        headers:{
          'Content-Type': 'application/json'
        }}
      ).then(res => res.json())
      .then(res => {
        console.log(res);
       if(res.ok){
        document.querySelector('#user'+res.id).children[1].children[0].innerText = res.username;
        document.querySelector('#user'+res.id).children[4].innerText = res.admin ? 'Admin' : 'Usuario';
        if(res.foto){
          document.querySelector('#user'+res.id).children[3].children[0].children[0].src = "/img/defaultuser.png"
        }
        Swal.fire(
          'Usuario editado correctamente',
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
  



  function Eliminar(i,id,usr){
Swal.fire({
title: `Quieres eliminar a\n${usr}?`,
text: 'Se eliminarán todos los likes, comentarios y post.\nLos cambios son irreversibles',
showDenyButton: true,
showCancelButton: true,
showConfirmButton: false,
denyButtonText: `Eliminar`,
}).then((result) => {
if (result.isDenied) {
  EliminarSi(id,i);
}
})
}

function EliminarSi(id,i){
fetch('/deleteUser',
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
          'Usuario eliminado correctamente',
          '',
          'success',
        ).then(() => {
          document.querySelector('#user'+id).remove()
          $(document).ready(function() {
              $('#example').DataTable();
          } );
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