$(document).ready(function() {
  $('#example').DataTable();
} );


function eliminar(id){
Swal.fire({
title: `Quieres eliminar este comentario?`,
text: 'Los cambios son irreversibles',
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
fetch('/deleteComment',
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
          'Comentario eliminado correctamente',
          '',
          'success',
        ).then(() => {
          document.querySelector('#post'+id).remove()
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