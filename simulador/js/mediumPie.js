
    
    var paper = Raphael('draw',400,250)

// -------------------- variables de los 2 componentes ----------------
    var pieCons = {
        x : 100,
        y : 130,
        radius : 80,
        in_radius: 70,
        radian : Math.PI / 180,
        out_color : "#CC3E14",
        in_color : "#336600",
        color_radius : 20
    }
    var pieVar = {
        min_angle : 0,
        max_angle : 360, // se calculas
        current_angle : 0
    }

    var selectorCons = {
        max_ammount : 2500000,// en pesos
        min_ammount : 500000,
        range : 150,// siempre menor a origin_y
        jump_index:0,// calcular cuantos pixeles equivale al sato en dinero
        origin_x : 250,
        origin_y : 180,
        radius : 20,
        scope_min : 0,
        scope_max : 0,
        out_color : "#CC3E14",
        in_color : "#336600",
        color_radius : 20,
        jump_money:50000 // valor del salto de la imagen como tal 
    }
    selectorCons.scope_max = selectorCons.max_ammount - 60000
    selectorCons.scope_min = selectorCons.min_ammount + 60000

    // Calcular el salto de los datos
        // 150 ---- max_ammount
        // jump_index xx  ----- jump_money
    selectorCons.jump_index = ( ( selectorCons.range * selectorCons.jump_money ) / selectorCons.max_ammount )
     
    function calculateJump(inputIndex){

         return ( (selectorCons.max_ammount * Math.abs(inputIndex - selectorCons.range)) / selectorCons.range )
     }

    var selectorVar = {
        current_ammount : selectorCons.min_ammount,
        min_index_y : 0,
        last_value : 0
    }

    PIE_FLAG = true
