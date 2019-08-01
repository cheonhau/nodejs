module.exports = ( app ) => {
    const notes = require ( '../controllers/note.controller' );

    // create a new note
    app.post ( '/notes', notes.create );

    // get all notes
    app.get ( 'notes', notes.findAll );

    // get a single note
    app.get ( '/notes/:noteId', notes.findOne );

    // update a note with noteId
    app.put ( '/notes/:noteId', notes.update );

    // delete a note with noteId
    app.delete ( '/notes/:noteId', notes.delete );

}