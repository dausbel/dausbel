import "../css/App.css";
import ListContacts from "./ListContacts";
import { Route, Routes, useNavigate } from "react-router-dom";
import * as ContactsAPI from "../utils/ContactsAPI.js";
import { useState, useEffect } from "react";
import CreateContact from "./CreateContact";

const App = () => {
  let navigate = useNavigate();
  const removeContacts = (contact) => {
    ContactsAPI.remove(contact); 
    setContacts(contacts.filter((c) => c.id !== contact.id));
  };

  const createContacts = (contact) => {
    const create = async () => { 
      const res = await ContactsAPI.create(contact);
      setContacts(contacts.concat(res));
    };
    create();
    navigate("/");
  }
  const [contacts, setContacts] = useState([]);
  const [screen, setScreen] = useState("list");

  useEffect(() => {
    const getContacts = async () => {
      const res = await ContactsAPI.getAll();
      setContacts(res);
    };
    getContacts();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ListContacts
              contacts={contacts}
              onDeleteContact={removeContacts}
            />
          }
        />
        <Route
          path="/create"
          element={
            <CreateContact     onCreateContact={(contact) => {
                createContacts(contact);
              }}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
