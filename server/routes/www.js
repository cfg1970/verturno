
const express = require('express');
let app = express();
const router = express.Router();
const Event = require("../models/event");
const { verificaToken } = require('../middlewares/autenticacion');

router.get('/',(req,res)=>{
    res.render('index');
});

router.get('/about',(req,res)=>{
    res.render('about');
});


router.get('/users/logout',(req,res)=>{
    
    res.render('index',{
        usuario:false,
        logeado:false,
    });
    req.logeado=false;
});


//=================================
// ruta formulario registro nuevo usuario
//============================================
router.get('/signup',(req, res) => {
    res.render('users/signup',{
        flash:true,
        logeado:req.logeado,
    });
  });


//=================================
// ruta formulario login
//============================================
router.get('/signin',(req, res) => {
    res.render('signin',{
        flash:true,
    });
  });


//=================================
// ruta calendario  aqui colocar verificaToken para poner usuario que habilita el navbar
//============================================
router.get('/calendar',(req, res) => {

    res.render('calendar',{
        calendarCss:true,
        calendarJs:true,
        modal : true,
        logeado:req.logeado,
    });
  });


//====================================================
//  luego de login ingresa aca
//===========================================
router.get('/dashboard',(req,res)=>{
    req.logeado=true;
    res.render('dashboard',{
        logeado:true,
    });
})



module.exports = router;