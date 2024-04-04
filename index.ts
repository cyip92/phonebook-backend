import type { Request, Response } from "express";
import express from "express";

import generateInfo from "./info";

const app = express();

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get("/info", (req: Request, res: Response) => {
  res.send(generateInfo(persons));
});

app.get("/api/persons", (req: Request, res: Response) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const foundPerson = persons.find(p => id === p.id);

  if (foundPerson) {
    res.json(foundPerson);
  } else {
    res.status(404).end();
  }
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
