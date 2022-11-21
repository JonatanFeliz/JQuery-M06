function get_petition() {
    $.ajax({
        url: '/getClients',
        type: 'GET',
        dataType: 'json',

        success : function(data) {

            load_account(data);

        },
        error : function(jqXHR, status, error) {
            alert('Disculpe, existió un problema');
        }
    })
}


function post_petition(accounts_json) {

    var accounts_json2 = JSON.stringify(accounts_json);
    console.log("Accounts 2: " + accounts_json2);
    $.ajax({
        url: '/update',
        data: {cuentas: accounts_json2},
        type: 'POST',
        dataType: 'json',

        success : function(msg) {
            console.log("Operacio " + msg);

            $("#load-response").hide();
            $("#good-response").fadeIn(1000);
        },
        error : function(jqXHR, status, error) {

            $("#load-response").hide();
            $("#bad-response").fadeIn(1000);
        }
    })
}