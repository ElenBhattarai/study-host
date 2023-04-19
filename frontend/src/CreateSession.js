import React from 'react'
import { useState, useEffect } from 'react';

export default function CreateSession() {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState('');
  const [courseNumbers, setCourseNumbers] = useState([]);
  const [courseNumber, setCourseNumber] = useState('');

  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch('http://localhost:8000/getcourses');
      const data = await response.json();
      const uniqueDepartments = [...new Set(data.courses.map(course => course.department))];
      console.log(uniqueDepartments);
      setDepartments(uniqueDepartments);
      setCourseNumbers(data.courses);
    }
    fetchCourses();
  }, []);

  async function handleDepartmentChange(event) {
    const selectedDepartment = event.target.value;
    setDepartment(selectedDepartment);
    const response = await fetch(`/api/courses/${selectedDepartment}`);
    const data = await response.json();
    setCourseNumbers(data.courseNumbers);
  }

  function handleCourseNumberChange(event) {
    setCourseNumber(event.target.value);
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Create a new session</h1>
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
      </div>
    </div>
  );
}