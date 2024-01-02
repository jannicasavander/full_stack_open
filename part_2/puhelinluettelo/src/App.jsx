import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");

    const handlePersonChange = event => {
        setNewName(event.target.value);
    };

    const handleNumberChange = event => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = event => {
        setNewFilter(event.target.value);
    };

    const addPerson = event => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber,
        };
        persons.find(person => person.name === newName)
            ? alert(`${newName} is already added to phonebook`)
            : setPersons(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
    };

    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase()),
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                filter={newFilter}
                handleFilterChange={handleFilterChange}
            />
            <h2>Add a new</h2>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handlePersonChange={handlePersonChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <PersonList persons={personsToShow} />
        </div>
    );
};

export default App;
