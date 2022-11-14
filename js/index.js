$().ready(function(){
    
    $.ajax({
        url: 'http://localhost:3000/',
        type: 'GET',
        dataType: 'json',

        success : function(data) {
            console.log(data);
        },
        error : function(jqXHR, status, error) {
            alert('Disculpe, existió un problema');
        },
        complete : function(jqXHR, status) {
            alert('Petición realizada');
        }
    })

})

function load_account(json) {


}