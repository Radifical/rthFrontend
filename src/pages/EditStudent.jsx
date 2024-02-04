import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams();
  const [text, setText] = useState('');
  const [updateStudent, setUpdateStudent] = useState({ studentName: '', phoneNumber: '', classesLeft: 0 });

  const update = async () => {
    try {
      await axios.put(`https://rthbackend.onrender.com/users/${id}`, updateStudent);
      setText('Student has been updated');
    } catch (error) {
      setText('Error updating student. Please try again.');
      console.error('Error updating:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{ background: 'linear-gradient(to right, #141414, #222222)' }}>
      <div className="p-8 rounded-lg shadow-lg w-full max-w-2xl" style={{ backgroundColor: 'rgba(36, 36, 62, 0.2)' }}>
        <Link to="/manager">
          <button className="bg-transparent hover:bg-red-500 text-gray-300 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded transition duration-300 ease-in-out mb-4">Back</button>
        </Link>
        <h2 className="text-2xl font-bold text-white text-center mb-4">Edit Student</h2>
        <p className="text-white mb-4">{text}</p>
        <div className="mb-4">
          <label htmlFor="studentName" className="block text-gray-300 text-sm font-bold mb-2">Student Name:</label>
          <input
            type="text"
            id="studentName"
            className="w-full px-3 py-2 rounded-md text-gray-300 bg-transparent border border-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={updateStudent.studentName}
            onChange={(e) => setUpdateStudent({ ...updateStudent, studentName: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-300 text-sm font-bold mb-2">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            className="w-full px-3 py-2 rounded-md text-gray-300 bg-transparent border border-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={updateStudent.phoneNumber}
            onChange={(e) => setUpdateStudent({ ...updateStudent, phoneNumber: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="classesLeft" className="block text-gray-300 text-sm font-bold mb-2">Classes Left:</label>
          <input
            type="number"
            id="classesLeft"
            className="w-full px-3 py-2 rounded-md text-gray-300 bg-transparent border border-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={updateStudent.classesLeft}
            onChange={(e) => setUpdateStudent({ ...updateStudent, classesLeft: parseInt(e.target.value) })}
          />
        </div>
        <div className='flex justify-center'>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-300 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition duration-300 ease-in-out"
            onClick={update}>
            Update Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
