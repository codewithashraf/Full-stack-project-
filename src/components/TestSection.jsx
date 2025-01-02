// Import necessary dependencies
import React, { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";

const TestSection = ({ user }) => {
  const [submittest, setSubmitTest] = useState(null);
  const [test, setTest] = useState([]);
  const [result, setResult] = useState({});
  const [answers, setAnswers] = useState({});
  const [calculateResult, setCalculateResult] = useState(0);

  const firestoreDb = getFirestore(app);
  const studentRef = doc(firestoreDb, "test submissions", user.userName);
  const classRef = doc(firestoreDb, "tests", user.class);

  const fetchTest = () => {
    
    let status = false
    const unsubscribeStudent = onSnapshot(studentRef, (docSnap) => {
     
      if (docSnap.exists() && docSnap.data().status === "submitted") {
        setSubmitTest(true);
        status = true
      } else {
        setSubmitTest(false);
      }
      
    });

    const unsubscribeClass = onSnapshot(classRef, (docSnap) => {
      const testData = docSnap.data();

      if (testData && testData.status.toLowerCase() === "active") {
        setTest(testData.questions || []); 
      } else {
        setTest([]);
        setSubmitTest(null);
      }
    });

    return () => {
      unsubscribeStudent();
      unsubscribeClass();
    };
  };

  useEffect(() => {
    console.log('chal rha hai')
    const unsubscribe = fetchTest();
    return () => unsubscribe();
  }, [submittest]);

  const handleAnswer = (questionIndex, answer, question) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
    setResult((prev) => ({ ...prev, [questionIndex]: question.correctAnswer }));
  };

  const handleSubmit = async () => {
    let score = 0;
    Object.keys(answers).forEach((key) => {
      if (answers[key] === result[key]) {
        score += 5;
      }
    });
    setCalculateResult(score);

    try {
      await setDoc(studentRef, {
        student_answers: answers,
        userId: user.userUid,
        class: user.class,
        timestamp: new Date(),
        studentName: user.userName,
        status: "submitted",
        studentResult: score,
      });
      setSubmitTest(true);
      setTest([]);
    } catch (error) {
      console.error("Error submitting test: ", error);
    }
  };
console.log(submittest)
  return (
    <div className="p-6 bg-gray-200 h-[fit-content]">
      <h1 className="text-2xl font-bold mb-4 text-center">Test Section</h1>

      {submittest === null ? (
        <p className="text-center text-gray-500">No test available at the moment.</p>
      ) : submittest === true ? (
        <p className="text-center text-green-600 font-medium">Congratulations! You have submitted the test.</p>
      ) : (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Attempt the Test</h2>
          {test.map((q, index) => (
            <div key={index} className="p-4 bg-white shadow-md rounded-lg">
              <p className="font-medium mb-2">{index + 1}. {q.question}</p>
              <div className="space-y-2">
                {q.options.map((option, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleAnswer(index, option, q)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          {test.length && Object.keys(answers).length === test.length && (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TestSection;
