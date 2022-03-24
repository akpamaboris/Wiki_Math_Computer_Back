// import packacages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const formidableMiddleware = require("express-formidable");

//import the models
const KnowledgeNugget = require("./Models/knowledgenugget");

//initialise express
const app = express();

//initialise cors
app.use(cors());
//initialise formidable Middleware
app.use(formidableMiddleware());
//initialse dotenv
require("dotenv").config(); // Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`

mongoose.connect(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  console.log(KnowledgeNugget);
  res.json({ message: "working" });
});

app.get("/getinitialknowledge", async (req, res) => {
  try {
    const initialKnowledgeNugget = await KnowledgeNugget.find().limit(4);
    res.json(initialKnowledgeNugget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/specificknowledge", async (req, res) => {
  try {
    const s = req.query.name;
    const regex = new RegExp(s, "i");
    console.log(req.query.name);
    const initialKnowledgeNugget = await KnowledgeNugget.find({
      name: { $regex: regex },
    });
    res.status(200).json(initialKnowledgeNugget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// app.post("/create", async (req, res) => {
//   console.log("route : /create");
//   try {
//     const newKnowledgeNugget = new KnowledgeNugget({
//       name: "combinatorics",
//       definition:
//         "the branch of mathematics concerned with the number of different arrangements of given objects subject to various restrictions",
//     });
//     await newKnowledgeNugget.save();

//     res.json({ message: "new knowledgenugget created successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

app.listen(process.env.PORT, function () {
  console.log("now working");
});
