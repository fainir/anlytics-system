const express = require('express');
const mongoose = require('mongoose');
const Event = require('./Models/Event');
const app = express();
app.use(express.json());
mongoose.connect(
    'mongodb+srv://root:root123456@cluster0.tyh8g.mongodb.net/analytics?retryWrites=true&w=majority', 
    ()=>{
        console.log('Connected Succesfully!!!');
    }
);

app.post('/event', (req, res)=>{
    const evet = new Event({
        session_id: req.body.session_id,
        name: req.body.name,
        distinct_user_id: req.body.distinct_user_id,
        date: req.body.date,
        os: req.body.os,
        browser: req.body.browser,
        geolocation: req.body.geolocation,
        url: req.body.url,
    })
    evet.save().then(doc=>{
        res.send('event added');
    })
});


// app.get('/tutorials', (req, res)=>{
//     Tutorial.find().exec().then(docs=>{
//         res.send(docs);
//     });
// });


// app.get('/tutorial/:id', (req, res)=>{
//     Tutorial.findById(req.params.id).exec().then(doc=>{
//         res.send(doc)
//     });
// });


// app.get('/tutorialByTitle/:title', (req, res)=>{
//     Tutorial.find({title: req.params.title}).exec().then(doc=>{
//         res.send(doc)
//     });
// });

// app.get('/searchTutorial/:title', (req, res)=>{
//     let regex = new RegExp(`^${req.params.title}`);
//     Tutorial.find({title:regex}).exec().then(doc=>{
//         res.send(doc)
//     });
// });

// app.put('/tutorial/:id', (req, res)=>{
//     Tutorial.updateOne({_id: req.params.id}, {$set: req.body}).exec().then(doc=>{
//         res.send(doc)
//     });
// });


app.listen(3001);