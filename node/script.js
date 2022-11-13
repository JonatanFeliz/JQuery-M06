'use strict'
//////AIXÒ JA HO TENÍEM
const express = require('express')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    database: "clients",
    user: "root",
    password: ""
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM CURRENT_ACCOUNT", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
});
  