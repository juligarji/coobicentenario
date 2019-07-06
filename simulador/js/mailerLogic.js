function sendEmail(ev){
    ev.preventDefault()
    
    $.ajax({
      url:'server/mailer.php',
      data:{email:'hola'}
    })
    .done(function(respo){
        alert(respo)
    })
}