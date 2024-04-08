
type MongoDBEntry = {
  _id: object;
  name: string;
  number: string;
  __v: number;
};

const generateInfo = (persons: Array<MongoDBEntry>) => {
  const count = `Phonebook has info for ${persons.length} ${persons.length === 1 ? "person" : "people"}.`;
  const time = String(new Date());
  return `${count}<br /><br />${time}`;
};

export default generateInfo;
