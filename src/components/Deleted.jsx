import React from "react";

const AccountStatus = ({ user }) => {
  console.log(user)
  // Message and Tailwind styles based on status
  const getStatusStyles = () => {
    if (user.status === "deleted") {
      return {
        message: "Your account has been deleted.",
        textColor: "text-red-600",
        bgGradient: "bg-gradient-to-r from-red-500 to-red-700",
        icon: "❌",
      };
    } else if (user.status === "suspend") {
      return {
        message: "Your account has been suspended.",
        textColor: "text-orange-600",
        bgGradient: "bg-gradient-to-r from-orange-500 to-orange-700",
        icon: "⚠️",
      };
    } else {
      return {
        message: "Unknown account status.",
        textColor: "text-gray-600",
        bgGradient: "bg-gradient-to-r from-gray-500 to-gray-700",
        icon: "❓",
      };
    }
  };

  const { message, textColor, bgGradient, icon } = getStatusStyles();

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${bgGradient} text-white p-8`}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-xl transform transition-all hover:scale-105 flex flex-col items-center"
      >
        <div
          className={`text-6xl ${textColor} mb-4 animate-pulse`}
        >
          {icon}
        </div>
        <h1
          className={`text-3xl font-bold mb-2 ${textColor}`}
        >
          {message}
        </h1>
        <p className="text-gray-700 text-center max-w-md">
          If you think this is a mistake, please contact support for assistance.
        </p>
      </div>
    </div>
  );
};

export default AccountStatus;
