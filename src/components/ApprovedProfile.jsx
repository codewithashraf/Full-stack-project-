import React, {useState } from "react";
import LearningMaterials from "./LearningMaterials";
import TestSection from "./TestSection";

const ApprovedProfile = ({ user }) => {
  const [activeTab, setActiveTab] = useState("Learning");
  const [userName, setUserName] = useState(user.userName);
  const [userPic, setUserPic] = useState(user.imageUrl);

  // tab active dekhana kai liye
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserPic(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };





  return (
    <div className="h-screen w-full p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ">
    <div className="max-w-4xl mx-auto  p-8 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-2xl rounded-2xl text-white">
      {/* Header */}
      <div className="relative flex items-center justify-between pb-6 border-b border-indigo-200">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={userPic}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-indigo-300 shadow-lg"
            />
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white text-xs rounded-full p-1 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handlePicChange}
                className="hidden"
              />
              ✎
            </label>
          </div>
          <div>
            <input
              type="text"
              value={userName}
              onChange={handleNameChange}
              className="text-3xl font-extrabold bg-transparent border-b-2 border-indigo-400 focus:outline-none focus:border-indigo-200 rounded-md text-white"
            />
            <p className="text-indigo-200 mt-1">
              Your role or designation here
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <div className="flex justify-center space-x-6">
          {[
            { name: "Learning", label: "📘 Learning" },
            { name: "Test", label: "📝 Test" },
            { name: "Custom", label: "✨ Custom Tab" },
          ].map((tab) => (
            <button
              key={tab.name}
              className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-md ${
                activeTab === tab.name
                  ? "bg-white text-indigo-500 shadow-xl"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
              onClick={() => handleTabChange(tab.name)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-8 bg-white text-indigo-900 shadow-lg rounded-lg p-8">
        {activeTab === "Learning" && (
          <LearningMaterials user={user} />
        )}

        {activeTab === "Test" && (
          <TestSection user={user} />
        )}

        {activeTab === "Custom" && (
          <div>
            <h2 className="text-2xl font-bold text-indigo-600">
              Custom Section
            </h2>
            <p className="mt-2">
              You can add your custom content here. Use this section for
              personalized user data.
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ApprovedProfile;
