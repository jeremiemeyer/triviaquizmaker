import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuizQuestion from './QuizQuestion';
import useQuizData from '@/hooks/useQuizData';
import spinner from '@/assets/spinner.svg';

export default function Quiz() {
  const { quizData, isReadyToSubmit, isLoading } = useQuizData();

  useEffect(() => {
    console.log('consolelog', isReadyToSubmit);
  }, [isReadyToSubmit]);

  return (
    <>
      {isLoading === null ? (
        <div className="pt-4">
          💡 To start a quiz, please select a category, a difficulty level and
          click the 'Create' button.
        </div>
      ) : isLoading === true ? (
        <img src={spinner} className="flex justify-center mx-auto" />
      ) : (
        <div className="mt-12">
          {quizData.map((question, index) => (
            <QuizQuestion key={index} questionData={question} />
          ))}

          {isReadyToSubmit && (
            <>
              <button className="mt-12 bg-blue-600 hover:bg-blue-500 rounded-md p-2 text-white">
                <Link to="results">Submit</Link>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
