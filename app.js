require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const interactionRoutes = require('./routes/interactionRoutes');

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');

const dbURI =  process.env.DB_URI;
const PORT = process.env.PORT || 3000;
const urlToServer = "http://localhost:3000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db');
        app.listen(PORT, ["127.0.0.1"], () => console.log(`server running on port ${PORT}`));
    })
    .catch((err) => console.log(err));

// app.use((req,res)=>{
//     console.log(req);
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization');
// });

app.get('/', (req, res) => {
    res.render('index',{urlToServer});
});

// USER ROUTES
app.use(`/users`, userRoutes);

// POST ROUTES
app.use(`/posts`, postRoutes);

// INTERACTION ROUTES
// app.use(`/interactions`, interactionRoutes);


// 404
app.use((req, res) => {
    res.status(404).send('404 page not found');
});