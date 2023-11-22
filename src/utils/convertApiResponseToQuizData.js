// this utility function formats the api response containing the questions to a more convenient data structure that will: hold the quiz's questions and user answers, making it simpler to show the results on the results page

export default function convertApiResponseToQuizData(responseData) {
  return responseData.map((questionData) => {
    const { question, correct_answer, incorrect_answers } = questionData;

    const allAnswers = [correct_answer, ...incorrect_answers].sort(
      () => Math.random() - 0.5
    );

    const transformedQuestion = {
      question,
      answers_options: allAnswers.map((answer) => ({
        answer,
        isCorrect: answer === correct_answer,
        isSelected: false,
      })),
    };

    return transformedQuestion;
  });
}
