import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import personsService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");

    useEffect(() => {
        personsService.getAll().then(initialPersons => {
            setPersons(initialPersons);
        });
    }, []);

    const handlePersonChange = event => {
        setNewName(event.target.value);
    };

    const handleNumberChange = event => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = event => {
        setNewFilter(event.target.value);
    };

    const handlePersonDelete = id => {
        if (
            window.confirm(
                `Delete ${persons.find(person => person.id === id).name}?`,
            )
        ) {
            personsService.deletePerson(id).then(() => {
                personsService.getAll().then(initialPersons => {
                    setPersons(initialPersons);
                });
            });
        }
    };

    const handlePersonUpdate = (id, personObject) => {
        if (
            window.confirm(
                `${personObject.name} is already added to phonebook, replace the old number with a new one?`,
            )
        ) {
            personsService.update(id, personObject).then(returnedPerson => {
                setPersons(
                    persons.map(person =>
                        person.id !== id ? person : returnedPerson,
                    ),
                );
            });
        }
    };

    const addPerson = event => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber,
        };
        const person = persons.find(person => person.name === newName);
        person
            ? handlePersonUpdate(person.id, personObject)
            : personsService.create(personObject).then(returnedPerson => {
                  setPersons(persons.concat(returnedPerson));
              });
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
            <PersonList
                persons={personsToShow}
                handlePersonDelete={handlePersonDelete}
            />
        </div>
    );
};

export default App;
