import React, { useState } from 'react'

const Number = ({ person }) => {

    return (
        <div>{person.name}</div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (persons.find((p) => p.name === newName) !== undefined) {
            alert(`The name ${newName} has already been added.`)
        }
        setPersons(persons.concat({ name: newName }))
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={(ev) => setNewName(ev.target.value)} />
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((p) => <Number key={p.name} person={p}></Number>)}
        </div>
    )
}

export default App