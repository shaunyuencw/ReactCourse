const Persons = ({ persons, deleteContact }) => {
    if (persons && persons.length > 0){
        return (
            <ul>
                {persons.map(person => 
                    <Person key={person.id} person={person} deleteContact={() => deleteContact(person.id)} />
                )}
            </ul>
        )
    }
    else {
        return (
            <div>No Contacts</div>
        )
    }
    
}

const Person = ({ person, deleteContact }) => {
    return (
      <li>
        {person.name} : {person.number}
        <button onClick={deleteContact}>Delete</button>
    </li>
    )
  }

export default Persons