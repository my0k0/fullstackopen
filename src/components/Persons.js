const Persons = ({persons, deletePerson}) => {
    return (
        <ul>
            {
                persons.map(person => {
                return (
                        <li key={person.id} style={{ margin: 5 }}>
                            {person.name} {person.number}
                            <button 
                                onClick={() => deletePerson(person.id)}
                                style={{ marginLeft:8,color:'#fff',background: '#e22',cursor: 'pointer', border: 'none' }}
                            >delete</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Persons