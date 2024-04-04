import type { Request, Response } from "express";
import express from "express";

import generateInfo from "./info";

const app = express();
app.use(express.json());

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

app.post("/api/persons", (req: Request, res: Response) => {
  console.log(req.body)
  const data = req.body;

  let error = "";
  if (!data?.name) {
    error = "Cannot create entry with missing name";
  } else if (!data?.number) {
    error = "Cannot create entry with missing number";
  } else if (persons.find(p => p.name === data.name)) {
    error = `Person with name "${data.name}" already exists`;
  } else if (persons.find(p => p.number === data.number)) {
    error = `Number ${data.number} already exists`;
  }

  if (error === "") {
    const newPerson = {
      id: Math.floor(1e9 * Math.random()),
      name: data.name,
      number: data.number,
    };
  
    persons = persons.concat(newPerson);
    res.json(newPerson);
  } else {
    res.status(400).json({ error });
  }
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

app.delete("/api/persons/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
