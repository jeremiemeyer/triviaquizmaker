export default function calculateQuizScore(quizData) {
  let score = 0;

  quizData.forEach((question) => {
    const selectedAnswer = question.answers_options.find(
      (answer) => answer.isSelected
    );

    if (selectedAnswer && selectedAnswer.isCorrect) {
      score += 1;
    }
  });

  return score;
}
