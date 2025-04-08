import { useEffect, useState } from "react";
import { app, firestoreDb } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

const Notification = () => {
  const [pendingData, setPendingData] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // firestore database say data le rhe hain
    const firestoreUsersRef = collection(firestoreDb, "users");
    const unSubscribe = onSnapshot(firestoreUsersRef, (snapShot) => {
      const pendingUsers = snapShot.docs
        .filter((doc) => doc.data().status === "pending")
        .map((doc) => doc.data());
      const notification = Object.entries(pendingUsers);
      console.log(notification);
      setPendingData(notification);
    });
    return () => unSubscribe();
  }, []);

  const handleNotificationClick = (key) => {
    setSelectedNotification(key);
  };

  return (
    <div
      className=" h-screen w-full flex flex-col items-center gap-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
      onClick={(e) => {
        setSelectedNotification(null);
      }}
    >
      <h1 className="text-4xl text-center mt-8 mb-8 font-bold text-indigo-100">
        Notifications
      </h1>

      {/* Notifications List */}
      <div className="max-h-[80vh] w-[80%] overflow-y-auto space-y-4 ">
        {pendingData.length !== 0 &&
          pendingData.map(([key, val]) => (
            <div
              key={key}
              className={`p-6 max-sm:p-2 w-full h-auto rounded-lg shadow-lg cursor-pointer transition-all duration-500  transform ${
                selectedNotification === key
                  ? "bg-gray-900 text-gray-200"
                  : "bg-white/20"
              } backdrop-blur-sm bg-opacity-50`}
              onClick={(e) => {
                e.stopPropagation();
                handleNotificationClick(key);
              }}
            >
              {selectedNotification !== key && (
                <h3 className="font-semibold text-center text-xl max-sm:text-sm">
                  {val.userName} is waiting for approval.
                </h3>
              )}

              {/* Detailed View on Click */}
              {selectedNotification === key && (
                <div className="p-4 bg-gray-800 bg-opacity-70 rounded-md shadow-xl">
                  <h4 className="font-bold text-lg text-indigo-300">
                    Notification Details:
                  </h4>
                  <div className="w-full flex items-center justify-between">
                    <p className="text-gray-300 max-sm:text-sm mt-2">
                      Details about {val.userName}'s request...
                    </p>
                    <button
                      className="py-2 text-center px-3 w-fit h-fit max-sm:text-sm bg-gray-500 font-bold rounded-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/dashboard/AddStudent", { state: val });
                      }}
                    >
                      Approved
                    </button>
                  </div>
                  {/* Add more details if needed */}
                </div>
              )}
            </div>
          ))}
        {pendingData.length === 0 && (
          <h1 className=" capitalize text-white text-2xl text-center ">
            No notification found...........
          </h1>
        )}
      </div>
    </div>
  );
};

export default Notification;
