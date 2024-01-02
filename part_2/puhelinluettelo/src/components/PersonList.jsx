const PersonList = props => {
    return (
        <div>
            {props.persons.map(person => (
                <SinglePerson key={person.name} person={person} />
            ))}
        </div>
    );
};

const SinglePerson = ({ person }) => {
    return (
        <p>
            {person.name} {person.number}
        </p>
    );
};

export default PersonList;
