// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
let dbData = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

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
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
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
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add note`);
    const { title, text } = req.body;
    if (title && text) {
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
                dbData = parsedNotes;
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
            body: newNote,
        };

        console.log(response);
        res.json(response);
    } else {
        res.json('Error creating new note');
    }
});

// DELETE request at api/notes that takes in a specific id and removes it from json content
app.delete('/api/notes/:id', (req, res) => {
   let id = req.params.id;
   fs.readFile('./db/db.json', 'utf8', (err, data) => {
       if (err) {
           console.log(err);
       }
       let noteData = JSON.parse(data);
       for(let i = 0; i < noteData.length; i++) {
           if (id == noteData[i].id) {
               noteData.splice(i, 1);
               fs.writeFile('./db/db.json', JSON.stringify(noteData), (err) => {
                   if (err) {
                       console.log(err);
                   } else {
                        console.log('Note has been deleted');
                   }
               });
           };
       };
   });

   res.end();

});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));