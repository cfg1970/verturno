// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Vencimiento del Token 1año
// ============================
//ms('2 days')  // 172800000
//ms('1d')      // 86400000
//ms('10h')     // 36000000
//ms('2.5 hrs') // 9000000
//ms('2h')      // 7200000
//ms('1m')      // 60000
//ms('5s')      // 5000
//ms('1y')      // 31557600000
//ms('100')     // 100
//ms('-3 days') // -259200000
//ms('-1h')     // -3600000
//ms('-200')    // -200//
process.env.CADUCIDAD_TOKEN =  '7200000' ;
                              

// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// ============================
//  Google Client ID
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '219758474264-vh1bibcphgvbc32km508lubtqkanikf1.apps.googleusercontent.com';