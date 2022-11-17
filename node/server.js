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

app.post('/send',(req,res)=>{
  
})

app.listen(3000, ()=>{
  console.log('Aquesta és la nostra API-REST que corre en http://localhost:3000')
})