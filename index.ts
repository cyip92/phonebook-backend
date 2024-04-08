import "dotenv/config.js";
import type { Request, Response, NextFunction } from "express";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import generateInfo from "./info";
import Person from "./models/person";

// This is used to display raw data for HTTP requests as per exercise 3.8
// It"s bad practice to do this in general because of security reasons
morgan.token("sensitiveData", function (req: Request) {
  return req.sensitiveData;
});
function getData(req: Request, res: Response, next: NextFunction) {
  // The id is created on MongoDB now, so we want to remove it from the morgan logging
  const filteredData = { ...req.body };
  filteredData.id = undefined;
  req.sensitiveData = JSON.stringify(filteredData);
  next();
}

// Add all middleware
const app = express();
app.use(express.json());
app.use(express.static("dist"));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :sensitiveData"));
app.use(getData);
app.use(cors());

app.get("/info", (req: Request, res: Response) => {
  Person.find({}).then(entries => {
    res.send(generateInfo(entries));
  });
});

app.get("/api/persons", (req: Request, res: Response) => {
  Person.find({}).then(entries => {
    res.json(entries);
  });
});

app.post("/api/persons", (req: Request, res: Response, next: NextFunction ) => {
  const data = req.body;
  Person.find({}).then(entries => {
    let error = "";
    if (!data?.name) {
      error = "Cannot create entry with missing name";
    } else if (!data?.number) {
      error = "Cannot create entry with missing number";
    } else if (entries.find(p => p.name === data.name)) {
      error = `Person with name "${data.name}" already exists`;
    } else if (entries.find(p => p.number === data.number)) {
      error = `Number ${data.number} already exists`;
    }

    if (error === "") {
      const newPerson = new Person({
        name: data.name,
        number: data.number,
      });
      newPerson
        .save()
        .then(savedNote => { res.json(savedNote) })
        .catch(error => next(error));
    } else {
      res.status(400).json({ error });
    }
  });
});

app.get("/api/persons/:id", (req: Request, res: Response, next: NextFunction ) => {
  Person.findById(req.params.id)
    .then(entry => {
      if (entry) {
        res.json(entry);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error))
});

app.put("/api/persons/:id", (req: Request, res: Response, next: NextFunction ) => {
  const data = req.body;
  const newPerson = {
    name: data.name,
    number: data.number,
  };
  Person.findByIdAndUpdate(req.params.id, newPerson, { new: true, runValidators: true, context: "query" })
    .then(entry => { res.json(entry); })
    .catch(error => next(error))
});

app.delete("/api/persons/:id", (req: Request, res: Response) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => { res.status(204).end(); });
});

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: "Unknown Endpoint" })
};
app.use(unknownEndpoint);

// Error handler must be the last middleware loaded, and must come after all routes
const errorHandler = ( error: Error , req: Request, res: Response, next: NextFunction ) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformed ID" })
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message })
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
