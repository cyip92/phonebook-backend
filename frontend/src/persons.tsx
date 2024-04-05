import axios from "axios";

import { SingleEntry } from "./components/PhoneBook";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const createEntry = (newPerson: SingleEntry) => {
  return axios.post(baseUrl, newPerson).then(response => response.data);
};

const modifyEntry = (id: string, newPerson: SingleEntry) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then(response => response.data);
};

const deleteEntry = (id: string) => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data);
};

export default { getAll, createEntry, modifyEntry, deleteEntry };
