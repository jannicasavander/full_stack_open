import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");
    const [isError, setIsError] = useState(false);

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
            personsService
                .update(id, personObject)
                .then(returnedPerson => {
                    setPersons(
                        persons.map(person =>
                            person.id !== id ? person : returnedPerson,
                        ),
                    );
                })
                .catch(error => {
                    setNotificationMessage(
                        `Person '${personObject.name}' has already been removed from the server`,
                    );
                    setIsError(true);
                    setTimeout(() => {
                        setNotificationMessage(null);
                    }, 5000);
                    setPersons(persons.filter(n => n.id !== id));
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
        if (person) {
            handlePersonUpdate(person.id, personObject);
        } else {
            personsService.create(personObject).then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
            });
            setNotificationMessage(`Added ${personObject.name}`);
            setTimeout(() => {
                setNotificationMessage(null);
            }, 5000);
        }
        setNewName("");
        setNewNumber("");
    };

    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase()),
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} error={isError} />
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
