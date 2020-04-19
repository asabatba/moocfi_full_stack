import React, { useState } from 'react'

const Number = ({ person }) => {

    return (
        <div>{person.name} ~ {person.phone}</div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filter, setFilter] = useState('')


    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (persons.find((p) => p.name === newName) !== undefined) {
            alert(`The name ${newName} has already been added.`)
            return;
        }
        setPersons(persons.concat({ name: newName, phone: newPhone }))
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <h3>Filter phonebook</h3>
            <input value={filter} onChange={(ev) => setFilter(ev.target.value)}></input>
            <h3>Add new people</h3>
            <form>
                <div>
                    Name: <input value={newName} onChange={(ev) => setNewName(ev.target.value)} />
                    <br />
                    Number: <input value={newPhone} onChange={(ev) => setNewPhone(ev.target.value)} />
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit}>add</button>
                </div>
            </form>
            <h3>Numbers</h3>
            {persons
                .filter((p) => (p.name.toLowerCase().includes(filter.toLowerCase())))
                .map((p) => <Number key={p.name} person={p}></Number>)}
        </div>
    )
}

export default App