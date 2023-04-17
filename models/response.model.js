const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema:
const ResponseSchema = new Schema({
  description: { type: String, required: true },
  correct: { type: Boolean, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
});

module.exports = Response = mongoose.model("response", ResponseSchema);
