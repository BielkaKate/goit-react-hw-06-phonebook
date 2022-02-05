import "./App.css";
import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import shortid from "shortid";
import PropTypes from "prop-types";

const App = () => {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    const contactsStorage = localStorage.getItem("contacts");
    const contactsStorageParse = JSON.parse(contactsStorage);
    if (contactsStorageParse) {
      setContacts(contactsStorageParse);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (data) => {
    contacts.find(
      (contact) => contact.name.toLowerCase() === data.name.toLowerCase()
    )
      ? alert(`${data.name} is already in contacts`)
      : setContacts((prevContacts) => [
          { id: shortid.generate(), ...data },
          ...prevContacts,
        ]);
  };

  const changeFilter = (e) => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const getVisibleContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDeleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((prevContact) => prevContact.id !== contactId)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm propOnSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} handleInputChange={changeFilter} />
      <ContactList
        contacts={visibleContacts}
        handleDelete={handleDeleteContact}
      />
    </div>
  );
};

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.number,
    })
  ),
  filter: PropTypes.string,
};

export default App;
