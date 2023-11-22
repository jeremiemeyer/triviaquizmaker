import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import he from 'he';
import convertApiResponseToQuizData from '@/utils/convertApiResponseToQuizData';
import calculateQuizScore from '@/utils/calculateQuizScore';

const QuizDataContext = createContext({});

export const QuizDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [categoryOptions, setCategoryOptions] = useState([]);

  // when isReadyToSubmit is true, the "submit" button shows
  // isReadyToSubmit is true whenever the user has selected one answer for every question
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  const getCategories = async () => {
    try {
      const url = import.meta.env.VITE_CATEGORIES_URL;
      const apiResponse = await axios.get(url);
      const data = apiResponse.data;
      const categories = data.trivia_categories;
      setCategoryOptions(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  async function createQuiz({ selectedOptions }) {
    const API_URL = `https://opentdb.com/api.php?amount=5&category=${selectedOptions.categoryId}&difficulty=${selectedOptions.difficulty}&type=multiple`;

    setIsLoading(true);

    try {
      const apiResponse = await axios.get(API_URL);
      const data = apiResponse.data;
      const results = data.results.map((result) => ({
        ...result,
        question: he.decode(result.question),
        correct_answer: he.decode(result.correct_answer),
        incorrect_answers: result.incorrect_answers.map(he.decode),
      }));
      setQuizData(convertApiResponseToQuizData(results));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(null);
    }
  }

  function resetQuizData() {
    setQuizData([]);
    setIsLoading(null);
  }

  function isQuizReadyToSubmit(quizData) {
    if (!quizData || quizData.length === 0) {
      return false;
    }

    const quizIsReady = quizData.every((question) => {
      const selectedAnswers = question.answers_options.filter(
        (answer) => answer.isSelected
      );
      return selectedAnswers.length === 1;
    });

    return quizIsReady;
  }

  useEffect(() => {
    setIsReadyToSubmit(isQuizReadyToSubmit(quizData));

    setQuizScore(calculateQuizScore(quizData));
  }, [quizData]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <QuizDataContext.Provider
      value={{
        categoryOptions,
        quizData,
        setQuizData,
        createQuiz,
        isReadyToSubmit,
        quizScore,
        resetQuizData,
        isLoading,
      }}
    >
      {children}
    </QuizDataContext.Provider>
  );
};

export default QuizDataContext;
