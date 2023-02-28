const routerPersona= require("express").Router();



//Obtener todas las personas 

routerPersona.get("/",(req,resp,next)=>{
   req.getConnection((err,conn)=>{
    if(err) return resp.status(404).end();
    conn.query('SELECT * FROM persona', (err,rows)=>{
      if(err) return resp.status(404).end();
      resp.json(rows);
    })
  })
   
       
});

//Obtener solo una persona por su ID
routerPersona.get("/:id",(req,resp,next)=>{
  const id = req.params.id;
  req.getConnection((err,conn)=>{
   if(err) return resp.status(404).end();
conn.query('SELECT * FROM persona WHERE id_persona=?', [id],(err,rows)=>{
     if(err) return resp.status(404).end();
     resp.json(rows);
   })
 })
  
      
});


//Guardar persona en base de datos
routerPersona.post("/",(req,resp,next)=>{
  
  req.getConnection((err,conn)=>{
   if(err) return resp.status(404).end();
   conn.query('INSERT INTO persona set ?', [req.body],(err,rows)=>{
     if(err) return resp.status(404).end();
     resp.send('Se inserto correctamente la persona');
   })
 })
  
      
});


//Actualizar persona
routerPersona.put("/:id",(req,resp,next)=>{
  const id = req.params.id;
  req.getConnection((err,conn)=>{
   if(err) return resp.status(404).end();
   conn.query('UPDATE persona set ? WHERE id_persona= ?', [req.body,id],(err,rows)=>{
     if(err) return resp.status(404).end();
     resp.send('Se actualizo correctamente la persona');
   })
 })
      
});

//Eliminar persona
routerPersona.delete("/:id",(req,resp,next)=>{
  const id = req.params.id;
  req.getConnection((err,conn)=>{
   if(err) return resp.status(404).end();
   conn.query('DELETE FROM persona WHERE id_persona= ?', [id],(err,rows)=>{
     if(err) return resp.status(404).end();
     resp.send('Se elimino correctamente la persona');
   })
 })
       
});


routerPersona.use((req,resp)=>{
  resp.status(404).end();
});

routerPersona.use((error,req,resp)=>{
  console.log(resp);
  if(error.name === "CastError"){
    resp.status(404).end();
    
  }else{
    resp.status(500).end();
  }
});

module.exports=routerPersona;