const express = require('express');
const mongoose = require('mongoose');
const { eventNames } = require('./Models/Event');
const Event = require('./Models/Event');
const app = express();
app.use(express.json());
mongoose.connect(
    'mongodb+srv://root:root123456@cluster0.tyh8g.mongodb.net/analytics?retryWrites=true&w=majority', 
    ()=>{
        console.log('Connected Succesfully!!!');
        // fakeEvents();
    }
);

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

randomDate(new Date(2012, 0, 1), new Date());

fakeEvents = () => {
    let sessionIds = ['waf4342t', 'f34s5thy5y', 'a4erst']
    let names = ['App Launched', 'Register Button Click', 'Login Button Click']
    let oss = ['Android', 'Windows', 'MacOs'];
    let browsers = ['Chrome', 'Edge', 'Safari'];
    let urls = ['/', '/about', '/contact'];
    for(let i = 0; i < 100; i++){
        let lastWeekDate = new Date();
        let pastDate = lastWeekDate.getDate() - 7;
        lastWeekDate.setDate(pastDate);
        const evet = new Event({
            session_id: sessionIds[Math.floor(Math.random() * sessionIds.length)] ,
            name: names[Math.floor(Math.random() * names.length)],
            distinct_user_id: 'fewdr65g',
            date: randomDate(lastWeekDate, new Date()).getMilliseconds(),
            os: oss[Math.floor(Math.random() * oss.length)],
            browser: browsers[Math.floor(Math.random() * browsers.length)],
            geolocation: {    
                location: {
                    lat: 81 + i * 100,
                    lng: 86 + i * 100
                },  
                accuracy: 1708 + i * 100
            },
            url: urls[Math.floor(Math.random() * urls.length)],
        })
        evet.save().then(doc=>{
            console.log('event added');
        })
    }
}

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


app.get('/sessionsByDay', (req, res)=>{
    let lastWeekDate = new Date();
    let pastDate = lastWeekDate.getDate() - 7;
    lastWeekDate.setDate(pastDate);
    Event.find({ date: {$gt: lastWeekDate.getMilliseconds()} }).exec().then(docs=>{
       for(let i = 7; i >0; i--){
        let dayDate = new Date();
        let pastDate = dayDate.getDate() - i;
        dayDate.setDate(pastDate);

        let endDate = new Date();
        let pastEndDate = endDate.getDate() - i + 1;
        endDate.setDate(pastEndDate);

        docs.forEach(event=>{
            if(eventNames.date >)
        })
       }
       
        
        
        res.send(docs);
    });
});


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