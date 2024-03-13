require('dotenv').config();
const ejs = require('ejs');

const userRoutes = require('./routes/userRoutes');

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');

const mockData = require('./mock/mock-data');

// const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URI}`;
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@api-test.a0bl4dg.mongodb.net/?retryWrites=true&w=majority&appName=API-test`
const dbURILocal = `mongodb://localhost:27017/API-test`

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect(dbURILocal, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db');
        app.listen(3000);
    })
    .catch((err) => console.log(err));


app.get('/', (req, res) => {
    // res.send();
    res.render('index');
    console.log(req);
});

// USER ROUTES
app.use(`/users`, userRoutes);


// 404
app.use((req, res) => {
    res.status(404).send('404 page not found');
});