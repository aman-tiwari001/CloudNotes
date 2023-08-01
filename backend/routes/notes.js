const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Get all the notes using GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => { // fetchUser - a middleware
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
})

// ROUTE 2 : To add new note using POST "/api/notes/addnote". Login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title'),
    body('description', 'Description must be at least 5 chars long')
], async (req, res) => { // fetchUser - a middleware

    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await note.save();

        res.json(note);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal server error occured!");
    }
})

// ROUTE 3 : Update an existing note using: "PUT /api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchUser, async (req, res) => { // fetchUser - a middleware 

    try {

        const { title, description, tag } = req.body;
        //Create a new note object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // Find the note to be updated and update it.
        let note = await Notes.findById(req.params.id);
        // console.log(req.params.id)
        if (!note) {
            return res.status(404).send("Note not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal server error occured!");
    }
})

// ROUTE 3 : To delete an existing note using : DELETE "/api/notes/deletenote/:id". Login required

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // FIND THE NOTE TO BE DELETED
        let note = await Notes.findById(req.params.id);
 
        if (!note) {
            return res.status(404).send("Note not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"SUCCESS":"Note deleted successfully"});
    }
    catch(err) {
        return res.status(500).send("Internal server error!")
    }
})

module.exports = router;