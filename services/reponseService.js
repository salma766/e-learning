import Response from "../models/response.model.js";

async function getAllResponses() {
  return Response.find().populate("question", "_id description");
}

async function getResponseById(id) {
  return Response.findById(id).populate("question", "_id description");
}

async function createResponse(description, correct, questionId) {
  const response = new Response({ description, correct, question: questionId });
  return response.save();
}

async function updateResponse(id, description, correct) {
  return Response.findByIdAndUpdate(
    id,
    { description, correct },
    { new: true }
  );
}

async function deleteResponse(id) {
  return Response.findByIdAndDelete(id);
}

export default {
  getAllResponses,
  getResponseById,
  createResponse,
  updateResponse,
  deleteResponse,
};
