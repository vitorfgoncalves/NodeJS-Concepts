const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');
const e = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {url,title,techs} = request.body;
  const repository = {
    id : uuid(),
    url,
    title,
    techs,
    likes : 0
  }

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {url,title,techs} = request.body;

  const repositoryIndex = repositories.findIndex(item => {
    return item.id === id
  })
  if(repositoryIndex < 0){
    return response.status(400).json({error : 'Repository not found!'})
  }

  const repository = {...repositories[repositoryIndex],
    id,url,title,techs,likes: repositories[repositoryIndex].likes}

  repositories[repositoryIndex] = repository

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(item => {
    return item.id === id
  })
  if(repositoryIndex < 0){
    return response.status(400).json({error : 'Repository not found!'})
  }
  repositories.splice(repositoryIndex,1);

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(item => {
    return item.id === id
  })

  
  
  if(repositoryIndex < 0){
    return response.status(400).json({error : 'Repository not found!'})
  }else{
    const repository = {...repositories[repositoryIndex],
      likes : repositories[repositoryIndex].likes +1}
      repositories[repositoryIndex] = repository
      
      return response.json(repository)
  }
});

module.exports = app;
