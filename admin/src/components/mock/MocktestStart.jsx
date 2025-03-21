import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MockTestStart = () => {
  const { mockTestId } = useParams();
  const navigate = useNavigate();
  const [mockTest, setMockTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMockTest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/mock-test/${mockTestId}`
        );
        const test = response.data.data;
        setMockTest(test);
        setTimeRemaining(test.duration * 60);
      } catch (error) {
        console.error('Error fetching mock test:', error);
      }
    };

    fetchMockTest();
  }, [mockTestId]);

  useEffect(() => {
    if (timeRemaining === null) return;

    if (timeRemaining === 0) {
      alert('Time is up! Test will be submitted.');
      handleSubmitTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = async () => {
    if (!userName || !userPhone) {
      setError('Please enter both name and phone number.');
      return;
    }

    setError('');
    setIsModalOpen(false);
    await handleSubmitTest();
  };

  const handleSubmitTest = async () => {
    try {
      const result = {
        mockTestId,
        answers,
        userName,
        userPhone,
      };
  
      const response = await axios.post(
        'http://localhost:8081/api/mock-test/submit',
        result
      );
  
      const { score, correctAnswers, wrongAnswers, totalQuestions } = response.data.result;
  
      alert(`Test submitted successfully! 
        Score: ${score}
        Correct Answers: ${correctAnswers}
        Wrong Answers: ${wrongAnswers}
        Total Questions: ${totalQuestions}`);
      
      navigate(`/dashboard/result/${response.data.result._id}`);
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('Error submitting test. Please try again.');
    }
  };
  

  if (!mockTest) {
    return <div>Loading...</div>;
  }

  if (!mockTest.questions || mockTest.questions.length === 0) {
    return <div>No questions available for this test.</div>;
  }

  const currentQuestion = mockTest.questions[currentQuestionIndex];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Start Test: {mockTest.title}
      </h1>
      <div className="text-right text-xl font-semibold text-red-600 mb-4">
        Time Remaining: {formatTime(timeRemaining)}
      </div>

      <div className="p-6 border rounded shadow-sm bg-white">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            {currentQuestion.questionId.questionText}
          </h3>
          {currentQuestion.questionId.options &&
          currentQuestion.questionId.options.length > 0 ? (
            currentQuestion.questionId.options.map((option, index) => (
              <div key={index} className="mt-2">
                <input
                  type="radio"
                  id={`option-${option._id}`}
                  name={`question-${currentQuestion.questionId._id}`}
                  value={option._id}
                  checked={
                    answers[currentQuestion.questionId._id] === option._id
                  }
                  onChange={() =>
                    handleAnswerChange(
                      currentQuestion.questionId._id,
                      option._id
                    )
                  }
                />
                <label htmlFor={`option-${option._id}`} className="ml-2">
                  {option.optionText}
                </label>
              </div>
            ))
          ) : (
            <p>No options available for this question.</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={handleOpenModal}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === mockTest.questions.length - 1}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Enter your details</h2>
            {error && <p className="text-red-600">{error}</p>}
            <div className="mb-4">
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Phone Number:</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockTestStart;
