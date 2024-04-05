import { SingleEntry } from "./PhoneBook";

import personService from "../persons";

const Entry = ({ data, deleteCallback } :
  { data: SingleEntry, deleteCallback: (arg: string) => void }) => {

  const handleDelete = () => {
    if (!confirm(`Do you wish to delete ${data.name}?`)) return;
    personService.deleteEntry(data.id);
    deleteCallback(data.id);
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button> { data.name }: { data.number }
    </div>
  )
};

export default Entry;
