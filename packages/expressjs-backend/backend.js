import express from "express";
import cors from "cors";
import {
  getUsers,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  findUserById,
  addUser,
  deleteUserById,
} from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  let userQuery;

  if (name && job) {
    userQuery = findUserByNameAndJob(name, job);
  } else if (name) {
    userQuery = findUserByName(name);
  } else if (job) {
    userQuery = findUserByJob(job);
  } else {
    userQuery = getUsers();
  }

  userQuery
    .then((users) => res.json(users))
    .catch((error) => {
      console.error(error);
      res.status(500).send("Unable to retrieve users.");
    });
});

app.post("/users", (req, res) => {
  addUser(req.body)
    .then((user) => res.status(201).json(user))
    .catch((error) => {
      console.error(error);
      res.status(400).send("Unable to create user.");
    });
});

app.delete("/users/:id", (req, res) => {
  deleteUserById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found.");
      }

      return res.status(204).send();
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("Unable to delete user.");
    });
});

app.get("/users/:id", (req, res) => {
  findUserById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found.");
      }

      return res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("Unable to retrieve user.");
    });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});