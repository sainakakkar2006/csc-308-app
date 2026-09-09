import express from "express";

const app = express();
const port = 8000;

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
