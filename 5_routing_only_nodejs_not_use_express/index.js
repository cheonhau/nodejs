const http = require ( 'http' ),
      url = require ( 'url' );  
// cách 1
// server = http.createServer ();

// makeServer = server.on ( 'request', ( request, response ) => {
//     response.writeHead ( 200, { 'Content-Type' : 'text/plain' });
//     response.write ( 'hello huy handsome' );
//     response.end ();
// });

// cách 2 call back
makeServer = function ( request, response ) {
    let path = url.parse ( request.url ) . pathname;
    console.log (path);
    if ( path === '/') {
        response.writeHead ( 200, { 'Content-Type' : 'text/plain' });
        response.write ( 'hello every one' );
    } else if ( path === '/about' ) {
        response.writeHead ( 200, { 'Content-Type' : 'text/plain' });
        response.write ( 'about page' );
    } else if ( path === '/blog' ) {
        response.writeHead ( 200, { 'Content-Type' : 'text/plain' });
        response.write ( 'blog page' );
    } else {
        response.writeHead ( 404, { 'Content-Type' : 'text/plain' });
        response.write ( 'error page' );
    }
    // response.writeHead ( 200, { 'Content-Type' : 'text/plain' });
    // response.write ( 'hello huy handsome' );
    response.end ();
    // response.end ( JSON.stringify ( result ) );
};

server = http.createServer ( makeServer );

server.listen ( 3000, () => {
    console.log ( "Node server created at port 3000" );
});