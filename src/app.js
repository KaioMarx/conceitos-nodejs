const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.status(200).json(repositories)
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return res.status(200).json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repository = repositories.findIndex(repo => repo.id === id);

  if (repository < 0) {
    return res.status(400).send();
  }

  repositories[repository] = {
    id,
    title,
    url,
    techs,
    likes: repositories[repository].likes,
  };

  return res.status(200).json(repositories[repository]);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0) {
    return res.status(400).send();
  }

  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repository = repositories.find(repo => repo.id === id);

  if (!(repository)) {
    return res.status(400).send();
  }

  repository.likes += 1;

  return res.json(repository);
});

module.exports = app;
