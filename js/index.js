var accounts = [];
var flag_amount;
var flag_name;
var flag_DNI;
var flag_date;

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
        var provisional_accounts = [];

        class_length = $(".monto").length;

        var counter = 0;

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
            //console.log(entryDate);

            flag_DNI    = validation_DNI(dni,position_dni);
            flag_name   = validation_name(name,position_name);
            flag_amount = validation_amount(amount,position_amount);
            flag_date   = validation_date(entryDate,position_date);

            if(flag_DNI == false || flag_name == false 
                || flag_amount == false || flag_date == false){
                counter++;
            }
            else{
                provisional_accounts.push(new accountObj(i,dni,name,amount,entryDate,accounType,clientType,"Aquest es el meu compte"))
            }

        }

        if (counter > 0) {
            $("#send-error").text("Camps incorrectes");
        }
        else{
            $("#send-error").text("");
            accounts = provisional_accounts;
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
        accounts.push(new accountObj(i,value.DNI,value.DNI,value.AMOUNT,value.ENTRY_DATE,value.ACCOUNT_TYPE,value.CLIENT_TYPE,"Aquest es el meu compte"))
        
    });
    // console.log(accounts);
}

/**
 * 
 * @param date 
 * @returns Torna la data en format mm/dd/yyyy
 */
function transform_date(date){
    var ObjectDate = new Date(date);

    var day   = ObjectDate.getDate();

    var month = ObjectDate.getMonth()+1;

    var year  = ObjectDate.getFullYear();

    if(day < 10){
        day = "0" + day;
    }
    if(month < 10){
        month = "0" + month;
    }

    return month + "-" + day + "-" + year;
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