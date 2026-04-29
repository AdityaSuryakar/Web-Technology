import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';

function App() {
	  // State to store student list
	  const [students, setStudents] = useState([]);
	
	  return (
	    // Router enables page navigation
	    <BrowserRouter>
	
	      {/* Navbar will be visible on all pages */}
	      <Navbar />
        	
	      {/* Routes define different pages */}
	      <Routes>
	        {/* Home Page */}
	        <Route path="/" element={<Home />} />
	
	        {/* Student List Page (data passed as props) */}
	        <Route path="/students" element={<StudentList students={students} />} />
	
	        {/* Add Student Page (passing state + function) */}
	        <Route 
	          path="/add" 
	          element={<AddStudent students={students}
            setStudents={setStudents}/>} 
          />
        </Routes>
      </BrowserRouter>
    );
}
export default App;
