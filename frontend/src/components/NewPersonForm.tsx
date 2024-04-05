import { useState } from "react";

const PhoneForm = ({ submitCallback, modifyCallback, validCheckFn } :
  {
    submitCallback: (name: string, number: string) => void,
    modifyCallback: (name: string, number: string) => void,
    validCheckFn: (arg: string) => boolean
  }) => {

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addNote = ( event: React.FormEvent ) => {
    event.preventDefault();
    if (!validCheckFn(newName)) {
      if (confirm(`Replace ${newName}'s old number with a new one?`)) {
        modifyCallback(newName, newNumber);
      }
    } else if (newName === "" || newNumber === "") {
      alert("Name and Number must both be filled in");
    } else {
      submitCallback(newName, newNumber);
    }
  };
  const handleNameChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setNewNumber(event.target.value);
  };

  return (
    <>
      <form onSubmit={addNote}>
        <div>
          Name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
          <br />
          Number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">Add Person</button>
        </div>
      </form>
    </>
  )
};

export default PhoneForm;
