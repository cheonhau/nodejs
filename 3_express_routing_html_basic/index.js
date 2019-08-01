const express = require ( 'express' ),
      server = express ();
      users = require ( './users' );

server.set ( 'port', process.env.PORT || 3000 );

server.get ( '/', ( req, res) => {
    // res.send ( 'Home page' );
    res.sendFile ( __dirname + '/index.html' );
});

server.get ( '/users', (req, res) => {
    // res.send ( 'about page' );
    res.json ( users );
});

// handle middleware
server.use ( ( req, res ) => {
    res.type ( 'text/plain' );
    res.status ( 505 );
    res.send ( 'Error Page' );
});

server.listen ( 3000, () => {
    console.log ( 'Express server started at port 3000' );
});