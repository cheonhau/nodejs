var mysql = require ( 'mysql' );
var connection = mysql.createConnection ({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'node_only'
});

connection.connect ( function ( err ) {
    if ( err ) throw err;
    console.log ( 'you are now connected' );
});

//to insert record into mysql
// connection.query('INSERT INTO `employee` (`employee_name`, `employee_salary`, `employee_age`) VALUES ("Adam", 2000 , 30)', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The response is: ', results);
// });


//featch records from mysql database
// connection.query('select * from employee', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The response is: ', results);
// });

//delete record from mysql database
// connection.query('delete from employee where id=0', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The response is: ', results);
//   });

