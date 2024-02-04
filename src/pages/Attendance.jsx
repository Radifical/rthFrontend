import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import axios from 'axios';

const Attendance = () => {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://rthbackend.onrender.com/users');
      setStudents(response.data.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
    setLoading(false);
  };

  const handleAttendanceChange = async (studentId, present) => {
    setAttendance(prevAttendance => ({
      ...prevAttendance,
      [studentId]: present,
    }));
  
    const studentIndex = students.findIndex(student => student._id === studentId);
    if (studentIndex !== -1) {
      const updatedStudents = [...students];
      let classesLeft = updatedStudents[studentIndex].classesLeft || 0;
      
      if (present && classesLeft > 0) {
        classesLeft--; // Decrement classesLeft by 1 if present
        updatedStudents[studentIndex].classesLeft = classesLeft; // Update local state
  
        try {
          // Send the update to the server
          await axios.put(`https://rthbackend.onrender.com/users/${studentId}`, { ...updatedStudents[studentIndex], classesLeft });
          setStudents(updatedStudents); // Update the state with the new students array
        } catch (error) {
          console.error('Error updating student:', error);
        }
      }
    }
  };

  

  const generatePDF = async () => {
    const doc = new jsPDF();
  
    doc.text(`Attendance for ${date}`, 10, 10);
  
    let y = 30; // Initial y position
  
    students.forEach((student) => {
      const studentName = student.studentName;
      const present = attendance[student._id] || false;
      const attendanceText = present ? 'Present' : 'Absent';
      const classesLeft = student.classesLeft || 0; // Get the classes left from the state
      doc.text(`- ${studentName} (${attendanceText}) - Classes Left: ${classesLeft}`, 10, y);
      y += 10; // Increment y position
    });
  
    // Save the document
    doc.save(`attendance_${date}.pdf`);
  };
  
  

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{ background: 'linear-gradient(to right, #141414, #222222)' }}>
      <div className="p-8 rounded-lg shadow-lg w-full" style={{ backgroundColor: 'rgba(36, 36, 62, 0.2)', maxWidth: '1200px' }}>
        <h1 className="text-2xl font-bold text-white text-center mb-4">Daily Attendance</h1>

        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-300 text-sm font-bold mb-2">Date:</label>
          <input
            type="date"
            id="date"
            className="w-full px-3 py-2 rounded-md text-gray-300 bg-transparent border border-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <ul className="mb-4 overflow-auto" style={{ maxHeight: '500px' }}>
          {students.map(student => (
            <li key={student._id} className="flex items-center justify-between mb-2 p-4 rounded transition duration-300 ease-in-out bg-transparent hover:bg-dark-blue" style={{ backgroundColor: 'rgba(36, 36, 62, 0.8)' }}>
              <span className="text-white">{student.studentName}</span>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300"
                  checked={attendance[student._id] || false}
                  onChange={e => handleAttendanceChange(student._id, e.target.checked)}
                />
                <span className="checkmark bg-white rounded border-2 border-blue-500 hover:bg-blue-600 transition-all"></span>
              </label>
            </li>
          ))}
        </ul>

        <div className='flex justify-center'>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-300 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition duration-300 ease-in-out"
            onClick={generatePDF}>
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;