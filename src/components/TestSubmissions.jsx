import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../firebase"; // apna firebase config import karein

const TestSubmissions = () => {
  const [grade, setGrade] = useState(null); // Default grade
  const [submissions, setSubmissions] = useState([]);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      const db = getFirestore(app)
      try {
        // const q = query(
        //   collection(db, "test-submissions"),
        //   where("grade", "==", grade)
        // );
        const q = collection(db, 'test submissions')
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        if(grade){
          const filterData = (data.filter((submission) => submission.class === grade))
          setSubmissions(filterData)
        } else {
          setSubmissions(data);
        }

      } catch (error) {
        console.error("Error fetching test submissions: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [grade]); // Re-fetch whenever grade changes

  const handleGrade = (id) => {
    console.log(id)
    console.log(submissions)
  }

  return (
    <div className="p-4 ml-[40%]">
      <h1 className="text-xl  font-bold mb-4">Test Submissions</h1>

      {/* Grade Selector */}
      <div className="mb-4">
        <label htmlFor="grade" className="block text-sm font-medium">
          Select Grade:
        </label>
        <select
          id="grade"
          value={grade}
          onChange={(e) => {
            setGrade(e.target.value)
            handleGrade(e.target.value)
          }}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        >
          <option value=''>All Submissions</option>
          <option value="Grade-9">Grade 9</option>
          <option value="Grade-10">Grade 10</option>
          <option value="Grade-11">Grade 11</option>
          <option value="Grade-12">Grade 12</option>
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <p>Loading submissions...</p>
      ) : submissions.length === 0 ? (
        <p>No submissions found for {grade}.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {submissions.map((submission) => (
            <div
              key={submission.userId}
              className="border p-4 rounded shadow-sm hover:shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2">
                {submission.studentName}
              </h2>
              <p className="text-sm">Grade: {submission.class}</p>
              <p className="text-sm">Subject: {submission.subject}</p>
              <p className="text-sm">Answer: {Object.values(submission.student_answers).map(( val, i) => <span className="ml-2">{i + 1 + ": " + val}</span>)}</p>
              <p className="text-sm">Total Marks: {submission.studentResult}</p>
              <p className="text-sm">Date: {new Date(submission.timestamp.seconds * 1000).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestSubmissions;
