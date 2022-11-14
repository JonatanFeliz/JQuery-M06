$().ready(function(){

    //get
    $.ajax({
        url: 'http://localhost:3000/getClients',
        type: 'GET',
        dataType: 'json',

        success : function(data) {
            //console.log(data);

            load_account(data);
        },
        error : function(jqXHR, status, error) {
            alert('Disculpe, existió un problema');
        },
        complete : function(jqXHR, status) {
            alert('Petición realizada');
        }
    })

    //post
    // $.ajax({
    //     url: 'http://localhost:3000/',
    //     type: 'POST',
    //     dataType: 'json',

    //     success : function(data) {
    //         console.log(data);
    //     },
    //     error : function(jqXHR, status, error) {
    //         alert('Disculpe, existió un problema');
    //     },
    //     complete : function(jqXHR, status) {
    //         alert('Petición realizada');
    //     }
    // })

})

function load_account(data) {
    //console.log(data);

    $.each(data, function( i, value ) {
        i++;
        
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
        $(position_account).append("<option>"+ value.ACCOUNT_TYPE + "</option> <option>Savings account</option><option>Investement account</option><option>Personal account</option><option>Individual Savings Account</option><option>Solidary account</option><option>Fixed deposit account</option><option>Tax-Free Savings Account</option>")
        $(position_account + " option:selected").attr('disabled','disabled').siblings().removeAttr('disabled');
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

        
        
    });

}

function transform_date(date){
    var ObjectDate = new Date(date);

    var day = ObjectDate.getDate();

    var month = ObjectDate.getMonth();

    var year = ObjectDate.getFullYear();

    //console.log((month+1) + "/" + day + "/" + year);

    return (month+1) + "/" + day + "/" + year;
}