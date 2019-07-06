$(document).ready(function(){

// ----------------------------- VARIABLES DE RAPHAEL ----------------------------
var paper = Raphael('canvas',350,250)
var gridSimulatorSet = paper.set()
moment.locale('es')
// --------------------------------------------------------------------------------

// ----------------------------- DATOS DE LA GRID ---------------------------------
gridSimulatorCons = {

    color_hover : "#CC3E14",
    color_normal : "white",
    color_selected : "#336600",
    min_selected : 3,// siempre menor al size
    grid_jump : 6,
    grid_size : 18,
    cell_width : 43,
    cell_height : 43,
    cell_margin : 5,
    type_date : 3, // 1 dias, 2 semanas, 3 meses
    moment_format : 'D [de] MMMM [del] YYYY'
}

gridSimulatorVar = {
    current_date : moment(),
    future_date : moment(),
    final_counter : 0,
    current_counter : 0,
    xx:1,
    yy:1,
    selected_instance : null,
    selected_min : null
}
gridSimulatorVar.final_counter = gridSimulatorCons.min_selected

// ------------------------------------ LLENADO DE LA GRID ----------------------------
for(var i =1;i<=gridSimulatorCons.grid_size;i++){ 
    
    gridSimulatorSet.push(
        paper.rect( gridSimulatorCons.cell_width * gridSimulatorVar.xx + gridSimulatorCons.cell_margin,
            gridSimulatorCons.cell_height * gridSimulatorVar.yy + gridSimulatorCons.cell_margin,
            gridSimulatorCons.cell_width,
            gridSimulatorCons.cell_height )
    )

    if(i==gridSimulatorCons.min_selected){
        
        zz = 1
        gridSimulatorSet.forEach(function(element){
            if(zz==gridSimulatorCons.min_selected){
                gridSimulatorVar.selected_min = element
                
                return;
            }
            zz++
        })
    }

    gridSimulatorVar.xx++

    if(i % gridSimulatorCons.grid_jump == 0){
        gridSimulatorVar.xx = 1
        gridSimulatorVar.yy++ 
    }
}
// --------------------------------------------------------------------------------

// ----------------------------- Funciones para pintar -------------------------
function paintGridOnHover(input){
    if(input==null){
        return
    }
    input.attr("fill",gridSimulatorCons.color_hover)
    gridSimulatorVar.current_counter++
    paintGridOnHover(input.prev)
}

function paintGridClicked(input){
    if(input==null){
        return
    }
    input.attr("fill",gridSimulatorCons.color_selected)
    paintGridClicked(input.prev)
}

function paintGridCounter(input){
    $('.currentCounter').text(input)
}
// --------------------------------------------------------------------------------


// ------------------- Callbacks de la grid ---------------------
function gridOnHandler(){
    
    gridSimulatorVar.current_counter = 0
    paintGridOnHover(this)
    paintGridCounter(gridSimulatorVar.current_counter)

}

function gridOffHandler(){

    if(gridSimulatorVar.selected_instance){

        gridSimulatorSet.attr("fill",gridSimulatorCons.color_normal)
        paintGridClicked(gridSimulatorVar.selected_instance)
        paintGridCounter(gridSimulatorVar.final_counter)

        }else{
            
            gridSimulatorSet.attr("fill",gridSimulatorCons.color_normal)
            paintGridClicked(gridSimulatorVar.selected_min)
            paintGridCounter(gridSimulatorCons.min_selected)
    }
}

function gridClickHandler(){
    gridSimulatorSet.attr("fill",gridSimulatorCons.color_normal)
    if(gridSimulatorVar.current_counter < gridSimulatorCons.min_selected){
        // Es menor al minimo de seleccionar ->  mensaje de error
        
        //alert('Porfavor seleccione un dato mayor o igual a ' + gridSimulatorCons.min_selected)
        swal(
            'Oops...',
            'Por favor seleccione un dato mayor o igual a ' + gridSimulatorCons.min_selected,
            'error'
          )
          
        return
    } 
    gridSimulatorVar.selected_instance = this
    gridSimulatorVar.final_counter = gridSimulatorVar.current_counter
    //gridSimulatorSet.attr("fill",gridSimulatorCons.color_normal)
    paintGridClicked(gridSimulatorVar.selected_instance)
    
    paintGridCounter(gridSimulatorCons.final_counter)

    // logica de fecha
    calculateGridDate(gridSimulatorCons.type_date,true)
    paintGridDate()
    totalizeMoney()
}
// --------------------------------------------------------------------------------





// -------------------- LOGICA DE LA FECHA  CON MOMENT -----------------------------

function paintGridDate(){
    $('.futureDate').text(gridSimulatorVar.future_date.format(gridSimulatorCons.moment_format))
}

    function calculateGridDate(current,self){
        this_counter = 1
        if(self){
            this_counter = gridSimulatorVar.final_counter
        }else{
            this_counter = gridSimulatorCons.min_selected
        }

        switch(current){
            case 1: // Credito express
                //FUTURE_DATE.setDate(CURRENT_DATE.getDate() + COUNTER)
                gridSimulatorVar.future_date = moment(gridSimulatorVar.current_date)
                    .add(this_counter,'days')
                break;
            case 2:// Mediano plazo
                gridSimulatorVar.future_date = moment(gridSimulatorVar.current_date)
                    .add(this_counter * 7,'days')
                //FUTURE_DATE.setMonth(CURRENT_DATE.getMonth() + COUNTER)
                break;
            case 3: // Largo plazo
                gridSimulatorVar.future_date = moment(gridSimulatorVar.current_date)
                    .add(this_counter,'months')
                //FUTURE_DATE.setMonth(CURRENT_DATE.getMonth() + COUNTER)
                break;
        }
        
    }
// -------------------------- INCIALIZACION DE COMPÓNENTES ----------------------------
gridSimulatorSet.attr({
    cursor: 'pointer',
    fill: gridSimulatorCons.color_normal
}).hover(gridOnHandler,gridOffHandler).mouseup(gridClickHandler)

$('.currentDate').text(gridSimulatorVar.current_date.format(gridSimulatorCons.moment_format))
calculateGridDate(gridSimulatorCons.type_date,false)
paintGridDate()
paintGridClicked(gridSimulatorVar.selected_min)
paintGridCounter(gridSimulatorVar.final_counter)

//gridSimulatorSet.clear()

})
