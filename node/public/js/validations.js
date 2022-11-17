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

function validation_date(date,position_date){
    var pattern = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
    if (pattern.test(date)) {
        $(position_date).css("border","1px solid green");
        return true;
    }
    else{
        $(position_date).css("border","1px solid red");
        return false;
    }
}

function validate_blur_amount() {
    class_length = $(".monto").length;

        
    for (let i = 1; i < class_length+1; i++) {
        var position_amount  = "#amount" + i;
        var value_amount  = $(position_amount).val();
        var position_client  = "#client-type" + i;

        if(validation_amount(value_amount)){
            var type = changeTypeClient(value_amount);

            $(position_client).val(type);
            $(position_client).css("border","1px solid green");
        }
        else{
            $(position_client).css("border","1px solid red");
            $(position_client).val("Incorrecte");
        }
    }
}