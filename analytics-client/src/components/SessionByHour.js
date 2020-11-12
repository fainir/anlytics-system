import {useEffect, useState} from 'react';
import {
    LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  
  const demoData = [
    {
      time: '00:00', sessions: 50,
    },
    {
      time: '01:00', sessions: 100,
    },
    {
      time: '02:00', sessions: 200,
    },
    {
      time: '03:00', sessions: 300,
    },
    {
      time: '04:00', sessions: 1000,
    },
    {
      time: '05:00', sessions: 500,
    },
  ];

function SessionByHour() {
const [data, setData] = useState([]);
useEffect(()=>{
    // axios.get('http://localhost:3001/sessionsByHour')
    // .then((results)=>{
    //     setDate(results);
    // });
    setData(demoData);
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
