
$(document).ready(function() {
    $('#example').DataTable();
} );

function editar(i,e){
  console.log({i,e});
}

function eliminar(id){
  Swal.fire({
  title: `Quieres eliminar este post?`,
  text: 'Se eliminarán todos los likes y comentarios.\nLos cambios son irreversibles',
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
  fetch('/deletePost',
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
            'Post eliminado correctamente',
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