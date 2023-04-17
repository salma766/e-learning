import Question from "../models/question.model.js";

async function getAllQuestions() {
  return Question.find().populate("quiz", "_id title");
}

async function getQuestionById(id) {
  return Question.findById(id).populate("quiz", "_id title");
}

async function createQuestion(description, quizId) {
  const question = new Question({ description, quiz: quizId });
  return question.save();
}

async function updateQuestion(id, description) {
  return Question.findByIdAndUpdate(id, { description }, { new: true });
}

async function deleteQuestion(id) {
  return Question.findByIdAndDelete(id);
}

export default {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
