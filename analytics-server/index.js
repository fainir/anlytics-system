const express = require('express');
const mongoose = require('mongoose');
const { eventNames } = require('./Models/Event');
const Event = require('./Models/Event');
const app = express();
var cors = require('cors')
app.use(express.json());
app.use(cors());
mongoose.connect(
    'mongodb+srv://root:root123456@cluster0.tyh8g.mongodb.net/analytics?retryWrites=true&w=majority', 
    ()=>{
        console.log('Connected Succesfully!!!');
        // fakeEvents();
    }
);


function getLastWeek() {
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return lastWeek;
}

function getLastWeeks(numOfWeeks) {
    return new Date(new Date().getTime() - (numOfWeeks * 7 * 24 * 60 * 60 * 1000));
}


function getLastTwoMonths() {
    return new Date(new Date().getTime() - (60 * 24 * 60 * 60 * 1000));
}


function getLastDay() {
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    return lastWeek;
}

function randomDate(from, to) {
    from = from.getTime();
    to = to.getTime();
    return new Date(from + Math.random() * (to - from));
}

function getDateToString(date){
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}

function getDateToHour(date){
    return date.getHours() + ":00" ;
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 
function getUniqueIds(numOfIds){
    let ids = [];
    for(let i = 0; i<numOfIds; i++ ){
        ids.push(makeid(20))
    }
    return ids;
}

fakeEvents = () => {
    let sessionIds = ['waf4342t', 'f34s5thy5y', 'a4erst']
    let userIds = getUniqueIds(500);
    let names = ['App Launched', 'Register Button Click', 'Login Button Click']
    let oss = ['Android', 'Windows', 'MacOs'];
    let browsers = ['Chrome', 'Edge', 'Safari'];
    let urls = ['/', '/about', '/contact'];
    for(let i = 0; i < 1000; i++){
        const evet = new Event({
            session_id: sessionIds[Math.floor(Math.random() * sessionIds.length)] ,
            name: names[Math.floor(Math.random() * names.length)],
            distinct_user_id: userIds[Math.floor(Math.random() * userIds.length)],
            date: randomDate(getLastTwoMonths(), new Date()).getTime(),
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

    Event.find({ date: {$gt: getLastWeek().getTime()} }).exec().then(docs=>{
        let sessionsByDay = [];
        for(let i = 7; i > 0; i--){
            let dayDate = new Date();
            let pastDate = dayDate.getDate() - i;
            dayDate.setDate(pastDate);

            let endDate = new Date();
            let pastEndDate = endDate.getDate() - i + 1;
            endDate.setDate(pastEndDate);

            let uniqueSessions = [];

            docs.forEach(event=>{
                if(event.date > dayDate.getTime() && event.date < endDate.getTime()){
                    if(!uniqueSessions.includes(event.session_id)){
                        uniqueSessions.push(event.session_id);
                    }
                }
            });
            sessionsByDay.push({date: getDateToString(dayDate), sessions: uniqueSessions.length});
       }
       
        res.send(sessionsByDay);
    });
});



app.get('/sessionsByHour', (req, res)=>{

    Event.find({ date: {$gt: getLastDay().getTime()} }).exec().then(docs=>{
        let sessionsByDay = [];
        for(let i = 23; i >= 0; i--){

            let dayDate = new Date(new Date().getTime() - (i * 60 * 60 * 1000));
            let endDate = new Date(new Date().getTime() - ((i - 1) * 60 * 60 * 1000));

            let uniqueSessions = [];

            docs.forEach(event=>{
                if(event.date > dayDate.getTime() && event.date < endDate.getTime()){
                    if(!uniqueSessions.includes(event.session_id)){
                        uniqueSessions.push(event.session_id);
                    }
                }
            });
            sessionsByDay.push({time: getDateToHour(dayDate), sessions: uniqueSessions.length});
       }
       
        res.send(sessionsByDay);
    });
});


app.get('/retentionCohort', (req, res)=>{
    Event.find().exec().then(docs=>{
        let retention = [];
        for(let i = 0; i < 4; i++){
            let events = docs.filter(event => event.date > getLastWeeks(i+2).getTime());
            let oldevents = docs.filter(event => event.date < getLastWeeks(i+2).getTime());
            let userIds = [];
            events.forEach(event=>{
                let isNew = true;
                oldevents.forEach(oldEvent=>{
                    if(event.distinct_user_id === oldEvent.distinct_user_id){
                        isNew = false;
                    }
                }); 
                if(isNew && !userIds.includes(event.distinct_user_id)) {
                    userIds.push(event.distinct_user_id);
                }
            });
            retention.push({
                startDate: getLastWeeks(i+2),
                endDate: getLastWeeks(i+1),
                newUsers: userIds.length,
                retention: getRetention(userIds, docs, i+1)        
            });
            
        }
        res.send(retention);
    });
});

function getRetention(userIds, docs, numOfChecks){
    let retention = [];
    for(let i = 0; i < numOfChecks; i++){
        let events = docs.filter(event => event.date > getLastWeeks(i+1).getTime() && event.date < getLastWeeks(i).getTime());
        let uniqueIds = [];
        userIds.forEach(id=>{
            events.forEach(event=>{
                if(id === event.distinct_user_id && !uniqueIds.includes(id)){
                    uniqueIds.push(id);
                }
            });
        });
        retention.unshift(uniqueIds.length / userIds.length * 100);
    }
    retention.unshift(100);
    return retention;
}


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