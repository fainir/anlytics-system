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
Event.index({ 
    session_id: 'text',
    name: 'text',
    distinct_user_id: 'text',
    date: 'text',
    os: 'text',
    geolocation: 'text',
    url: 'text',
 });

module.exports = mongoose.model('Event', Event);

