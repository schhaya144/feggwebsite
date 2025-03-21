import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Mockresult = () => {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/result/${resultId}`);
        setResult(response.data.result);
      } catch (error) {
        console.error('Error fetching result:', error);
      }
    };

    fetchResult();
  }, [resultId]);

  if (!result) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-red-600 p-4">
          <h1 className="text-3xl font-bold text-white text-center">Test Results</h1>
        </div>
        <div className="p-6">
          <p className="text-lg mb-2">
            <span className="font-semibold text-gray-700">Name:</span> {result.userName}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold text-gray-700">Phone:</span> {result.userPhone}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold text-gray-700">Score:</span> {result.score}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold text-gray-700">Correct Answers:</span> {result.correctAnswers}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold text-gray-700">Wrong Answers:</span> {result.wrongAnswers}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold text-gray-700">Total Questions:</span> {result.totalQuestions}
          </p>
        </div>
        <div className="bg-gray-100 p-4 text-center">
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mockresult;
