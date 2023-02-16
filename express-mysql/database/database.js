let mysql = require('mysql');
 
let connection = mysql.createConnection({
   host:        'localhost',
   user:        'root',
   password:    '',
   database:    'x'
 });

connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Congratulaions! Connection Successful!');
   }
 })

module.exports = connection; 