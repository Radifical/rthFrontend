import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ studentName: '', phoneNumber: '', classesLeft: 0 });
  const [searchTerm, setSearchTerm] = useState('');

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

  const addStudent = async () => {
    try {
      await axios.post('https://rthbackend.onrender.com/users', newStudent);
      setNewStudent({ studentName: '', phoneNumber: '', classesLeft: 0 });
      loadStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      await axios.delete('https://rthbackend.onrender.com/users/'+studentId);
      loadStudents();
    }catch(error){
      console.log("Error deleting ", error);
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(student =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to right, 	#141414, #222222)' }}>
    <div className="p-8 rounded-lg shadow-lg w-full max-w-2xl" style={{ backgroundColor: 'rgba(36, 36, 62, 0.2)' }}>
      <h1 className="text-2xl font-bold text-white text-center mb-4">Student Manager</h1>

      {/* New Student Form */}
      <div className="mb-4">
       
        <div className="mb-4">
          <label htmlFor="studentName" className="block text-gray-300 text-sm font-bold mb-2">Student Name:</label>
          <input
            type="text"
            id="studentName"
            className="w-full px-3 py-2 rounded-md text-gray-300 bg-transparent border border-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={newStudent.studentName}
            onChange={(e) => setNewStudent({ ...newStudent, studentName: e.target.value })}
          />
        </div>
        <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-300 text-sm font-bold mb-2">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              className="w-full px-3 py-2 rounded-md text-gray-300 bg-transparent border border-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={newStudent.phoneNumber}
              onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="classesLeft" className="block text-gray-300 text-sm font-bold mb-2">Classes Left:</label>
            <input
              type="number"
              id="classesLeft"
              className="w-full px-3 py-2 rounded-md text-gray-300 bg-transparent border border-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={newStudent.classesLeft}
              onChange={(e) => setNewStudent({ ...newStudent, classesLeft: parseInt(e.target.value) })}
            />
            </div>
        <div className='flex justify-center py-4'>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-300 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition duration-300 ease-in-out"
            onClick={addStudent}>
            Add Student
          </button>
        </div>
      </div>

      {/* Students List */}
      <h2 className="text-xl font-bold text-white text-center mb-4">Students</h2>

      {/* Search Input */}
      <div className="mb-4">
      <label htmlFor="search" className="block text-gray-300 text-sm font-bold mb-2">Search Student:</label>
    
          <input
            type="text"
            id="search"
            className="w-full px-3 py-2 rounded-md text-gray-300 bg-transparent border border-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={searchTerm}
            onChange={handleSearch}
            
          />
      </div>
      <ul>
        {filteredStudents.map(student => (
          <li key={student._id} className="rounded mb-2 p-4" style={{ backgroundColor: 'rgba(36, 36, 62, 0.8)' }}>
            <div className="text-white flex justify-between items-center">
              <span>{student.studentName} - {student.phoneNumber} - Classes Left: {student.classesLeft}</span>
              <div>
                <Link to={`/edit/${student._id}`}>
                  <button className="text-sm bg-transparent hover:bg-blue-500 text-blue-300 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded transition duration-300 ease-in-out mr-2">Edit</button>
                </Link>
                <button
                  className="text-sm bg-transparent hover:bg-red-500 text-red-300 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded transition duration-300 ease-in-out"
                  onClick={() => deleteStudent(student._id)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default StudentManager;