$(document).ready(function(){
// --------------------------------------------------------------------
console.log(selectorCons)
    
// -------------------- setters de datos sobre el selector ----------------
    var setCurrentValue = function(distance){
        
        distance_between = selectorCons.origin_y - distance
        
        selectorVar.current_ammount = ((selectorCons.max_ammount * distance_between)/(selectorCons.range))
        
        if(selectorVar.current_ammount >= selectorCons.scope_max){
            selectorVar.current_ammount = selectorCons.max_ammount
        }
        if(selectorVar.current_ammount <= selectorCons.scope_min){
            
            selectorVar.current_ammount = selectorCons.min_ammount
        }
        //selectorVar.current_ammount =  ((distance_between * selectorCons.max_ammount)/( selectorCons.origin_y - selectorCons.range ) )
    }

    var setMinIndexY = function(value){
        var out_value = selectorCons.origin_y - ((selectorCons.range * value)/(selectorCons.max_ammount))
        return out_value
    }

    var setMinAngle = function(){
        pieVar.min_angle = ((360 * selectorCons.min_ammount)/(selectorCons.max_ammount))
    }

    var setCurrentDegree = function(money){
        pieVar.current_angle = ((360 * money)/(selectorCons.max_ammount)) 
       if(pieVar.current_angle==360){
        pieVar.current_angle = 359
       }
       
       if(pieVar.current_angle==0){
        pieVar.current_angle = 1
       }
    }

    function sector(cx, cy, r, startAngle, endAngle, params) {
        
            var x1 = cx + r * Math.cos(-startAngle * pieCons.radian),
            x2 = cx + r * Math.cos(-endAngle * pieCons.radian),
            y1 = cy + r * Math.sin(-startAngle * pieCons.radian),
            y2 = cy + r * Math.sin(-endAngle * pieCons.radian);
            //console.log(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"])
            return ["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]
       // return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }

    // --------------------------------------- auxiliares graficos de la app --------------------------------
    


    // -------------------------------------------------------------------------------------------------------------

    // ----------------------------------------------------- Handlers ------------------ --------------------------------
    var start = function(){
        this.cy = this.attr("cy")
        this.cx = this.attr('cx')
    }



    var move = function(dx,dy){
        var X = this.cx
        var Y = this.cy + dy * selectorCons.jump_index;
    
    if(Y > (selectorCons.origin_y - selectorCons.range) && Y <= selectorVar.min_index_y ){

        PIE_FLAG = true
        $('#calculateButton').prop('disabled',true)
        //fifty.attr({path:sector(100,100,50,0,currentDegree(Y))})
        setCurrentValue(Y)
        setCurrentDegree(selectorVar.current_ammount)
        paintFinalSelectorValue(selectorVar.current_ammount)
        //fifty = sector(100,100,50,0,currentDegree(Y))
        //piePath = sector(pieCons.x,pieCons.y,pieCons.radius,pieVar.min_angle,pieVar.current_angle)
        piePath.attr({path: sector(pieCons.x,pieCons.y,pieCons.radius,0,pieVar.current_angle)})
        inLinePie.attr({path: sector(pieCons.x,pieCons.y,pieCons.in_radius,0,pieVar.current_angle)})
        //piePath = sector(pieCons.x,pieCons.y,pieCons.radius,0,160)
        paintPieValue()
        totalizeMoney()
        this.attr({cx:X,cy:Y})
       }
    }

    up = function () {
        //this.dx = this.dy = 50;

        //this.attr({cy:90})
     };
    function paintPieValue(){
         $('#pieSelectorValue').val(Math.round(selectorVar.current_ammount))
     }

     function paintFinalSelectorValue(value){
         $('#selectorTag').val(value)
     }

     function focusInput(){
         if(PIE_FLAG){
            selectorVar.last_value = $('#pieSelectorValue').val()
            $('#calculateButton').prop('disabled',false)
            PIE_FLAG = false
         }
        
     }
     function changeInput(){
        //$('#pieSelectorValue').val(selectorVar.current_ammount)
        in_value = $('#pieSelectorValue').val()
        if(in_value < selectorCons.min_ammount){
            // es menor que otro
            swal(
                'Oops...',
                'El valor ingresado debe ser mayor que $' + selectorCons.min_ammount
              )

            $('#pieSelectorValue').val(selectorVar.last_value)
            PIE_FLAG = true
            $('#calculateButton').prop('disabled',true)
            return
        }
        if(in_value > selectorCons.max_ammount){

            // es menor que otro
            swal(
                'Oops...',
                'El valor ingresado debe ser menor que $' + selectorCons.max_ammount
              )

            $('#pieSelectorValue').val(selectorVar.last_value)
            PIE_FLAG = true
            $('#calculateButton').prop('disabled',true)
            return
        }
        selectorVar.current_ammount = parseFloat(in_value)

        setCurrentDegree(selectorVar.current_ammount)
        
        piePath.attr({path: sector(pieCons.x,pieCons.y,pieCons.radius,0,pieVar.current_angle)})
        inLinePie.attr({path: sector(pieCons.x,pieCons.y,pieCons.in_radius,0,pieVar.current_angle)})
        this_index = setMinIndexY(selectorVar.current_ammount)
        selectorRange.attr({cy:this_index})
            //piePath = sector(pieCons.x,pieCons.y,pieCons.radius,0,160)
        paintPieValue()
        totalizeMoney()
    }
     // -------------------------------------------------------------------------------------------------------------

     // ---------------------------------- INICIALIZACION DE VARIABLES ------------------------------
     selectorVar.min_index_y =  setMinIndexY(selectorCons.min_ammount)
     setMinAngle()

     selectorRange = paper.circle(selectorCons.origin_x,selectorVar.min_index_y,selectorCons.radius).attr({
        fill: selectorCons.out_color,
        cursor:"pointer"
    })
    selectorRange.toFront()
    // ---------------------------- Decoracion --------------------------------------------------------
    //sorround = paper.path(["M",selectorCons.origin_x - selectorCons.radius,selectorCons.origin_y,"L",selectorCons.origin_x - selectorCons.radius,selectorCons.origin_y - selectorCons.range,"S",selectorCons.origin_x,selectorCons.origin_y - selectorCons.range,selectorCons.origin_x + 2*(selectorCons.radius),selectorCons.origin_y - selectorCons.range])
    //sorround = paper.path(["M",selectorCons.origin_x - selectorCons.radius,selectorCons.origin_y,"L",selectorCons.origin_x - selectorCons.radius,selectorCons.origin_y - selectorCons.range ])
        inLine = paper.path(["M",selectorCons.origin_x,selectorCons.origin_y + selectorCons.radius,"L",selectorCons.origin_x,selectorCons.origin_y - selectorCons.range])
        inLine.toBack()
        /*
        selectorFilling = paper.circle(selectorCons.origin_x,selectorVar.min_index_y,selectorCons.radius - 10).attr({
            fill: selectorCons.in_color,
            cursor:"pointer"})*/
        

    // ----------------------------------------------------------------------------------------------
    piePath = paper.path()
    inLinePie = paper.path()
    
    piePath.attr({path: sector(pieCons.x,pieCons.y,pieCons.radius,0,pieVar.min_angle),fill: pieCons.out_color})
    inLinePie.attr({path: sector(pieCons.x,pieCons.y,pieCons.in_radius,0,pieVar.min_angle),fill: pieCons.in_color})
    paintPieValue()
    
    

     selectorRange.drag(move,start,up)
     selectorRange.hover(function(){
        this.attr({fill:selectorCons.in_color})
     },function(){
        this.attr({fill:selectorCons.out_color})
     })
     
//selectorFilling.drag(move,start,up)
     //$('#pieSelectorValue').on('input propertychange',changeInput)
     $('#pieSelectorValue').change(changeInput)
     //$('#calculateButton').on('click',changeInput)
     $('#pieSelectorValue').on('click',focusInput)
     totalizeMoney()
     // -------------------------------------------------------------------------------------------------------------
/*
     piePath.glow({
        color: '#444',
        offsety: 5 
    })*/
})