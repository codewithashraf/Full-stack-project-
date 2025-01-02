import React, { useState } from "react";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const CreateTest = () => {
  const navigate = useNavigate();
  const [grade, setGrade] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [subject, setSubject] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const firestoreDb = getFirestore(app);

  const handleAddOrUpdateQuestion = async () => {
    const newQuestion = {
      question: currentQuestion,
      options,
      correctAnswer,
    };

    let updatedQuestions = [...questions];

    if (currentQuestionIndex !== null) {
      updatedQuestions[currentQuestionIndex] = newQuestion;
    } else {
      updatedQuestions.push(newQuestion);
    }

    setQuestions(updatedQuestions);

    const classRef = doc(firestoreDb, "tests", grade);
    await setDoc(
      classRef,
      {
        questions: updatedQuestions,
        status: "pending",
        subject,
      },
      { merge: true }
    );

    clearInputs();
    setCurrentQuestionIndex(null);
  };

  const handleBack = () => {
    if (currentQuestionIndex !== null) {
      const questionToEdit = questions[currentQuestionIndex];
      setCurrentQuestion(questionToEdit.question);
      setOptions(questionToEdit.options);
      setCorrectAnswer(questionToEdit.correctAnswer);
    } else if (questions.length > 0) {
      setCurrentQuestionIndex(questions.length - 1);
      const questionToEdit = questions[questions.length - 1];
      setCurrentQuestion(questionToEdit.question);
      setOptions(questionToEdit.options);
      setCorrectAnswer(questionToEdit.correctAnswer);
    }
  };

  const handleSelectQuestion = (index) => {
    setCurrentQuestionIndex(index);
    const questionToEdit = questions[index];
    setCurrentQuestion(questionToEdit.question);
    setOptions(questionToEdit.options);
    setCorrectAnswer(questionToEdit.correctAnswer);
  };

  const clearInputs = () => {
    setCurrentQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  const handleSubmit = () => {
    navigate("/dashboard/CreatedTests");
  };

  return (
    <div className="min-h-screen h-[fit-content] w-full ml-[20%] p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ">
      <h1 className="text-3xl font-bold text-indigo-100 mb-6 text-center">
        Create Test
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-indigo-100 font-medium mb-2">
            Grade:
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full px-4 py-3 bg-white/20 text-white placeholder-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none shadow-lg"
          >
            <option value="" hidden className="bg-gray-800 text-white">
              Select Grade
            </option>
            <option value="Grade-9" className="bg-gray-800 text-white">
              Grade 9
            </option>
            <option value="Grade-10" className="bg-gray-800 text-white">
              Grade 10
            </option>
            <option value="Grade-11" className="bg-gray-800 text-white">
              Grade 11
            </option>
            <option value="Grade-12" className="bg-gray-800 text-white">
              Grade 12
            </option>
          </select>
        </div>

        <div>
          <label className="block text-indigo-100 font-medium mb-2">
            Subject:
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Maths, Physics, Chemistry"
            className="w-full px-4 py-3 bg-white/20 text-white placeholder-white rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none shadow-lg"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-indigo-100 font-medium mb-2">
          Question:
        </label>
        <input
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          placeholder="Enter your question here"
          className="w-full px-4 py-3 bg-white/20 text-white placeholder-white rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none shadow-lg"
        />
      </div>

      <div className="mt-6">
        <label className="block text-indigo-100 font-medium mb-2">Options:</label>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) =>
              setOptions(
                options.map((opt, i) => (i === index ? e.target.value : opt))
              )
            }
            placeholder={`Option ${index + 1}`}
            className="w-full px-4 py-3 mb-3 bg-white/20 text-white placeholder-white rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none shadow-lg"
          />
        ))}
      </div>

      <div className="mt-6">
        <label className="block text-indigo-100 font-medium mb-2">
          Correct Answer:
        </label>
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          placeholder="Enter the correct answer"
          className="w-full px-4 py-3 bg-white/20 text-white placeholder-white rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none shadow-lg"
        />
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="px-5 py-3 bg-black text-white font-medium rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Back
        </button>
        <button
          onClick={handleAddOrUpdateQuestion}
          className="px-5 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Next
        </button>
        <button
          onClick={handleSubmit}
          className="px-5 py-3 bg-gray-700 text-white font-medium rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Submit
        </button>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSelectQuestion(index)}
            className="px-4 py-2 bg-gray-300 text-black rounded-full"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CreateTest;
