

const express = require('express');
const Event = require("../models/event");
const { verificaToken } = require('../middlewares/autenticacion');
let app = express();




//=================================
// cargar eventos al  calendario
//============================================
app.get('/calendar/events',verificaToken, async(req, res) => {
    console.log('/calendar/events'); // agregar esta condicion { user: req.user.id }
    //"_id" : ObjectId("5f120a38a2710d0c14216528")
    //5f13469ff005c20f248075bd   usuario diez
     //{"start": {$gte: 2020-06-28T00:00:00Z, $lte : 2020-08-09T00:00:00Z}}
  console.log(req.usuario);
    desde=req.query.start;
    hasta=req.query.end;

 
 //await Event.find()

 //await Event.find( {"start": {$gte: desde, $lte : hasta}} )
 await Event.find( {$and : [ {"start": {$gte: desde, $lte : hasta}} , { "usuario": req.usuario._id } ] } )

   .exec((err,events) => {       
        if(err){
            return res.status(400).json({  
                ok: false,
                err});
        }

    console.log(events);
     res.json({
        ok: true,
        events
    })
      
   });

});



//=================================================================
//
//  crear evento
//=================================================================

app.post('/calendar/add',verificaToken,async (req,res) =>{

  console.log('/calendar/add');

  const usuario = req.usuario._id; 

  const { title, description,start,end,backgroundColor,phone } = req.body;
 
  const newEvent = new Event({ title, description,start,end,backgroundColor,usuario,phone });
    //newEvent.user = req.user.id; //logeado y session iniciada
    //newEvent.user=1;
    //newEvent.user = req.user.id;
   
   
    
     try {
       await newEvent.save();
    } catch (error) {
      
      res.json({'error' : error});
    }
    
    res.json({
        ok:true,
        event:newEvent});
   
});
  

//=================================================================
//  DELETE event
//
//=================================================================
app.delete('/calendar/delete/:id', verificaToken , async (req, res) => {

  console.log('/calendar/delete');
  
    await Event.findByIdAndDelete(req.params.id)
     .exec((err,event) => {       
        if(err){
            return res.status(400).json({ ok:false,err});
        }
        res.json({
            ok:true,
            event});
         
      });
  });





//=================================================================
//  update event
/*backgroundColor: "fff"
description: "el peor corrupto"
end: "2020-07-23T19:00:00.000Z"
phone: "35115767676"
start: "2020-07-23T10:00:00.000Z"
title: "president"
usuario: "5f120a38a2710d0c14216528"
__v: 0
_id: "5f143e8807a85f11d805b9cd"

http://localhost:4000/calendar/update/5f143e8807a85f11d805b9cd
//=================================================================*/
app.put('/calendar/update/:id',verificaToken,async(req,res) =>{

  //console.log('/calendar/update/:id');
  //console.log('viene de la url /:id '+req.params );
  //console.log('viene de verificaToken ' + req.user);
  console.log(req.body);
   
    const { title, description,start,end,backgroundColor,user,phone } = req.body;
    const newEvent = new Event({ title, description,start,end,backgroundColor,user,phone });

    await Event.findByIdAndUpdate(req.params.id  , req.body , (err,event) => {
      if(err){
        return res.status(400).json({ ok: false, err });
      }
      console.log(event);
      
      res.json({ok:true, event:newEvent});
  
    });
  
    
  });




//=================================
// cargar eventos al  calendario
//============================================
app.get('/turnos', async(req, res) => {
  console.log('/turnos'); // agregar esta condicion { user: req.user.id }
  

  desde=req.query.start;
  hasta=req.query.end;
console.log(req.query.phone);

//await Event.find()

//await Event.find( {"start": {$gte: desde, $lte : hasta}} )
await Event.find( {$and : [ {"start": {$gte: desde, $lte : hasta}} , { "phone": req.query.phone } ] } )

 .exec((err,events) => {       
      if(err){
          return res.status(400).json({  
              ok: false,
              err});
      }

  console.log(events);
   res.json({
      ok: true,
      events
  })
    
 });

});





module.exports = app;