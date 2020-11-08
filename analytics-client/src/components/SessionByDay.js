import {useEffect, useState} from 'react';
import {
    LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  
  const demoData = [
    {
      date: '2020/09/20', sessions: 50,
    },
    {
        date: '2020/09/21', sessions: 100,
    },
    {
        date: '2020/09/22', sessions: 200,
    },
    {
        date: '2020/09/23', sessions: 300,
    },
  ];

function SessionByDay() {
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
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="sessions" stroke="#8884d8" activeDot={{ r: 8 }} />
  </LineChart>
  </ResponsiveContainer>
  );
}

export default SessionByDay;
