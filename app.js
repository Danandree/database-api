require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const dbURI = process.env.DB_URI;
const PORT = process.env.PORT || 3000;
const IPADDRESS = process.env.IPADDRESS || '0.0.0.0';
const urlToServer = `${IPADDRESS}:${PORT}`;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(`/users`, userRoutes);
app.use(`/posts`, postRoutes);

app.get('/', (req, res) => {
    res.render('index', { urlToServer });
});

// 404
app.use((req, res) => {
    res.status(404).send({ message: 'Page not found' });
});

try {
    const connection = mongoose.connect(dbURI);
    console.log('connected to db');
    app.listen(PORT, IPADDRESS, () => console.log(`server running on port ${PORT}`));
}
catch (err) {
    console.log(err);
}
