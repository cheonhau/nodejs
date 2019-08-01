var express = require ( 'express' );
var app = express ();

// show list users
app.get ( '/', function ( req, res, next ) {
    req.getConnection ( function ( error, conn ) {
        conn.query ( 'SELECT * FROM users ORDER BY id DESC', function ( err, rows, fields ) {
            if ( err ) {
                req.flash ( 'error', err );
                res.render ( 'user/list', {
                    title : 'USER LIST',
                    data : ''
                });
            } else {
                // render to views/user/list.ejs
                res.render ( 'user/list', {
                    title : 'User List',
                    data : rows
                });
            }
        })
    })
});
// show view add user
app.get ( '/add', function ( req, res, next ) {
    // render to views/user/add.ejs
    res.render ( 'user/add', {
        title : 'Add New User',
        name : '',
        age : '',
        email : ''
    });
});
// add user action
app.post ( '/add', function ( req, res, next ) {
    // validate 
    req.assert ( 'name', 'Name is required' ).notEmpty ();
    req.assert ( 'age', 'Age is required' ). notEmpty ();
    req.assert ( 'email', 'A valid email is required' ).isEmail ();

    var errors = req.validationErrors ();
    if ( !errors ) {
        var user = {
            name    : req.sanitize ( 'name' ).escape ().trim (),
            age     : req.sanitize ( 'age' ).escape ().trim (),
            email   : req.sanitize ( 'email' ).escape ().trim ()
        };
        req.getConnection ( function ( error, conn ) {
            conn.query ( 'INSERT INTO users SET ?', user, function ( err, result ) {
                if ( err ) {
                    req.flash ( 'error', err );
                    // render to views/user/add.ejs
                    res.render ( 'user/add', {
                        title   : 'Add New User',
                        name    : user.name,
                        age     : user.age,
                        email   : user.email
                    });
                } else {
                    req.flash ( 'success', 'Data added successfully' );
                    // render to views/user/add.ejs
                    res.render ( 'user/add', {
                        title   : 'Add New User',
                        name    : '',
                        age     : '',
                        email   : ''
                    });
                }
            })
        })
    } else {
        // Display error to user
        var error_msg = '';
        errors.forEach ( function ( error ) {
            error_msg += error.msg + '<br>';
        });
        req.flash ( 'error', error_msg );

        res.render ( 'user/add', {
            title : 'Add New User',
            name : req.body.name,
            age : req.body.age,
            email : req.body.email
        });
    }
});

// show edit user
app.get ( '/edit/(:id)', function ( req, res, next ) {
    req.getConnection ( function ( error, conn ) {
        conn.query ( 'SELECT * FROM users WHERE id = ' + req.params.id, function ( err, rows, fields ) {
            if ( err ) throw err;

            // if user not found
            if ( rows.length <= 0 ) {
                req.flash ( 'error', 'User not found' );
                res.redirect ( '/users' );
            } else {
                // render to veiws/user/edit.ejs 
                res.render ( 'user/edit', {
                    title   : 'Edit User',
                    id      : rows[0].id,
                    name    : rows[0].name,
                    age     : rows[0].age,
                    email   : rows[0].email
                });
            }
        });
    });
});

app.put('/edit/(:id)', function(req, res, next) {
    req.assert('name', 'Name is required').notEmpty()           //Validate name
    req.assert('age', 'Age is required').notEmpty()             //Validate age
    req.assert('email', 'A valid email is required').isEmail()  //Validate email
 
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
        
        /********************************************
         * Express-validator module
         
        req.body.comment = 'a <span>comment</span>';
        req.body.username = '   a user    ';
 
        req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
        req.sanitize('username').trim(); // returns 'a user'
        ********************************************/
        var user = {
            name: req.sanitize('name').escape().trim(),
            age: req.sanitize('age').escape().trim(),
            email: req.sanitize('email').escape().trim()
        }
        
        req.getConnection(function(error, conn) {
            conn.query('UPDATE users SET ? WHERE id = ' + req.params.id, user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/edit', {
                        title: 'Edit User',
                        id: req.params.id,
                        name: req.body.name,
                        age: req.body.age,
                        email: req.body.email
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/edit', {
                        title: 'Edit User',
                        id: req.params.id,
                        name: req.body.name,
                        age: req.body.age,
                        email: req.body.email
                    })
                }
            })
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)
        
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        res.render('user/edit', { 
            title: 'Edit User',            
            id: req.params.id, 
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        })
    }
});

// DELETE USER
app.delete('/delete/(:id)', function(req, res, next) {
    var user = { id: req.params.id }
    
    req.getConnection(function(error, conn) {
        conn.query('DELETE FROM users WHERE id = ' + req.params.id, user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/users')
            } else {
                req.flash('success', 'User deleted successfully!')
                // redirect to users list page
                res.redirect('/users')
            }
        })
    })
})
 
module.exports = app