# Note Taker Application
![License Badge](https://img.shields.io/badge/License-MIT-blue)

GitHub Repository: https://github.com/atmason90/note-taker-application 
Deployed Application: https://pronotetakerapp.herokuapp.com/ 


## Table of Contents
* [Description](#description)
* [Application Demo](#application-demo)
* [Code Examples](#code-examples)
* [Technologies Used](#technologies-used)
* [Questions](#questions)
* [License](#license)


## Description

The purpose of this project was to create an application where a user can create, save, and delete personal notes. This application utilizes Express.js on the backend to save, retrieve, and delete data from a JSON file.

This application is deployed using Heroku. 


## Application Demo

https://user-images.githubusercontent.com/99947655/165877712-e5f0f7fc-5e7f-4886-87cb-68393bb54391.mp4


## Code Examples

This example displays an api route for a post request that adds and saves notes to the page.

```js
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
```

This example displays an api route for a delete request that removes note data when a user clicks the delete button on a specifit note.

```js
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
               fs.writeFile('./db/db.json', JSON.stringify(noteData, null, 4), (err) => {
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
```


## Technologies Used

![Java Badge](https://img.shields.io/badge/Language-JavaScript-yellow)
![HTML Badge](https://img.shields.io/badge/Language-HTML-9cf)
![CSS Badge](https://img.shields.io/badge/Language-CSS-lightgrey)
![Node Badge](https://img.shields.io/badge/Environment-Node.js-green)
![Express Badge](https://img.shields.io/badge/Backend-Express.js-important)
![Heroku Badge](https://img.shields.io/badge/Deployment-Heroku-blueviolet)


## Questions

If you have any questions regarding this project, please reach out to me via email at atmason90@gmail.com.

You can view my other projects on GitHub by visiting my profile. 
[atmason90](https://github.com/atmason90)


## License

MIT License

Copyright (c) 2022 Andrew Mason

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
