
type PhoneEntry = { 
  id: number;
  name: string; 
  number: string;
};

const generateInfo = (persons: Array<PhoneEntry>) => {
  const count = `Phonebook has info for ${persons.length} ${persons.length === 1 ? "person" : "people"}.`;
  const time = String(new Date());
  return `${count}<br /><br />${time}`;
};

export default generateInfo;
