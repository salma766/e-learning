const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
});

module.exports = mongoose.model("Question", QuestionSchema);
