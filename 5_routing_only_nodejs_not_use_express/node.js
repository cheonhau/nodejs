// config host curent 
var server = app.listen ( 3000, "127.0.0.1", function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log ( "Example app listenning at http://%s:%s", host, port );
});
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
// rest api get all
app.get('/employees', function (req, res) {
    console.log(req);
    connection.query('select * from employee', function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });