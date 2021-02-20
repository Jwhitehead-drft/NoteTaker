const notesArray = require("../db/db.json");
const fs = require("fs");
const path = require("path");
const { uuid } = require('uuidv4');
//const express = require('express');
//const router = express.Router();

module.exports = (app) => {
    app.get("/api/notes", (req, res) => {
        res.json(notesArray);
    })
    // WE want to QUERY our DB for all NOTES
    app.post("/api/notes", (req, res) => {

        // Create a temp NOTE OBJECT and add an ID property
        const newNote = {
            id: uuid(),
            title: req.body.title,
            text: req.body.text
        }

        console.log(newNote);
        const file = path.join(__dirname, "../db/db.json");

        notesArray.push(newNote);
        // Check for note save
        fs.writeFile(file, JSON.stringify(notesArray, null, 4), err => {
            if (err) throw err;
            console.log("New note has been saved!");
        });

        res.send(newNote);
    });

    app.delete("/api/notes/:id", (req, res) => {
        const id = req.params.id;
        const file = path.join(__dirname, "../db/db.json");

        for (const note of notesArray) {
            if (id === note.id) {
                const index = notesArray.indexOf(note);
                notesArray.splice(index, 1);
                fs.writeFile(file, JSON.stringify(notesArray, null, 4), err => {
                    if (err) throw err;
                    console.log("Note has been deleted!");
                });
                res.end();
            }
        }
    })
}


