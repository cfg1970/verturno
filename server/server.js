require('./config/config');

const express = require('express');
var hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();


//hbs
app.set('views', path.join(__dirname, 'views'));

/*
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'()
}));
*/
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials',(e)=>{console.log('error',+e)});





// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());




// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, 'public')));
// Configuración global de rutas

//www
app.use(require('./routes/www'));
//api
app.use(require('./routes/index'));






mongoose.connect(process.env.URLDB, {
     useNewUrlParser: true,
    
}).then(db => console.log("DB is connected"))
.catch(err => console.error('error no se porque ',err));



app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});