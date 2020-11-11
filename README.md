# Analytics Challenge

## Introduction

You will build analytics system that would present usage analytics about a website by collecting events sent to the platform (similar to Mixpanel.com).

## Home Page Requirements:

![](https://i.imgur.com/gtPzvXP.jpg)

 - Add controls for time-ranges in relevant charts (you can implement it in any way that still works with the [default requirements](backend.md)) 
### Tiles to present:
 - Showing events on Google Map (cluster events).  
you can use whichever library you choose, but [this one](https://www.npmjs.com/package/@react-google-maps/api) is recommended) 
![](https://i.imgur.com/AOACrVj.png)
 - Showing graph with unique sessions by day with option to change date
![](https://i.imgur.com/EPPmDjq.png)
 - Showing graph with unique sessions by hour with option to change date
![](https://i.imgur.com/6gJ7e1k.png)
 - Showing retention cohort week by week
![How Startups Can Do Better Cohort Analyses – Philosophical Hacker](https://www.philosophicalhacker.com/images/cohort-analysis.png)
 - Showing log of all events - search option and filter by event name using regex. 
 
 The `Events Log` should load only 10 events, and load more only when the client scrolls down the log, order by time. 
![](https://i.imgur.com/hFlqDbG.png)
 - Showing page views for on each page.
 - Showing pie charts with users by operating system usage.

## Backend Requirements:
 - use mongodb Atlas
 - POST "/event" - adding new event to event collection.
 - Any other entry point needed.
	
  Sample of [event](client/src/models/event.ts) (you can add any other properties you if wish):
```json
{
  "_id": "VATb6bdcOEW", 
  "session_id": "d788bae3-6909-49a2-a54a-6d50d35b3c70",  
  "name": "signup",  
  "distinct_user_id": "O-5mFsaxp9",  
  "date": 1603316369846,  
  "os": "ios",  
  "browser": "chrome",  
  "geolocation": {  
    "location": {
      "lat": 81,
      "lng": 86
    },  
    "accuracy": 1708
  },  
  "url": "http://localhost3000/signup"
}  

```
## General Requirement
- Add Error Boundaries around each tile (chart).
- Use Styled Components for styling.
- Make it responsive for any screen size.

## Bonuses
  - Showing time per url per user  
  ![](https://i.imgur.com/FSQEHo7.png)
  - Showing time spent on each page by all users.  
  ![](https://i.imgur.com/RFx8GFw.png)
  - Make your own custom tiles.
  - Make the tiles resizable.
  - Creating piece of code that send events from clients to the server and save it.
  - Add an option to change chart type (pie | bars | line) in the same tile 
  - Make the tiles move by drag and drop.
  - Make the time-frame adjustable on all charts
  - While loading data show loading indicator you built using canvas tag
  - Add any feature you wish

## Submit the Exersice
Upload your clienet and server to Github and submit the repository link to the Exersice on google classroom
