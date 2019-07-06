function sendEmail(ev){
    ev.preventDefault()

    $('#mySubmit').prop('disabled', true)
 
    $.ajax({
      url:"server/mailerContact.php",
      type:"POST",
      data:{
          email:$('#email').val().trim().toLowerCase(),
          message:$('#message').val(),
          name:$('#name').val(),
        }
    })
    .done(function(respo){
        swal(
            'Éxito!',
            'El mensaje ha sido enviado exitosamente, en breve le responderemos !!!',
            'success'
          )
        $('#mySubmit').prop('disabled', false)
        $('#sendModal').modal('toggle')
    })
    .fail(function(respo){
        sweetAlert('Oops...', 'Parece que hubo un error al enviar tu mensaje, por favor intentalo nuevamente mas tarde o contacta a soporte@coobicentenario.com.', 'error');
        $('#mySubmit').prop('disabled', false)
        $('#sendModal').modal('toggle')
    })
   
}