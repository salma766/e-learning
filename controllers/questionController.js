import questionService from "../services/questionService.js";

async function index(req, res, next) {
  try {
    const questions = await questionService.getAllQuestions();
    return res.json(questions);
  } catch (error) {
    return res.json({ message: "error" });
  }
}

async function show(req, res, next) {
  const id = req.params.id;
  try {
    const question = await questionService.getQuestionById(id);
    if (!question) {
      return res
        .status(404)
        .send({ status: 404, message: "Question not found" });
    }
    return res.json(question);
  } catch (error) {
    return res.json({ message: "error" });
  }
}

async function create(req, res, next) {
  const { description, quizId } = req.body;

  try {
    const question = await questionService.createQuestion(description, quizId);
    return res.status(201).send({
      status: 201,
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "error" });
  }
}

async function update(req, res, next) {
  const id = req.params.id;
  const { description } = req.body;

  try {
    const updatedQuestion = await questionService.updateQuestion(
      id,
      description
    );
    if (!updatedQuestion) {
      return res
        .status(404)
        .send({ status: 404, message: "Question not found" });
    }
    return res.json(updatedQuestion);
  } catch (error) {
    return res.json({ message: "error" });
  }
}

async function destroy(req, res, next) {
  const id = req.params.id;
  try {
    const deletedQuestion = await questionService.deleteQuestion(id);
    if (!deletedQuestion) {
      return res
        .status(404)
        .send({ status: 404, message: "Question not found" });
    }
    return res.send({
      status: 200,
      message: "Question deleted successfully",
      data: deletedQuestion,
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
