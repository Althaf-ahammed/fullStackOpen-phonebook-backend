require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/phonebook");

const app = express();

app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));

app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

app.get("/info", (requset, response) => {
  response.send(
    `Phonebook has info of ${phonebooks.length} people <br> <br> ${Date()}`
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((result) => response.json(result))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  // if (!body.name) {
  //   return response.status(400).json({ error: "name field is required" });
  // }

  // if (!body.number) {
  //   return response.status(400).json({ error: "number field is required" });
  // }

  // const nameExit = phonebooks.some((phonebook) => phonebook.name === body.name);
  // if (nameExit) {
  //   return response.status(400).json({ error: "name must be unique" });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  const person = { name: request.body.name, number: request.body.number };

  Person.findByIdAndUpdate(id, person, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`);
});
