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
        app.listen(PORT, () => console.log(`server running on port ${PORT}`));
    })
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.render('index',{urlToServer});
});

app.use(`/users`, userRoutes);
app.use(`/posts`, postRoutes);

// 404
app.use((req, res) => {
    res.status(404).send('404 page not found');
});