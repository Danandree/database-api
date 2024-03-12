require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const User = require('./models/user');
const mockUsers = require('./mock/users');

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URI}`;
console.log(dbURI);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db');
        app.listen(3000);
    })
    .catch((err) => console.log(err));


app.get('/', (req, res) => {
    // res.send('hello world');
    res.send(req.headers);
    console.log(req);
});

app.get('/add-user', (req, res) => {
    const user = new User({
        username: 'david',
        age: 29,
        city: 'madrid'
    });
    user.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.get('/add-users', (req, res) => {
    mockUsers.forEach((user) => {
        user.save()
            .then((result) => res.send(result))
            .catch((err) => console.log(err));
    });
});

app.get('/users', (req, res) => {
    User.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => res.send(result))
        .catch((err) => {
            console.log(err); 
            // res.send(err);
            res.send(req.params.id.toString(), " not found");
        });
});

app.use((req, res)=>{
    console.log("USE");
});

app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});