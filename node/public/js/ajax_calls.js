function get_petition() {
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
}


function post_petition(accounts_json) {

    accounts_json = JSON.stringify(accounts_json);

    $.ajax({
        url: 'http://localhost:3000/update',
        data: accounts_json,
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
    })
}