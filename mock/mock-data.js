const User = require('../models/user');
const Post = require('../models/post');
const Interaction = require('../models/interaction');

const USERS = [
    new User({ username: 'daniel', age: 25, city: 'sao paulo' }),
    new User({ username: 'mario', age: 35, city: 'torino' }),
    new User({ username: 'luigi', age: 24, city: 'roma' }),
    new User({ username: 'star', age: 32, city: 'venezia' }),
    new User({ username: 'jack', age: 28, city: 'milano' }),
];
const POSTS = [
    new Post({ title: 'post 1' }),
    new Post({ title: 'post 2' }),
    new Post({ title: 'post 3' }),
    new Post({ title: 'post 4' }),
    new Post({ title: 'post 5' }),
];
const INTERACTIONS = [
    new Interaction({ type: 'like' }),
    new Interaction({ type: 'like' }),
    new Interaction({ type: 'like' }),
    new Interaction({ type: 'like' }),
    new Interaction({ type: 'like' }),
];

module.exports = USERS;
module.exports = POSTS;
module.exports = INTERACTIONS;