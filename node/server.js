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

/**
 * Peticio get per demanar les dades de la base de dades
 */
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

    //query per seleccionar la tabla de la BBDD
    con.query("SELECT * FROM CURRENT_ACCOUNT", function (err, result, fields) {
      if (err) throw err;
      var json = JSON.stringify(result);
      res.send(json);
    });
    
    con.end();
})

/**
 * Peticio post per actualitzar les dades a la base de dades
 */
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
      if(err) {
          console.log('Error connecting:'+err.stack)
          return
      }
      //si la conexió ha anat bé
      console.log('Connected as id '+ con.threadId)
  })
  
  //Step 2. Si estem conectats, fem la query

  for (let i = 0; i < accounts.length; i++) {
    var sql = "UPDATE CURRENT_ACCOUNT SET DNI='" + accounts[i].dni + "', NAME = '" + accounts[i].name + "', ACCOUNT_TYPE = '" + accounts[i].accounType + "', AMOUNT='" +accounts[i].amount +"', CLIENT_TYPE='" +accounts[i].clientType +"', ENTRY_DATE='" +accounts[i].date+"' WHERE ID = '"+accounts[i].id+"';";

    con.query(sql, function(error, results, field){
      //si hi ha un error en la consulta
      if(error){
          res.status(400).send({resultats:null})
      } else{//si todo OK
          res.status(200).send(JSON.stringify("Bien"));
      }
    })//end connection query
  }
})

app.listen(3000, ()=>{
  console.log('Aquesta és la nostra API-REST que corre en http://localhost:3000')
})