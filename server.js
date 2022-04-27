// Dependencies
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const fs = require('fs');
const path = require('path');
let dbData = require('./db/db.json');

const app = express();

const PORT = process.env.PORT || 3001;

// setup Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// give access to all files in public directory
app.use(express.static('public'));

// html route

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});



// api routes

// GET /api/notes to read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// POST /api/notes to receive a new note to save on the request body, add it to
// db.json file, and then return the new note to client. need to give each note
// a unique ID
app.post('api/notes', (req, res) => {
    const { title, text } = req.body;
    if(title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if(err) {
                console.log(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);
                fs.writeFile(
                    './db/db.json', 
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                    writeErr 
                        ? console.error(writeErr) 
                        : console.info('Successfully updated notes')
                );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error creating new note');
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));