const routerHabitacion= require("express").Router();



//Obtener todas las habitaciones 

routerHabitacion.get("/",(req,resp,next)=>{
   req.getConnection((err,conn)=>{
    if(err) return resp.status(404).end();
    conn.query('SELECT * FROM habitacion', (err,rows)=>{
      if(err) return resp.status(404).end();
      resp.json(rows);
    })
  })
   
       
});

//Obtener solo una habitacion por su ID
routerHabitacion.get("/:id",(req,resp,next)=>{
  const id = req.params.id;
  req.getConnection((err,conn)=>{
   if(err) return resp.status(404).end();
conn.query('SELECT * FROM habitacion WHERE idhab=?', [id],(err,rows)=>{
     if(err) return resp.status(404).end();
     resp.json(rows);
   })
 })
  
      
});


//Guardar habitacion en base de datos
routerHabitacion.post("/",(req,resp,next)=>{
  
  req.getConnection((err,conn)=>{
    const datos= req.body;
   if(err) return resp.status(404).end();
   if(datos.habitacion_piso<=0 || datos.habitacion_piso>10)
   return resp.send("El piso de la habitacion tiene que ser un valor del 1 al 10");
   if(datos.habitacion_num<=0 || datos.habitacion_num>20)
   return resp.send("El numero de la habitacion tiene que ser un valor del 1 al 20");
   if(datos.cant_camas<=0 || datos.cant_camas>4)
   return resp.send("La cantidad de cama tiene que ser un valor del 1 al 4");
   conn.query('INSERT INTO habitacion set ?', [datos],(err,rows)=>{
     if(err) return resp.status(404).end();
     resp.send('Se inserto correctamente la habitacion');
   })
 })
  
      
});


//Actualizar habitacion
routerHabitacion.put("/:id",(req,resp,next)=>{
  const id = req.params.id;
  const datos=req.body;
  req.getConnection((err,conn)=>{
   if(err) return resp.status(404).end();
   if(datos.habitacion_piso<=0 || datos.habitacion_piso>10)
   return resp.send("El piso de la habitacion tiene que ser un valor del 1 al 10");
   if(datos.habitacion_num<=0 || datos.habitacion_num>20)
   return resp.send("El numero de la habitacion tiene que ser un valor del 1 al 20");
   if(datos.cant_camas<=0 || datos.cant_camas>4)
   return resp.send("La cantidad de cama tiene que ser un valor del 1 al 4");
   conn.query('UPDATE habitacion set ? WHERE idhab= ?', [datos,id],(err,rows)=>{
     if(err) return resp.status(404).end();
     resp.send('Se actualizo correctamente la habitacion');
   })
 })
      
});

//Eliminar habitacion
routerHabitacion.delete("/:id",(req,resp,next)=>{
  const id = req.params.id;
  req.getConnection((err,conn)=>{
   if(err) return resp.status(404).end();
   conn.query('DELETE FROM habitacion WHERE idhab= ?', [id],(err,rows)=>{
     if(err) return resp.status(404).end();
     resp.send('Se elimino correctamente la habitacion');
   })
 })
       
});


routerHabitacion.use((req,resp)=>{
  resp.status(404).end();
});

routerHabitacion.use((error,req,resp)=>{
  console.log(resp);
  if(error.name === "CastError"){
    resp.status(404).end();
    
  }else{
    resp.status(500).end();
  }
});

module.exports=routerHabitacion;