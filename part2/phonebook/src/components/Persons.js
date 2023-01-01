const Persons = ({ persons }) => {
    return (
        <ul>
            {persons.map(person => 
                <Person key={person.id} person={person} />
            )}
        </ul>
    )
}

const Person = ({ person }) => {
    return (
      <li>{person.name} : {person.number}</li>
    )
  }

export default Persons