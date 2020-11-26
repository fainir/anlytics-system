import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const data = [
    {
        session_id: 'dsagre43' ,
        name: 'app launched',
        distinct_user_id: 'adsf',
    },
    {
        session_id: 'dsagre43' ,
        name: 'opened artist page',
        distinct_user_id: 'adsf',
    },{
        session_id: 'dsagre43' ,
        name: 'open song page',
        distinct_user_id: 'adsf',
    },
    {
        session_id: 'dsagre43' ,
        name: 'open song page',
        distinct_user_id: 'adsf',
    }
];

function AllEvents() {
    const classes = useStyles();
    const [typingTimeout, setTypingTimeout] = useState([]);
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [typing, setTyping] = useState();
    const [sort, setSort] = useState();
    const [OS, setOS] = useState();

    const search = (searchTerm, sort, OS) =>{
        let url = 'http://localhost:3001/search?q='+searchTerm;
        if(sort){
            url += '&sort=' + sort;
        }
        if(OS){
            debugger;
            url += '&os=' + OS;
        }
        axios.get(url)
        .then((results)=>{
            setEvents(results.data);
        });
    }

    const handleChangeSort = event =>{
        setSort(event.target.value);
        search(searchTerm, sort);
    }
    
    const handleChangeOS = event =>{
        setOS(event.target.value);
        search(searchTerm, sort, OS );
    }
    
    const changeName = (event) => {
        if (typingTimeout) {
           clearTimeout(typingTimeout);
        }
        setSearchTerm(event.target.value);
        setTyping(false);
        setTypingTimeout(setTimeout(function () {
            search(searchTerm);
          }, 1000));
    }
    
    return (
      <div className={classes.root}>
          <input onChange={changeName} placeholder='Search...'/>
          <Select
          label='Sort'
          id="demo-simple-select"
          value={sort}
          onChange={handleChangeSort}
        >
          <MenuItem value='date'>Date</MenuItem>
          <MenuItem value='alphabetical'>Alphabetical</MenuItem>
        </Select>
        <Select
          label='OS'
          id="demo-simple-select"
          value={OS}
          onChange={handleChangeOS}
        >
          <MenuItem value='Android'>Android</MenuItem>
          <MenuItem value='IOS'>IOS</MenuItem>
          <MenuItem value='Windows'>Windows</MenuItem>
          <MenuItem value='MACOS'>MACOS</MenuItem>
        </Select>


        {events.map( event =>{
            return (
                <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{event.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
            );
        })

        }
      </div>
    );
}

export default AllEvents;
