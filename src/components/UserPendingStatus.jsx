import React from "react";

const UserPendingStatus = ({ user }) => {
  console.log(user)
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900 flex items-center justify-center overflow-hidden">
      <div className="relative bg-black/70 backdrop-blur-md shadow-2xl rounded-xl p-8 max-w-md mx-auto transform transition duration-500 hover:scale-105">
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-borderBlur opacity-50 -z-10"></div>
        <h1 className="text-4xl font-extrabold text-white mb-6 tracking-wide animate-glow">
          Welcome, {user.userName}
        </h1>
        <p className="text-pink-400 font-medium">
          Aap ka account abhi management ki taraf say approved nahi howa. Within
          24 hours aap ka account approved ho jaye ga.
        </p>
      </div>
    </div>
  );
};

export default UserPendingStatus;
