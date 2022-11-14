$().ready(function(){
    
    //get
    $.ajax({
        url: 'http://localhost:3000/getClients',
        type: 'GET',
        dataType: 'json',

        success : function(data) {
            console.log(data);

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
        var dni=value.DNI;
        $("#dni").append("<input type='text' placeholder='" + value.DNI + "'>")
        $("#name").append("<input type='text' placeholder='" + value.NAME + "'>")
        $("#type_account").append("<select ><option>"+ value.ACCOUNT_TYPE + "</option> <option>Savings account</option><option>Investement account</option><option>Personal account</option><option>Individual Savings Account</option><option>Solidary account</option><option>Fixed deposit account</option><option>Tax-Free Savings Account</option></select>")
        $("#amount").append("<input type='text' placeholder='" + value.AMOUNT + "'> <br>")
        $("#type_client").append("<input type='text' placeholder='" + value.CLIENT_TYPE + "' readonly> <br>")
        $("#entry_date").append("<input type='text' placeholder='" + value.ENTRY_DATE + "'> <br>")
      });

}

//crear las tablas (inputs) manualmente i meter cada una en un div, asi recibe el inline block