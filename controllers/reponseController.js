import responseService from "../services/responseService.js";

async function index(req, res, next) {
  try {
    const responses = await responseService.getAllResponses();
    return res.json(responses);
  } catch (error) {
    return res.json({ message: "error" });
  }
}

async function show(req, res, next) {
  const id = req.params.id;
  try {
    const response = await responseService.getResponseById(id);
    if (!response) {
      return res
        .status(404)
        .send({ status: 404, message: "Response not found" });
    }
    return res.json(response);
  } catch (error) {
    return res.json({ message: "error" });
  }
}

async function create(req, res, next) {
  const { description, correct, questionId } = req.body;

  try {
    const response = await responseService.createResponse(
      description,
      correct,
      questionId
    );
    return res.status(201).send({
      status: 201,
      message: "Response created successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "error" });
  }
}

async function update(req, res, next) {
  const id = req.params.id;
  const { description, correct } = req.body;

  try {
    const updatedResponse = await responseService.updateResponse(
      id,
      description,
      correct
    );
    if (!updatedResponse) {
      return res
        .status(404)
        .send({ status: 404, message: "Response not found" });
    }
    return res.json(updatedResponse);
  } catch (error) {
    return res.json({ message: "error" });
  }
}

async function destroy(req, res, next) {
  const id = req.params.id;
  try {
    const deletedResponse = await responseService.deleteResponse(id);
    if (!deletedResponse) {
      return res
        .status(404)
        .send({ status: 404, message: "Response not found" });
    }
    return res.send({
      status: 200,
      message: "Response deleted successfully",
      data: deletedResponse,
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
