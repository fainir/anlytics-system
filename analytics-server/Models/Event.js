const mongoose = require('mongoose');

const Event = mongoose.Schema({
    session_id: String,
    name: String,
    distinct_user_id: String,
    date: Number,
    os: String,
    geolocation: Map,
    url: String,
});

module.exports = mongoose.model('Event', Event);