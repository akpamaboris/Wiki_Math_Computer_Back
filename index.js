// import packacages
const express = require("express");
const mongoose = require("mongoose");

//import the models
const KnowledgeNugget = require("./Models/knowledgenugget");

//initialise express
const app = express();

mongoose.connect("mongodb://localhost:27017/wikimathcomputer");

app.get("/", (req, res) => {
  console.log(KnowledgeNugget);
  res.json({ message: "working" });
});

app.post("/create", async (req, res) => {
  console.log("route : /create");
  try {
    const newKnowledgeNugget = new KnowledgeNugget({
      name: "combinatorics",
      definition:
        "the branch of mathematics concerned with the number of different arrangements of given objects subject to various restrictions",
    });
    await newKnowledgeNugget.save();

    res.json({ message: "new knowledgenugget created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(8000, function () {
  console.log("now working");
});
