import useQuizData from '@/hooks/useQuizData';

export default function QuizQuestion({ questionData }) {
  const { setQuizData } = useQuizData();

  function handleClick(selectedAnswer) {
    const updatedAnswers = questionData.answers_options.map((answerOption) => ({
      ...answerOption,
      isSelected: answerOption.answer === selectedAnswer,
    }));

    setQuizData((prevQuizData) => {
      return prevQuizData.map((prevQuestionData) => {
        if (prevQuestionData.question === questionData.question) {
          return {
            ...prevQuestionData,
            answers_options: updatedAnswers,
          };
        }
        return prevQuestionData;
      });
    });
  }

  return (
    <div className="py-4">
      <p className="pb-4 text-left">{questionData.question}</p>
      <div className="space-x-2 flex justify-center">
        {questionData.answers_options.map((answerOption, index) => (
          <span
            key={index}
            onClick={() => handleClick(answerOption.answer)}
            className={`border border-blue-600 p-2 rounded-md text-blue-600 hover:cursor-pointer flex-row flex items-center ${
              answerOption.isSelected
                ? 'bg-blue-600 text-white'
                : 'hover:bg-blue-100'
            }`}
          >
            {answerOption.answer}
          </span>
        ))}
      </div>
    </div>
  );
}
