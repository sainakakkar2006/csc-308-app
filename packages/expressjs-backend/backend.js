import express from "express";
import cors from "cors";
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
const users = [
  { id: "123", name: "Mack", job: "Director" },
  { id: "124", name: "Cindy", job: "Manager" },
  { id: "125", name: "Cathy", job: "Accountant" },
  { id: "126", name: "Dannie", job: "Bartender" },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  const matchingUsers = users.filter(
    (user) => (!name || user.name === name) && (!job || user.job === job),
  );

  res.json(matchingUsers);
});
app.post("/users", (req, res) => {
  const newUser = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name: req.body.name,
    job: req.body.job,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((currentUser) => currentUser.id === req.params.id);

  if (!user) {
    return res.status(404).send("User not found.");
  }

  return res.json(user);
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
