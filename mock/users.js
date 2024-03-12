const User = require('../models/user');

const USERS = [
    new User({ username: 'daniel', age: 25, city: 'sao paulo' }),
    new User({ username: 'mario', age: 35, city: 'torino' }),
    new User({ username: 'luigi', age: 24, city: 'roma' }),
    new User({ username: 'star', age: 32, city: 'venezia' }),
    new User({ username: 'jack', age: 28, city: 'milano' }),
];

module.exports = USERS