import React, { Suspense, useState } from "react";
import { Link, Outlet } from "react-router-dom";


const App = () => {
  console.log(<Outlet />);
  return (
    <div className="flex h-screen">
      {/* Left Sidebar
  <div className="w-1/4 bg-gray-800 text-white p-4 fixed h-screen overflow-y-auto">
    <h1 className="text-3xl text-yellow-300 uppercase font-bold mb-4">Dashboard</h1>
    <div className='flex flex-col gap-4 mt-9'>
      <Link to='/dashboard/AddStudent' className='text-blue-200 text-xl underline font-bold'>Add Student</Link>
      <Link to='/dashboard/StudentList' className='text-blue-200 text-xl underline font-bold'>Student List</Link>
    </div>
  </div> */}

      <div className="min-h-screen w-[20%] fixed  flex bg-gradient-to-br from-gray-900 to-indigo-800">
        {/* Left Sidebar */}
        <div className="w-[100%] bg-white/10 backdrop-blur-lg border-r border-white/20 p-6">
          <h2 className="text-2xl font-bold text-white mb-8">Dashboard</h2>
          <ul className="space-y-6">
            <li className="text-white hover:text-blue-400 cursor-pointer transition-transform transform hover:scale-105">
              <Link to="/dashboard/StudentList">Students List</Link>
            </li>
            <li className="text-white hover:text-blue-400 cursor-pointer transition-transform transform hover:scale-105">
              <Link to="/dashboard/Notification">Notification</Link>
            </li>
            <li className="text-white hover:text-blue-400 cursor-pointer transition-transform transform hover:scale-105">
              <Link to="/dashboard/AddMaterial">Add learning Material</Link>
            </li>
            <li className="text-white hover:text-blue-400 cursor-pointer transition-transform transform hover:scale-105">
              <Link to="/dashboard/AllMateirals">All Materials</Link>
            </li>
            <li className="text-white hover:text-blue-400 cursor-pointer transition-transform transform hover:scale-105">
              <Link to="/dashboard/CreateTests">Create Tests</Link>
            </li>
            <li className="text-white hover:text-blue-400 cursor-pointer transition-transform transform hover:scale-105">
              <Link to="/dashboard/CreatedTests">Created Tests</Link>
            </li>
            <li className="text-white hover:text-blue-400 cursor-pointer transition-transform transform hover:scale-105">
              <Link to="/dashboard/TestSubmissions">Test Submissions</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Data Section */}

      <Suspense fallback={<h1>Loading....</h1>}>{<Outlet />}</Suspense>
    </div>
  );
};

export default App;
