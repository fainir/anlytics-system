const mongoose = require('mongoose');

const Event = mongoose.Schema({
    title: String,
    parts: Array,
    // demo: Map
});

module.exports = mongoose.model('Event', Event);