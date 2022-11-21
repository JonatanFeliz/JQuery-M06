'use strict'
const express    = require('express')
const path       = require('path')
const bodyParser = require('body-parser')
const cors       = require('cors')
const app        = express()

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, 'public')))

const mysql = require('mysql');


app.get('/getClients',(req,res)=>{

  var con = mysql.createConnection({
    host: "localhost",
    database: "clients",
    user: "root",
    password: ""
  });

  con.connect(function(err) {
    
    if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
    }
    console.log('Connected as id ' + con.threadId);
    });
    //query para seleccionar la tabla de la BBDD
    con.query("SELECT * FROM CURRENT_ACCOUNT", function (err, result, fields) {
      if (err) throw err;
      var json = JSON.stringify(result);
      res.send(json);
    });
    
    con.end();
})

app.post('/update',(req,res)=>{
  var accounts = [];
  accounts= JSON.parse(req.body.cuentas);
  var con = mysql.createConnection({
    host: "localhost",
    database: "clients",
    user: "root",
    password: ""
  });
  
    
  con.connect(function(err){
      if(err){
          console.log('Error connecting:'+err.stack)
          return
      }
      //si la conexion ha ido bien
      console.log('Connected as id '+ con.threadId)
  })//cerramos connection.connect
  
  //Step 2. Si estamos conectados, hacemos la query

  for (let i = 0; i < accounts.length; i++) {
    var sql = "UPDATE CURRENT_ACCOUNT SET DNI='" + accounts[i].dni + "', NAME = '" + accounts[i].name + "', ACCOUNT_TYPE = '" + accounts[i].accounType + "', AMOUNT='" +accounts[i].amount +"', CLIENT_TYPE='" +accounts[i].clientType +"', ENTRY_DATE='" +accounts[i].date +"';";
    console.log(sql);

    con.query(sql, function(error, results, field){
      //si hay un error en la consulta
      if(error){
          res.status(400).send({resultats:null})
      } else{//si todo OK
          res.status(200).send({resultats: results})
      }
    })//end connection query
  }   
  
  // req.body.forEach(element => {
  //   console.log(element);
  // });
    /* con.query("UPDATE CURRENT_ACCOUNT SET DNI='req.body[i].dni', NAME = 'res.name', ACCOUNT_TYPE , AMOUNT=res.amount, ", function(error, results, field){
      //si hay un error en la consulta
      if(error){
          res.status(400).send({resultats:null})
      } else{//si todo OK
          res.status(200).send({resultats: results})
      }
  })//end connection query
  } */
  /* con.query('UPDATE CURRENT_ACCOUNT VALUES (res) WHERE (res.id) = 1;', function(error, results, field){
      //si hay un error en la consulta
      if(error){
          res.status(400).send({resultats:null})
      } else{//si todo OK
          res.status(200).send({resultats: results})
      }
  })//end connection query */
  con.end();
})

app.listen(3000, ()=>{
  console.log('Aquesta és la nostra API-REST que corre en http://localhost:3000')
})