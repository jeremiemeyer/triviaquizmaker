import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuizQuestionResult from '@/components/results/QuizQuestionResult';
import useQuizData from '@/hooks/useQuizData';

export default function Results() {
  const { isReadyToSubmit, quizData, resetQuizData, quizScore } = useQuizData();
  const [scoreBgColor, setScoreBgColor] = useState('');

  useEffect(() => {
    setScoreBgColor(
      quizScore <= 1
        ? 'bg-red-500'
        : quizScore <= 3
        ? 'bg-yellow-500'
        : 'bg-green-500'
    );
  }, [quizScore]);

  return (
    <>
      {!isReadyToSubmit ? (
        <p>
          You can't see results now. Complete your quiz or start a new one.{' '}
          <Link to="/">
            <span className="underline hover:text-blue-600">
              Go back to quiz page.
            </span>
          </Link>
        </p>
      ) : (
        <>
          {quizData.map((question, index) => (
            <QuizQuestionResult key={index} questionData={question} />
          ))}
          <div className="flex flex-col">
            <span className={`text-white mt-12 p-2 ${scoreBgColor}`}>
              You scored {quizScore} out of 5
            </span>
            <Link to="/" onClick={resetQuizData}>
              <button className="mt-6 bg-gray-600 hover:bg-gray-500 rounded-md p-2 text-white">
                Create new quiz
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
