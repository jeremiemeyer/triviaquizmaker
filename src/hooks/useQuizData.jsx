import { useContext } from 'react';
import QuizDataContext from '@/context/QuizDataProvider';

export default function useQuizData() {
  const context = useContext(QuizDataContext);
  return context;
}
