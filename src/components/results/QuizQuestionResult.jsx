export default function QuizQuestionResult({ questionData }) {
  return (
    <div className="py-4">
      <p className="pb-4 text-left">{questionData.question}</p>
      <div className="space-x-2 flex justify-center">
        {questionData.answers_options.map((answerOption, index) => (
          <span
            key={index}
            className={`border border-blue-600 p-2 rounded-md text-blue-600 flex items-center ${
              answerOption.isSelected &&
              !answerOption.isCorrect &&
              'bg-red-600 text-white'
            } ${answerOption.isCorrect && 'bg-green-600 text-white'}`}
          >
            {answerOption.answer}
          </span>
        ))}
      </div>
    </div>
  );
}
