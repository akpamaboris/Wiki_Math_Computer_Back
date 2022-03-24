const mongoose = require("mongoose");

const KnowledgeNugget = mongoose.model("KnowledgeNugget", {
  name: String,
  definition: String,
});

module.exports = KnowledgeNugget;
