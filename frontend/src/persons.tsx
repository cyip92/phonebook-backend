import axios from "axios";

export type PhonebookPayload = {
  name: string;
  number: string;
};

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const createEntry = (newPerson: PhonebookPayload) => {
  return axios.post(baseUrl, newPerson).then(response => response.data);
};

const modifyEntry = (id: string, newPerson: PhonebookPayload) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then(response => response.data);
};

const deleteEntry = (id: string) => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data);
};

export default { getAll, createEntry, modifyEntry, deleteEntry };
