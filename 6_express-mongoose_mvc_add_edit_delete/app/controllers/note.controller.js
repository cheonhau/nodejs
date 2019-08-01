const Note = require ( '../models/note.model' );

// create and save a new note
exports.create = ( req, res ) => {
    // validate request
    if ( !req.body.content ) {
        return res.status ( 400 ). send ({
            message : "Note content can not empty"
        });
    }
    // create note
    const note = new Note ({
        title : req.body.title || "title note",
        content : req.body.content
    });
    // save note in the database
    note.save().then ( data => {
        res.send ( data );
    }).catch ( err => {
        res.status ( 500 ).send ({
            message : err.message || 'some error cocured'
        });
    });
};

// return all notes
exports.findAll = ( req, res ) => {
    Note.find ().then ( notes => {
        res.send ( notes );
    }).catch ( err => {
        res.status ( 500 ).send ({
            message : err.message || "some error"
        });
    });
};

// find a single note
exports.findOne = ( req, res ) => {
    Note.findById ( req.params.noteId )
    .then ( note => {
        if ( !note ) {
            return res.status ( 404 ).send ({
                message : "note foound id"
            });
        }
        res.send ( note );
    }).catch ( err => {
        if ( err.kind === 'ObjectId' ) {
            return res.status ( 404 ).send ({
                message : "note not found "
            });
        }
        return res.status ( 500 ).send ({
            message : "error note"
        })
    })
};

// update a note
exports.update = ( req, res ) => {
    // validate request
    if ( !req.body.content ) {
        return res.status ( 400 ).send ({
            message : "note content not empty"
        });
    }
    // find and update
    Note.findByIdAndUpdate ( req.params.noteId, {
        title : req.body.title || "untitle",
        content : req.body.content
    }, { new : true }) // sử dụng ở đây để trả về hàm then những gì đã thay đổi thay vì vẫn giữ nguyên ban đầu
    .then ( note => {
        if ( !note ) {
            return res.status ( 404 ).send ({
                message : "NOte not found"
            });
        }
        res.send ( note );
    }).catch ( err => {
        if ( err.kind === 'ObjectId' ) {
            return res.status ( 404 ).send ({
                message : "Note found Id"
            });
        }
        return res.status ( 500 ).send ({
            message : "error update"
        });
    })
};

// delete a note
exports.delete = ( req, res ) => {
    Note.findByIdAndRemove ( req.params.noteId )
    .then ( note => {
        if ( !note ) {
            return res.status ( 404 ).send ({
                message : "Not found id"
            });
        }
        res.send ({ message : "NOte delete successfully" });
    }).catch ( err => {
        if ( err.kind === 'ObjectId' || err.name === 'NotFound' ) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    })
}