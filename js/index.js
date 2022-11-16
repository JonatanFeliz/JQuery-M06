var accounts = [];


$().ready(function(){

    // peticio get
    $.ajax({
        url: 'http://localhost:3000/getClients',
        type: 'GET',
        dataType: 'json',

        success : function(data) {

            load_account(data);

        },
        error : function(jqXHR, status, error) {
            alert('Disculpe, existió un problema');
        },
        complete : function(jqXHR, status) {
            alert('Petición realizada');
        }
    })

    //cambiar automaticament el camp client type
    $(".monto").blur(()=>{

        class_length = $(".monto").length;
        
        for (let i = 1; i < class_length+1; i++) {
            var value_amount  = $("#amount" + i).val();
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
    })

    // Accions del boto
    $("#modify").click(()=>{
        accounts = [];

        class_length = $(".monto").length;

        for (let i = 1; i < class_length+1; i++) {
            var position_dni     = "#dni" + i;
            var position_name    = "#name" + i;
            var position_account = "#account-type" + i; 
            var position_amount  = "#amount" + i;
            var position_client  = "#client-type" + i;
            var position_date    = "#date" + i;

            var dni        = $(position_dni).val();
            var name       = $(position_name).val();
            var accounType = $(position_account + " option:selected").val();
            var amount     = $(position_amount).val();
            var clientType = $(position_client).val();
            var entryDate  = $(position_date).val();

            accounts.push(ObjAccount = new accountObj(i,dni,name,amount,entryDate,accounType,clientType,"Aquest es el meu compte"))
        }
        console.log(accounts);

        // var json_accounts = JSON.parse(accounts);
        
        // console.log(json_accounts);
        // localStorage.setItem("storageAccounts",JSON.stringify(json_accounts));


        // console.log(JSON.parse(localStorage.getItem("storageAccounts")));



        //peticio post
        /*$.ajax({
            url: 'http://localhost:3000/send',
            data: '',
            type: 'POST',
            dataType: 'json',

            success : function(msg) {
                console.log("Operacio " + msg);
            },
            error : function(jqXHR, status, error) {
                alert('Disculpe, existió un problema al enviar');
            },
            complete : function(jqXHR, status) {
                alert('Petición realizada en post');
            }
        })*/
    })


})

/**
 * 
 * @param data 
 * @return Object amb la informació de la base de dades 
 */
function load_account(data) {

    $.each(data, function( i, value ) {
        i++;
        var type_of_accounts = ["Savings account","Investement account","Personal account","Solidary account","Individual Savings Account","Fixed deposit account","Tax-Free Savings Account"];
        //variables amb nom dels camps
        var position_dni     = "#dni" + i;
        var position_name    = "#name" + i;
        var position_account = "#account-type" + i; 
        var position_amount  = "#amount" + i;
        var position_client  = "#client-type" + i;
        var position_date    = "#date" + i;

        //Introduïr els valor de la BD als camps
        $(position_dni).val(value.DNI);
        $(position_name).val(value.NAME);

        for (let i = 0; i < type_of_accounts.length; i++) {
            if (value.ACCOUNT_TYPE == type_of_accounts[i]) {
                $(position_account).append("<option selected>"+ value.ACCOUNT_TYPE + "</option>");
            }
            else{
                $(position_account).append("<option>"+ type_of_accounts[i]+"</option>");        
            }
        }
        
        $(position_amount).val(value.AMOUNT);
        $(position_client).val(value.CLIENT_TYPE);

        //datepicker
        $(function() {

            // Inicialitzar i carregar el llenguatge a catala
            $('#datepicker').datepicker( $.datepicker.regional[ "ca" ] );
        
          });
        $(function(){
            $(position_date).datepicker({
                dateFormat: "mm-dd-yy",
                maxDate: "-1"
            });
        })
        $(position_date).val(transform_date(value.ENTRY_DATE));

        //afegir objecte a la variable global accounts
        accounts.push(ObjAccount = new accountObj(i,value.DNI,value.DNI,value.AMOUNT,value.ENTRY_DATE,value.ACCOUNT_TYPE,value.CLIENT_TYPE,"Aquest es el meu compte"))
        
    });

}

/**
 * 
 * @param date 
 * @returns Torna la data en format mm/dd/yyyy
 */
function transform_date(date){
    var ObjectDate = new Date(date);

    var day   = ObjectDate.getDate();

    var month = ObjectDate.getMonth();

    var year  = ObjectDate.getFullYear();

    return (month+1) + "-" + day + "-" + year;
}

/**
 * 
 * @param amount 
 * @returns Tipus de client en funció del diners que té 
 */
function changeTypeClient(amount){
    if(amount <=10000 && amount > 0) {
        return "Poor client";
    }
    else if(amount <=100000 && amount > 10000) {
        return "Normal client";
    }
    else if(amount > 100000){
        return "Very rich client";
    }
}

// Preguntas:

// 1- Preguntar si al actualizar los objetos borramos la array y la volvemos a hacer o hacemos un push y lo añadimos
// 2- Cada vez que guardemos en el local storage tenemos que borrar su contenido para no duplicar datos
// 3- Como poner mi array de objetos dentro de un local storage, ya he intentado el json.stringyfi
// 4- Como pasar nuestra array de objetos a JSON