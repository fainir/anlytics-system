import {useEffect, useState} from 'react';
import {
    LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import axios from 'axios';  

function SessionByHour() {
const [data, setData] = useState([]);
useEffect(()=>{
    axios.get('http://localhost:3001/sessionsByHour')
    .then((results)=>{
        setData(results.data);
    });
}, []); 

  return (
<ResponsiveContainer>
   <LineChart
    data={data}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="sessions" stroke="#8884d8" activeDot={{ r: 8 }} />
  </LineChart>
  </ResponsiveContainer>
  );
}

export default SessionByHour;
