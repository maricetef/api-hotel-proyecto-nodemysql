const routerReserva= require("express").Router();



//Obtener todas las reservas 

routerReserva.get("/",(req,resp,next)=>{
   req.getConnection((err,conn)=>{
    if(err) return resp.status(404).end();
    conn.query('SELECT * FROM reserva', (err,rows)=>{
      if(err) return resp.status(404).end();
      resp.json(rows);
    })
  })
   
       
});

//Obtener solo una reserva por su ID
routerReserva.get("/:id",(req,resp,next)=>{
  const id = req.params.id;
  req.getConnection((err,conn)=>{
   if(err) return resp.status(404).end();
conn.query('SELECT * FROM reserva WHERE idreserva=?', [id],(err,rows)=>{
     if(err) return resp.send(err);
     resp.json(rows);
   })
 })
  
      
});


//Guardar reserva en base de datos
routerReserva.post("/",(req,resp,next)=>{

  const PRECIO=120000;
  const datos =req.body;
  const fechaFin=new Date(datos.fechasalida);
  const fechaInicio=new Date(datos.fechaentrada);
  const cantDias=(fechaFin-fechaInicio)/(1000*60*60*24);
  const montoreserva=cantDias*PRECIO;
  datos.montoreserva=montoreserva;
  req.getConnection((err,conn)=>{
   if(err) return resp.status(404).end();
   conn.query('INSERT INTO reserva set ?', [datos],(err,rows)=>{
     if(err) return resp.send(err);
     resp.send('Se inserto correctamente la reserva');
   })
 })
  
      
});


//Actualizar reserva
routerReserva.put("/:id",(req,resp,next)=>{
  const id = req.params.id;
  const PRECIO=120000;
  const datos =req.body;
  const fechaFin=new Date(datos.fechasalida);
  const fechaInicio=new Date(datos.fechaentrada);
  const cantDias=(fechaFin-fechaInicio)/(1000*60*60*24);
  const montoreserva=cantDias*PRECIO;
  datos.montoreserva=montoreserva;
  req.getConnection((err,conn)=>{
   if(err) return resp.status(404).end();
   conn.query('UPDATE reserva set ? WHERE idreserva= ?', [datos,id],(err,rows)=>{
     if(err) return resp.send(err);
     resp.send('Se actualizo correctamente la reserva');
   })
 })
  
      
});

//Eliminar reserva
routerReserva.delete("/:id",(req,resp,next)=>{
  const id = req.params.id;
  req.getConnection((err,conn)=>{
   if(err) return resp.status(404).end();
   conn.query('DELETE FROM reserva WHERE idreserva= ?', [id],(err,rows)=>{
     if(err) return resp.status(404).end();
     resp.send('Se elimino correctamente la reserva');
   })
 })
       
});


routerReserva.use((req,resp)=>{
  resp.status(404).end();
});

routerReserva.use((error,req,resp)=>{
  console.log(resp);
  if(error.name === "CastError"){
    resp.status(404).end();
    
  }else{
    resp.status(500).end();
  }
});

module.exports=routerReserva;