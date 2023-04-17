import Quiz from "../models/quiz.model.js";

async function getAllQuizzes() {
  return Quiz.find().populate("user", "_id username");
}

async function getQuizById(id) {
  return Quiz.findById(id).populate("user", "_id username");
}

async function createQuiz(title, description, userId) {
  const quiz = new Quiz({ title, description, user: userId });
  return quiz.save();
}

async function updateQuiz(id, title, description) {
  return Quiz.findByIdAndUpdate(id, { title, description }, { new: true });
}

async function deleteQuiz(id) {
  return Quiz.findByIdAndDelete(id);
}

export default {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};
