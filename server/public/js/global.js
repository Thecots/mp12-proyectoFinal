function cerrarSession(){
  document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.reload()
}



function sesionAlert(){
  Swal.fire({
    title: 'Un momento!',
    text: "Para poder realizar está acción debes iniciar sesión!",
    icon: 'warning',
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonColor: 'royalblue',
    denyButtonColor: '#51b32d',
    confirmButtonText: 'Iniciar sesión',
    denyButtonText: "Crear cuenta",
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href= "/login"
    } else if (result.isDenied) {
      window.location.href= "/register"

    }
  })
}