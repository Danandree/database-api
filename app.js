require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');

const User = require('./models/user');
const mockData = require('./mock/mock-data');

// const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URI}`;
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@api-test.a0bl4dg.mongodb.net/?retryWrites=true&w=majority&appName=API-test`
const dbURILocal = `mongodb://localhost:27017/API-test`

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dbURILocal, { useNewUrlParser: true, useUnifiedTopology: true })
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

app.get('/add-mock-users', (req, res) => {
    mockData.mockUsers.forEach((user) => {
        user.save()
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    })
        .then(() => res.send(mockUsers))
        .catch((err) => console.log(err));
});

app.get('/users', (req, res) => {
    User.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            if (result) { res.send(result); }
            else { res.status(404).send(`User id "${req.params.id.toString()}" doesn't exists`); }
        })
        .catch((err) => {
            console.log(err);
            // res.send(err);
            if (err.kind == 'ObjectId') {
                res.status(404).send(`User id "${req.params.id.toString()}"  not valid`);
            }
        });
});

app.post('/users', (req, res) => {
    const user = new User(req.body.user);
    user.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.delete('/users/:id', (req, res) => {
    console.log(req.params.id, "REQ PARAMS ID");
    User.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result) {
                res.send(result);
            }
            else {
                res.status(404).send(`User with id "${req.params.id.toString()}"  not found`);
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.kind == 'ObjectId') {
                res.status(404).send(`User id "${req.params.id.toString()}"  not valid`);
            }
        });
});

// 404
app.use((req, res) => {
    res.status(404).send('404 page not found');
});