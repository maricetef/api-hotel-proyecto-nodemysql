

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const server=express();
const path=require("path");
const mySql = require("mysql");
const myConection = require("express-myconnection");



//Setting

server.set("port", process.env.PORT || 5000);

//Middlewares este en especifico funciones que se ejecutan antes de las rutas
server.use(morgan('dev'));
server.use(myConection(mySql,{
  host:'localhost',
  user:'root',
  password: 'W0rdPr3ss',
  port: '3306',
  database:'hotel'
},'single'));
server.use(cors());
server.use(express.json());//permite q todo se formate a json



//Routes
server.use("/api/personas", require("./controllers/persona.js"));
server.use("/api/habitaciones", require("./controllers/habitacion.js"));
server.use("/api/reservas", require("./controllers/reserva.js"));

//View
server.use(express.static(path.join(__dirname,"public")));//Obtener la ruta de la carpeta public
//Cuando no encunetre ninguna ruta
server.use((req,resp)=>{
  resp.status(404).end();
});

//Star server
server.listen(server.get("port"),()=>{
  console.log(`Servidor corriendo en ${server.get("port")}` );
});