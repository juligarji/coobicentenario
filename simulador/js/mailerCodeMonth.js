function sendEmail(ev){
    ev.preventDefault()

    $('#mySubmit').prop('disabled', true)

    $.ajax({
      url:"server/mailerMonth.php",
      type:"POST",
      data:{
          email:$('#myEmail').val().trim().toLowerCase(),
          monthly:$('#monthly').text(),
          interest:$('#interest').text(),
          insurance:$('#insurance').text(),
          admin:$('#admin').text(),
          iva:$('#iva').text(),
          capital:$('#capital').text()
        }
    })
    .done(function(respo){
        swal(
            'Éxito!',
            'La cotización ha sido enviada exitosamente !!!',
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