const eventCtrl = {};

// Models
const Event = require("../models/event");



//=================================================================
//
//  mostrar calendario
//=================================================================

eventCtrl.renderCalendar = (req, res) => {
  let user = req.user;
  let modal=false;
  if(user.role==='ADMIN_ROLE') modal=true;
 
  res.render("calendar/calendar",{
    calendarCss:true,
    calendarJs:true,
    //Colocar el if para el  modal
    modal:modal,
    
  });
};




//=================================================================
//
//  crear evento
//=================================================================

eventCtrl.createNewEvent = async (req,res) =>{
  const { title, description,start,end,backgroundColor,user,phone } = req.body;


  const newEvent = new Event({ title, description,start,end,backgroundColor,user,phone });
  //newEvent.user = req.user.id; //logeado y session iniciada
  //newEvent.user=1;
  newEvent.user = req.user.id;
 
 
  
   try {
     await newEvent.save();
  } catch (error) {
    
    res.json({'error' : error});
  }
  req.flash("success_msg", "Evento Add Successfully");
  res.json(newEvent);
 
};

//====================================================================================
//  
//  FullCalendar visitará la URL cada vez que necesite nuevos datos de eventos. Esto sucede 
//  cuando el usuario hace clic en anterior / siguiente o cambia de vista. FullCalendar 
//  determinará el intervalo de fechas para el que necesita eventos y pasará esa información 
//  en los parámetros GET.
//
//  Los nombres de los parámetros GET estarán determinados por las opciones startParam y endParam . ( "start"y "end"por defecto).
//  Los valores de estos parámetros serán cadenas de fecha ISO8601 (como 2013-12-01T00:00:00-05:00).
//  Resumen en el query que se envia al servidor ya bienen start y end
//=======================================================================================
eventCtrl.allEvents = async (req,res) => { 

//console.log(req.query);  agregar esta condicion { user: req.user.id }
 console.log(req.phone);
  desde=req.query.start;
  hasta=req.query.end;
  //await Event.find( {"start": {$gte: desde, $lte : hasta}} )
  await Event.find( {$and : [ {"start": {$gte: desde, $lte : hasta}} , { "user": req.user.id } ] } )

    .exec((err,events) => {       
      if(err){
          return res.status(400).json({ err});
      }
      console.log(events);
      
      res.json(events);
       
    });
    
}



//=================================================================
//  DELETE event
//
//=================================================================
eventCtrl.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id)
   .exec((err,event) => {       
      if(err){
          return res.status(400).json({ err});
      }
      console.log(event);
      req.flash("success_msg", "Evento Deleted Successfully");
      res.json(event);
       
    });
};



//=================================================================
//  update event
//
//=================================================================
eventCtrl.updateEvent = async(req,res) =>{
  console.log('datos PUT :' + req.params.id);
  console.log(req.body);

  const { title, description,start,end,backgroundColor,user,phone } = req.body;
  const newEvent = new Event({ title, description,start,end,backgroundColor,user,phone });
  
  

  await Event.findByIdAndUpdate(req.params.id  , req.body , (err,event) => {
    if(err){
      //console.log('error');
      return res.status(400).json({ err });
    }
    console.log(event);
    req.flash("success_msg", "Evento Updated Successfully");
    res.json(event);

  });

  
}

module.exports = eventCtrl;
