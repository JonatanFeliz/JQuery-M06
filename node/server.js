'use strict'
const express    = require('express')
const path       = require('path')
const bodyParser = require('body-parser')
const cors       = require('cors')
const app        = express()

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}))
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
    console.log("Este " + err);
    
    if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
    }
    console.log('Connected as id ' + con.threadId);
    });

    con.query("SELECT * FROM CURRENT_ACCOUNT", function (err, result, fields) {
      if (err) throw err;
      var json = JSON.stringify(result);
      //console.log(json);
      res.send(json);
    });
    
    con.end();
})

app.post('/update',(req,res)=>{
  
  var con = mysql.createConnection({
    host: "localhost",
    database: "clients",
    user: "root",
    password: ""
  });
  
  console.log("estem a dins del post")
    
  con.connect(function(err){
      console.log(err)
      if(err){
          console.log('Error connecting:'+err.stack)
          return
      }
      //si la conexion ha ido bien
      console.log('Connected as id '+ con.threadId)
  })//cerramos connection.connect
  //Step 2. Si estamos conectados, hacemos la query
  /*for (let i = 0; i < res.length; i++) {
    con.query('UPDATE CURRENT_ACCOUNT VALUES', function(error, results, field){
      //si hay un error en la consulta
      if(error){
          res.status(400).send({resultats:null})
      } else{//si todo OK
          res.status(200).send({resultats: results})
      }
  })//end connection query
  }*/
  con.query('UPDATE CURRENT_ACCOUNT VALUES (res) WHERE (res.id) = 1;', function(error, results, field){
      //si hay un error en la consulta
      if(error){
          res.status(400).send({resultats:null})
      } else{//si todo OK
          res.status(200).send({resultats: results})
      }
  })//end connection query
  con.end();
})

app.listen(3000, ()=>{
  console.log('Aquesta és la nostra API-REST que corre en http://localhost:3000')
})