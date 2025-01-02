import React from 'react';

const WelcomeDashboard = () => {
  return (
    <div className="min-h-screen w-[80%] ml-[20%] flex bg-gradient-to-br from-gray-900 to-indigo-800">
     
      {/* Right Main Area */}
      <div className="w-[100%] p-6 space-y-8">
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-extrabold text-white text-center mb-4">Welcome Back, Sir!</h2>
          <p className="text-lg text-white text-center">
            We’re glad to see you again. Let’s manage your dashboard and take action.
          </p>
          <div className="flex justify-center items-center space-x-6 mt-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-xl text-white text-lg font-semibold cursor-pointer transform transition-transform hover:scale-110">
              Manage Students
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-3 rounded-xl shadow-xl text-white text-lg font-semibold cursor-pointer transform transition-transform hover:scale-110">
              View Reports
            </div>
          </div>
        </div>

        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-extrabold text-white text-center mb-4">Activity Summary</h2>
          <p className="text-lg text-white text-center">
            Here’s a quick overview of your recent activities.
          </p>
          {/* Placeholder for activity summary */}
          <div className="bg-gray-800/40 p-6 rounded-xl text-center text-white mt-6">
            <p>Recent Activities will be displayed here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDashboard;
