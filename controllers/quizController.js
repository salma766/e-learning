import quizService from "../services/quizService.js";

async function index(req, res, next) {
  try {
    const quizzes = await quizService.getAllQuizzes();
    return res.json(quizzes);
  } catch (error) {
    return res.json({ message: "error" });
  }
}

async function show(req, res, next) {
  const id = req.params.id;
  try {
    const quiz = await quizService.getQuizById(id);
    if (!quiz) {
      return res.status(404).send({ status: 404, message: "Quiz not found" });
    }
    return res.json(quiz);
  } catch (error) {
    return res.json({ message: "error" });
  }
}

async function create(req, res, next) {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const quiz = await quizService.createQuiz(title, description, userId);
    return res.status(201).send({
      status: 201,
      message: "Quiz created successfully",
      data: quiz,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "error" });
  }
}

async function update(req, res, next) {
  const id = req.params.id;
  const { title, description } = req.body;

  try {
    const updatedQuiz = await quizService.updateQuiz(id, title, description);
    if (!updatedQuiz) {
      return res.status(404).send({ status: 404, message: "Quiz not found" });
    }
    return res.json(updatedQuiz);
  } catch (error) {
    return res.json({ message: "error" });
  }
}

async function destroy(req, res, next) {
  const id = req.params.id;
  try {
    const deletedQuiz = await quizService.deleteQuiz(id);
    if (!deletedQuiz) {
      return res.status(404).send({ status: 404, message: "Quiz not found" });
    }
    return res.send({
      status: 200,
      message: "Quiz deleted successfully",
      data: deletedQuiz,
    });
  } catch (error) {
    return res.json({ message: "error" });
  }
}

export default {
  index,
  show,
  create,
  update,
  destroy,
};
