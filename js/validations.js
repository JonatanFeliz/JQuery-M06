/**
 * Validacions per introduir dades a la BD
 */

function validation_name(name,position_name){
    var pattern=/^[A-ZÑa-zñáéíóúàèòÁÉÍÓÚÀÈÒ'çÇ ]+$/;
    if(pattern.test(name) && name.length <= 30){
        $(position_name).css("border","1px solid green");
        return true;
    }{
        $(position_name).css("border","1px solid red");
        return false;
    }
}

function validation_amount(mount,position_amount){
    if(isNaN(mount) == false && mount > 0) {
        $(position_amount).css("border","1px solid green");
        return true;
    }
    else {
        $(position_amount).css("border","1px solid red");
        return false;
    }
}

function validation_DNI(dni,position_dni){
    if(dni.length==9){
        
        let numero=dni.substring(0,8);
        let letra=dni.substr(dni.length-1,1);
       
        if(isNaN(numero) || !isNaN(letra)){
            $(position_dni).css("border","1px solid red");
            return false;

        }else{
            let calculo=numero % 23;
           
            let letras="TRWAGMYFPDXBNJZSQVHLCKE";
            
            if(letra.toUpperCase()==letras[calculo]){
                $(position_dni).css("border","1px solid green");
                return true;

            }else{
                $(position_dni).css("border","1px solid red");
                return false;
            }
        }
        
    }else{
        $(position_dni).css("border","1px solid red");
        return false;
    }
}

// function validation_date(date){
//     var actualDate = new Date();
//     valuesStart=date.split("-");
    
//     var dateGo = new Date(valuesStart[0],(valuesStart[1]-1),valuesStart[2]);
//     var diference = dateGo.getTime()-actualDate.getTime();

//     diference = diference/(1000*60*60*24*30);
//     console.log(valuesStart);

//     if(diference>0){
//         console.log("esta mal");
//         return false;

//     }else{
//         return true;

//     }
// }