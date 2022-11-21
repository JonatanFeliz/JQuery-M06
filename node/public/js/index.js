var accounts = [];
var accounts_json = [];
var provisional_accounts = [];
var provisional_accounts_json = [];
var flag_amount;
var flag_name;
var flag_DNI;
var flag_date;

$().ready(function(){

    // peticio get
    get_petition();

    //cambiar automaticament el camp client type
    $(".monto").blur(validate_blur_amount);

    // $("#prueba").click(() => {
    //     $("#load-response").fadeIn(1000);
    //     $("#div_black").show();
    // })

    // $("#prueba2").click(() => {
    //     $("#good-response").fadeIn(1000);
    //     $("#div_black").show();
    // })

    // $("#prueba3").click(() => {
    //     $("#bad-response").fadeIn(1000);
    //     $("#div_black").show();
    // })

    $(".accept").click(() => {
        $("#good-response").fadeOut(1000);
        $("#bad-response").fadeOut(1000);
        $("#div_black").hide();

    })

    // Accions del boto
    $("#modify").click(()=>{
        provisional_accounts = [];
        provisional_accounts_json = [];

        var class_length = $(".monto").length;

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
                let Object_account = {
                    id: i,
                    dni: dni,
                    name: name,
                    amount: amount,
                    date: entryDate,
                    accounType: accounType,
                    clientType: clientType,
                    description: "Aquest es el meu compte"
                }
                provisional_accounts_json.push(Object_account);
            }

        }

        if (counter > 0) {
            $("#send-error").text("Introdueix correctament les dades");
        }
        else{
            accounts = [];
            accounts_json = [];
            $("#send-error").text("");
            accounts = provisional_accounts;
            accounts_json = provisional_accounts_json;
            save_localStorage(accounts_json,"storageAccounts");

            show_response_window();
            //post_petition(accounts_json);
            
        }

        // console.log(accounts);
         console.log(accounts_json);

    })

})

// Main Functions (index.js) ------------------------------------------------

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

function save_localStorage(accounts_to_save,name_storage) {
    localStorage.setItem(name_storage,JSON.stringify(accounts_to_save));
}

function show_response_window() {
    // https://www.jose-aguilar.com/blog/efecto-cargando-con-jquery-ajax/

    $("#load-response").fadeIn(1000);
    $("#div_black").show();
}

// Secondary functions (index.js) ------------------------------------------------

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


// Falta:

/* 
   - (Opcional): El validar amount onblur no recoge los campos del dinero de primeras.
   - Arreglar amount, posiciones intercambiados 2 y 3
   - Validar que dos dni no se repitan al tocar el boton
   - Enviar los datos tipo json a node
   - Actualizar la base de datos
*/

