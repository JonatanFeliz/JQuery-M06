/**
 * Validacions per introduir dades a la BD
 */

function validation_name(name){
    var pattern=/^[A-ZÑa-zñáéíóúàèòÁÉÍÓÚÀÈÒ'çÇ ]+$/;
    if(pattern.test(name) && name.length <= 30){
        return true;
    }{
        return false;
    }
}

function validation_mount(mount){
    if(isNaN(mount) == false && mount > 0) {
        return true;
    }
    else
    {return false;}
}

function validation_DNI(dni){
    if(dni.length==9){
        
        let numero=dni.substring(0,8);
        let letra=dni.substr(dni.length-1,1);
       
        if(isNaN(numero) || !isNaN(letra)){
            return false;

        }else{
            let calculo=numero % 23;
           
            let letras="TRWAGMYFPDXBNJZSQVHLCKE";
            
            if(letra.toUpperCase()==letras[calculo]){
                return true;

            }else{
                return false;
            }
        }
        
    }else{
        return false;
    }
}

function validation_date(date){
    
}