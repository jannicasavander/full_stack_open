const PersonList = props => {
    return (
        <div>
            {props.persons.map(person => (
                <SinglePerson
                    key={person.name}
                    person={person}
                    handlePersonDelete={() =>
                        props.handlePersonDelete(person.id)
                    }
                />
            ))}
        </div>
    );
};

const SinglePerson = props => {
    return (
        <p>
            {props.person.name} {props.person.number}
            <button onClick={props.handlePersonDelete}>delete</button>
        </p>
    );
};

export default PersonList;
