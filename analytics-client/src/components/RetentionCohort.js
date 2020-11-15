import {useEffect, useState} from 'react';
import {Typography, Grid} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';

  const demoData = [
    {
      startDate: new Date(2020,1,22),
      endDate: new Date(2020,1,28),
      newUsers: 3425,
      retention: [100, 50, 30, 20, 10]
    },
    {
      startDate: new Date(2020,1,15),
      endDate: new Date(2020,1,21),
      newUsers: 2425,
      retention: [100, 50, 30, 20]
    },
    {
      startDate: new Date(2020,1,8),
      endDate: new Date(2020,1,14),
      newUsers: 1234,
      retention: [100, 50, 30]
    },
    {
      startDate: new Date(2020,1,1),
      endDate: new Date(2020,1,7),
      newUsers: 751,
      retention: [100, 10]
    }
    
  ];

function RetentionCohort() {
const [data, setData] = useState([]);
const [avgData, setavgData] = useState([]);
const [totalUsers, setTotalUsers] = useState([]);

const getAvg = (data) =>{
  let avgData = [];
  data[0].retention.forEach((value, i) => {
    let sum = 0;
    data.forEach(obj => {
      if(obj.retention[i]){
        sum += obj.retention[i];
      }
    });
    avgData.push(sum / data.length);
  });
  return avgData;
};
const getTotalUsers = (data) =>{
    let totalUsers = 0;
    data.forEach(obj => {
      totalUsers += obj.newUsers;
    });
    return totalUsers;
};

useEffect(()=>{
    axios.get('http://localhost:3001/retentionCohort')
    .then((results)=>{
      debugger;
      let data = results.data.map(obj => {
        return {
          startDate: new Date(obj.startDate),
          endDate: new Date(obj.endDate),
          newUsers: obj.newUsers,
          retention: obj.retention
        };
      })
      setData(data);
      setavgData(getAvg(data));
      setTotalUsers(getTotalUsers(data));
      });
}, []); 

  return (
  <div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
        <div style={{width: 130}}></div>
        {data && data[0] && data[0].retention.map((precent,i)=>{
          return (
            <Typography variant="body2" style={{ textAlign:'center', width: 50, height: 20, margin: 1}}>Week {i}</Typography>
            );
          })
        } 
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
        <div style={{width: 130}}>
          <Typography variant="body2">
            Total Users
          </Typography>
          <Typography variant="caption">
            {totalUsers} new users
          </Typography>
          </div>
    {avgData.map(precent=>{
      return (
        <Typography variant="body2" style={{backgroundColor:'gray', textAlign:'center', width: 50, height: 20, margin: 1}}>{precent}%</Typography>
      );
    })}
    </Grid>

    {data.map(week=>{
      return(
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <div style={{width: 130}}>
          <Typography variant="body2">
            {week.startDate.getDate()}/{week.startDate.getMonth()}/{week.startDate.getYear()} - {week.endDate.getDate()}/{week.endDate.getMonth()}/{week.endDate.getYear()}
          </Typography>
          <Typography variant="caption">
            {week.newUsers} new users
          </Typography>
          </div>
          {week.retention.map(precent=>{
            return (
            <Typography variant="body2" style={{backgroundColor:'blue', textAlign:'center', width: 50, height: 20, margin: 1}}>{precent}%</Typography>
            );
          })
          }
        </Grid>
      )
    })}
  </div>
  );
}

export default RetentionCohort;
