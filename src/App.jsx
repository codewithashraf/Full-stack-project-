import Dashboard from "./components/Dashboard";


const App = () => {
  return (
    // <div className="flex h-screen">
    //   {/* Left Sidebar */}

    //   <div className="min-h-screen w-[20%] fixed  flex bg-gradient-to-br from-gray-900 to-indigo-800">
    //     {/* Left Sidebar */}
    //     <div className="w-[100%] bg-white/10 backdrop-blur-lg border-r border-white/20 p-6">
    //       <h2 className="text-2xl font-bold text-white mb-8">
    //         <Link to={'/dashboard'}>Dashboard</Link>
    //       </h2>
    //       <ul className="space-y-6">
    //         <li className="text-white hover:text-blue-400 cursor-pointer transition-transform transform hover:scale-105">
    //           <Link to="/dashboard/StudentList">Students List</Link>
    //         </li>
    //         <li className="text-white hover:text-blue-400 cursor-pointer transition-transform transform hover:scale-105">
    //           <Link to="/dashboard/Notification">Notification</Link>
    //         </li>
    //         <li className="text-white hover:text-blue-400 cursor-pointer transition-transform transform hover:scale-105">
    //           <Link to="/dashboard/AddMaterial">Add learning Material</Link>
    //         </li>
    //         <li className="text-white hover:text-blue-400 cursor-pointer transition-transform transform hover:scale-105">
    //           <Link to="/dashboard/AllMateirals">All Materials</Link>
    //         </li>
    //         <li className="text-white hover:text-blue-400 cursor-pointer transition-transform transform hover:scale-105">
    //           <Link to="/dashboard/CreateTests">Create Tests</Link>
    //         </li>
    //         <li className="text-white hover:text-blue-400 cursor-pointer transition-transform transform hover:scale-105">
    //           <Link to="/dashboard/CreatedTests">Created Tests</Link>
    //         </li>
    //         <li className="text-white hover:text-blue-400 cursor-pointer transition-transform transform hover:scale-105">
    //           <Link to="/dashboard/TestSubmissions">Test Submissions</Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    
    <Dashboard/>
    
  );
};

export default App;
