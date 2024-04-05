import { useState, useEffect } from "react";

import { PhoneBook, SingleEntry } from "./components/PhoneBook";
import PhoneForm from "./components/NewPersonForm";
import SearchForm from "./components/SearchForm";
import Notification from "./components/Notification";
import personService from "./persons";

const App = () => {
  const [persons, setPersons] = useState<Array<SingleEntry>>([]);
  const [search, setSearch] = useState("");
  const [notificationText, setNotificationText] = useState("");
  const [isErrorNotification, setIsErrorNotification] = useState(false);

  useEffect(() => {
    personService
      .getAll()
      .then(initialData => setPersons(initialData));
  }, []);

  // Callback functions passed in so that children components have limited access to all data
  const updateSearch = ( searchStr: string ) => setSearch(searchStr);
  const rejectDuplicate = ( newName: string ) => !persons.map(p => p.name).some(n => n === newName);
  const addPersonCallback = ( newName: string, newNumber: string ) => {
    // Deleting entries can cause gaps in the ID, so we make new entries with an ID higher than all existing ones
    const highestID = persons.map(p => Number(p.id)).reduce((a, b) => Math.max(a, b), 0);
    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(highestID + 1)
    };
    setPersons(persons.concat(newPerson));
    personService
      .createEntry(newPerson)
      .then(response => {
        setIsErrorNotification(false);
        setNotificationText(`Added phone number for ${response.name}`);
        setTimeout(() => setNotificationText(""), 5000);
      });
  };
  const modifyPersonCallback = ( newName: string, newNumber: string ) => {
    const oldEntry = persons.find(p => p.name === newName)!;
    const modifiedEntry = {
      ...oldEntry,
      number: newNumber
    };
    setPersons(persons.map(p => p.id === oldEntry.id ? modifiedEntry : p));
    personService
      .modifyEntry(oldEntry.id, modifiedEntry)
      .then(response => {
        setIsErrorNotification(false);
        setNotificationText(`Modified phone number for ${response.name}`);
        setTimeout(() => setNotificationText(""), 5000);
      })
      .catch(() => {
        setIsErrorNotification(true);
        setNotificationText(`${modifiedEntry.name} was not found on the server!`);
        setTimeout(() => setNotificationText(""), 5000);
      });
  };
  const deletePersonCallback = ( id: string ) => {
    setPersons(persons.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchForm searchCallback={updateSearch} />
      <h2>Add New</h2>
      <PhoneForm
        submitCallback={addPersonCallback}
        modifyCallback={modifyPersonCallback}
        validCheckFn={rejectDuplicate}
      />
      <Notification
        text={notificationText}
        isError={isErrorNotification}
      />
      <h2>Existing Numbers</h2>
      <PhoneBook
        allData={persons}
        searchStr={search}
        deleteCallback={deletePersonCallback}
      />
    </div>
  )
};

export default App;
