
    var moneyCons = {
        perc: {
            interest :(2.3/100),
            insurance : (3.33/100)
        },
        cons:{
            admin:10000
        }
    }
    var moneyVar = {
        total_interest : 0,
        total_insurance : 0,
        total_capital : 0,
        value_period: 0,
        iva:0
    }

    function totalizeMoney(){
        
        aux_interest = gridSimulatorVar.final_counter * moneyCons.perc.interest
        //aux_interest = aux_interest.toFixed(2)
    
       
        
        moneyVar.total_insurance = moneyCons.perc.insurance * selectorVar.current_ammount
        //moneyVar.total_insurance = moneyVar.total_insurance.toFixed(2)

       
        
        //moneyVar.iva= (moneyVar.total_interest  + moneyVar.total_insurance + moneyCons.cons.admin) * 0.19
        //moneyVar.total_capital = moneyVar.total_interest + moneyVar.total_insurance + selectorVar.current_ammount + moneyCons.cons.admin + moneyVar.iva
        moneyVar.value_period = moneyVar.total_capital / gridSimulatorVar.final_counter

        // Ccalculo de la amortizacion
        moneyVar.monthly = moneyCons.perc.interest * Math.pow(1 + moneyCons.perc.interest, gridSimulatorVar.final_counter )

        moneyVar.monthly = moneyVar.monthly  / ( Math.pow(1 + moneyCons.perc.interest, gridSimulatorVar.final_counter ) - 1 )
        
        moneyVar.monthly = selectorVar.current_ammount * moneyVar.monthly

        // Calculo del valor del I.V.A.
        moneyVar.iva = ( moneyVar.total_insurance + moneyCons.cons.admin ) * 0.19
        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            // calculo incluyendo otros valores
            moneyVar.monthly = moneyVar.monthly + ( ( moneyVar.total_insurance + moneyCons.cons.admin + moneyVar.iva   ) / gridSimulatorVar.final_counter )
        // Xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        // Calculo del valor del interes
        moneyVar.total_interest = ( ( moneyVar.monthly * gridSimulatorVar.final_counter ) - selectorVar.current_ammount )
        // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        
        
        
        aux_interest = aux_interest.toFixed(2) 
        moneyVar.total_insurance = moneyVar.total_insurance.toFixed(2)
        moneyVar.total_interest = moneyVar.total_interest.toFixed(2)
        //moneyVar.total_capital = moneyVar.total_capital.toFixed(2)
        

        paintMoneyTotals()
    }

    function paintMoneyTotals(){
        
        $('#capital').text('$ ' + numeral(selectorVar.current_ammount).format('0,0'))
        $('#total_capital').text('$ ' + numeral(moneyVar.total_capital).format('0,0'))
        $('#insurance').text('$ ' + numeral(moneyVar.total_insurance).format('0,0'))
        $('#interest').text('2.3 %')
        $('#admin').text('$ ' + numeral(moneyCons.cons.admin).format('0,0'))
        $('#iva').text('$ ' + numeral(moneyVar.iva).format('0,0'))
        $('#period').text('$ ' + numeral(moneyVar.value_period).format('0,0'))
        $('#monthly').text('$ ' + numeral(moneyVar.monthly).format('0,0'))
    }

    
