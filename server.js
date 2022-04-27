// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');

const app = express();

const PORT = process.env.PORT || 3001;

// setup Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// give access to all files in public directory
app.use(express.static('public'));

// html routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// api routes

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));