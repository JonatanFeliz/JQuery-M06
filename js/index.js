$().ready(function(){
    
    $.ajax({
        url: '../node/script.js',
        type: 'GET',
        dataType: 'json',

        success : function() {
            $("#prueba").text("hola");
        },
        error : function(jqXHR, status, error) {
            alert('Disculpe, existió un problema');
        },
        complete : function(jqXHR, status) {
            alert('Petición realizada');
        }
    })

})