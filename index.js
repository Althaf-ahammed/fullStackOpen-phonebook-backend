const express = require("express");
const morgan = require('morgan')

const app = express();

app.use(express.json());
app.use(morgan('tiny'))

let phonebooks = [
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

const generateId = () => {
  return Math.floor(Math.random() * 1000000).toString();
};

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

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "name field is required" });
  }

  if (!body.number) {
    return response.status(400).json({ error: "number field is required" });
  }

  const nameExit = phonebooks.some((phonebook) => phonebook.name === body.name);
  if (nameExit) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const newPerson = { id: generateId(), name: body.name, number: body.number };

  phonebooks = phonebooks.concat(newPerson);
  response.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`);
});
