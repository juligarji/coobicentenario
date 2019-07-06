 $(document).ready(function(){
    var lastValue = parseInt($('#money').val())
    var valuesList = {
        min : 500000,
        medium : 2000000,
        large : 5000000,
        extra : 10000000
    }
    var interestList = {
        "90" : {
            min : 5.0,
            medium : 5.30,
            large : 5.45,
            extra :6.5
        },
        "180" : {
            min : 6.50,
            medium :6.65,
            large : 6.92,
            extra : 7.23
        },
        "360" : {
            min : 7.0,
            medium : 7.3,
            large : 7.50,
            extra : 7.82
        },
        
    }
    var period = $('#period').val()
    var money = $('#money').val()

 function calculateValues(){
     period = $('#period').val()
     money = parseInt($('#money').val())
     
    if(money < valuesList.min)
    {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'El valor debe ser mayor o igual a $' + valuesList.min.toString().replace(/./g, function(c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? '.' + c : c;
            })
            
          })
          $('#money').val(valuesList.min)
          return
    }

    if(money > 100000000)
    {
        extremeValue = 100000000
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'El valor debe ser menor o igual a $' + extremeValue.toString().replace(/./g, function(c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? '.' + c : c;
            })
            
          })
          $('#money').val(extremeValue)
          return
    }
    lastValue = money
     var current_interest
     if(money >= valuesList.min && money <= valuesList.medium )
     {
        current_interest = interestList[period].min
     }
     if(money > valuesList.medium && money <= valuesList.large )
     {
        current_interest = interestList[period].medium
     }
     if(money > valuesList.large && money <= valuesList.extra )
     {
        current_interest = interestList[period].large
     }
     if(money > valuesList.extra )
     {
      
        current_interest = interestList[period].extra
     }
     current_interest = parseFloat(current_interest)
    
     var rendimiento = money * (current_interest / 100)
     var rete_fuente = rendimiento * 0.07
     var rend_pagar = rendimiento - rete_fuente
     var rend_cap = money + rend_pagar 

        rendimiento = rendimiento.toFixed(2)
        .replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? '.' + c : c;
        });
        rete_fuente = rete_fuente.toFixed(2)
        .replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? '.' + c : c;
        });
        rend_pagar = rend_pagar.toFixed(2)
        .replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? '.' + c : c;
        });
        rend_cap = rend_cap.toFixed(2)
        .replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? '.' + c : c;
        });
     
    $('#resultValue').text( current_interest + ' %')
     $('#rendimiento').text('$ ' + rendimiento)
     $('#rete_fuente').text('$ ' + rete_fuente)
     $('#rend_pagar').text('$ ' + rend_pagar)
     $('#rend_cap').text('$ ' + rend_cap)
 }

 $('#period').change(function(){
    calculateValues()
     //console.log('change')
     //console.log(period)
 })

 $('#money').change(function(){
    calculateValues()
})
$('#money').change(function(){
    calculateValues()
})


calculateValues()

 })
