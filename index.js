const express = require("express");
const app = express();

const phonebooks = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(phonebooks);
});

app.get("/info", (requset, response) => {
  response.send(
    `Phonebook has info of ${phonebooks.length} people <br> <br> ${Date()}`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = phonebooks.filter((Phonebook) => Phonebook.id === id);
  if (person.length === 0) {
    return response.status(404).json({ error: "404 Not Found" });
  }
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const persons = phonebooks.filter((phonebook) => phonebook.id != id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`);
});
