import React from 'react'
import { useState, useEffect } from 'react';
import './CreateSession.css'

export default function CreateSession() {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState('');
  const [courseNumbers, setCourseNumbers] = useState([]);
  const [courseNumber, setCourseNumber] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [studyGroupName, setStudyGroupName] = useState('');
  const [mode, setMode] = useState('');

  async function fetchCourses() {
    const response = await fetch('http://localhost:8000/getdepts');
    const data = await response.json();
    const uniqueDepartments = [...new Set(data.courses.map(course => course.department))];
    setDepartments(uniqueDepartments);
  }
  
  useEffect(() => {
    fetchCourses();
  }, []);

  async function handleDepartmentChange(event) {
    const selectedDepartment = event.target.value;
    setDepartment(selectedDepartment);
    console.log(department)
    const response = await fetch(`http://localhost:8000/getcourses?dept=${selectedDepartment}`);
    const data = await response.json();
    setCourseNumbers(data.courses)
  }

  function handleCourseNumberChange(event) {
    setCourseNumber(event.target.value);
  }

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  function handleStartTimeChange(event) {
    setStartTime(event.target.value);
  }

  function handleEndTimeChange(event) {
    setEndTime(event.target.value);
  }

  const handleSubmit = async() => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: studyGroupName, mode: mode, dept:department, cnum: courseNumber, date: date, stime: startTime, etime: endTime, user_id: 1 })
      };
      const response = await fetch('http://localhost:8000/createsession', requestOptions);


  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Create a new session</h1>
        <label htmlFor="studyGroupName">Study Group Name:</label>
        <input id="studyGroupName" type="text" value={studyGroupName} onChange={event => setStudyGroupName(event.target.value)} />
        <br/>
        <label htmlFor="mode">Mode:</label>
        <select id="mode" value={mode} onChange={event => setMode(event.target.value)}>
            <option value="">Select a mode</option>
            <option value="in-person">In-Person</option>
            <option value="online">Online</option>
        </select>
        <br/>
        <label htmlFor="department">Course Department:</label>
        <select id="department" value={department} onChange={handleDepartmentChange}>
          <option value="">Select a department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="courseNumber">Course Number:</label>
        <select id="courseNumber" value={courseNumber} onChange={handleCourseNumberChange}>
          <option value="">Select a course number</option>
          {courseNumbers.map((num) => (
            <option key={num.course_num} value={num.course_num}>
              {num.course_num}
            </option>
          ))}
        </select>
        <br/>
        <label htmlFor="date">Date:</label>
        <input id="date" type="date" value={date} onChange={handleDateChange} />
        <br />
        <label htmlFor="startTime">Start Time:</label>
        <input id="startTime" type="time" value={startTime} onChange={handleStartTimeChange} />
        <br />
        <label htmlFor="endTime">End Time:</label>
        <input id="endTime" type="time" value={endTime} onChange={handleEndTimeChange} />
        <br/>
        <button className='button' onClick = {handleSubmit}>Create</button>
    </div>
    </div>
  );
}