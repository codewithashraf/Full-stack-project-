// Import necessary dependencies
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const CreatedTests = () => {
    const navigate = useNavigate()
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  // Fetch tests from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tests"), (snapshot) => {
      const fetchedTests = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(fetchedTests.forEach((test) => console.log(test.questions.length)))
      setTests(fetchedTests);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Delete a test
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      await deleteDoc(doc(db, "tests", id));
    } else {
      console.log(id);
    }
  };

  // Update a test
  const handleUpdate = async (id) => {
    const newStatus = prompt("Enter new status (e.g., Active/Inactive):");
    if (newStatus) {
      await updateDoc(doc(db, "tests", id), { status: newStatus }).then((res) =>
        console.log("change hogaya")
      );
    }
  };

  // update test for 
  const handleUpdateTest = (id) => {
    const testData = tests.filter((test) => test.id === id)
    navigate('/dashboard/UpdateTest', {state: testData})
  }

  return (
    <div className="p-6 w-full ml-[20%] h-[fit-content] min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-4xl font-bold text-indigo-100 mb-8 underline text-center">Created Tests</h1>

      {loading ? (
        <p className="text-center">Loading tests...</p>
      ) : (
        <div className="grid gap-4 ">
          {tests.map((test) => (
            <div
              key={test.id}
              className="relative p-4 bg-white/20 text-white placeholder-white rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none shadow-xl"
            >
              <h2 className="text-xl capitalize font-bold mb-2">
                Class: <span className="font-medium capitalize text-indigo-100">
                  {test.id}
                </span>
              </h2>
              <h2 className="text-xl capitalize font-bold mb-2">
                subject: <span className="font-medium capitalize text-indigo-100">
                  {test.subject}
                </span>
              </h2>
              <p className="font-bold">
                Status:{" "}
                <span className="font-medium capitalize text-indigo-100">
                  {test.status}
                </span>
              </p>
              <p className="font-bold">
                Total Questions:{" "}
                <span className="font-medium capitalize text-indigo-100">
                  {test.questions.length}
                </span>
              </p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleUpdate(test.id)}
                  className="px-4 py-2 font-bold bg-gray-900 text-white rounded-xl hover:bg-gray-500"
                >
                  Change Status
                </button>
                <button
                  onClick={() => handleDelete(test.id)}
                  className="px-4 py-2 font-bold bg-gray-500 text-white rounded-xl hover:bg-gray-900"
                >
                  Delete
                </button>
                <button
                  className="p-2 bg-gray-900 absolute top-4 right-4 rounded-full"
                  title="Update test"
                  onClick={() => handleUpdateTest(test.id)}
                >
                  ✎
                </button>
              </div>
            </div>
          ))}

          {tests.length === 0 && (
            <p className="text-center text-gray-600">No tests found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedTests;
