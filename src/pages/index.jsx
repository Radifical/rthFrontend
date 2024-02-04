import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  BarChart, Bar, ResponsiveContainer
} from 'recharts';

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);
  
  const loadStudents = async () => {
    try {
      const response = await axios.get('https://rthbackend.onrender.com/users');
      setStudents(response.data.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Dummy data for the charts
  const lineChartData = [
    { day: 'Monday', Income: 1 },
    { day: 'Tuesday', Income: 2 },
    { day: 'Wednesday', Income: 3 },
    { day: 'Thursday', Income: 4 },
    { day: 'Friday', Income: 3 },
    { day: 'Saturday', Income: 5 },
    { day: 'Sunday', Income: 6 },
  ];
  const barChartData = [
    { month: 'April', Income: 12000 },
    { month: 'May', Income: 18000 },
    { month: 'June', Income: 15000 },
  ];

  return (
    <div className="min-h-screen p-5" style={{ background: 'linear-gradient(to right, #141414, #222222)' }}>
      <h1 className="text-3xl font-bold text-white mb-5">RTH Dashboard 📋</h1>
      
      {/* Stats and Actions Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {/* Student count card */}
        <div className="bg-white rounded-lg p-5 shadow-lg flex items-center hover:shadow-md transition duration-300 ease-in-out hover:border hover:border-blue-500 cursor-pointer" style={{ backgroundColor: 'rgba(36, 36, 62, 0.2)' }}>
          <i className="fas fa-users text-4xl text-orange-500"></i>
          <div className="ml-4">
            <p className="text-l text-white">Students</p>
            <p className="text-xl text-gray-400 font-bold">{students.length}</p>
            <break>-</break>
            
            <LineChart width={300} height={200} data={lineChartData}>
            <Line type="monotone" dataKey="Income" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
          </LineChart>
          </div>
        </div>

        {/* ... Repeat for other stat cards ... */}
        {/* ... Add PieChart and BarChart as needed ... */}
      </div>

      {/* Charts Container */}

      </div>

  );
}

export default Home;
