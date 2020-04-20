import React, { useState, useEffect } from 'react'
import axios from "axios";
import api from './api';

const Persons = ({ persons, filter }) => {
    return (<div>
        {persons
            .filter((p) => (p.name.toLowerCase().includes(filter.toLowerCase())))
            .map((p) => <Number key={p.name} person={p}></Number>)}
    </div>
    )
}

const Number = ({ person }) => {

    return (
        <div>{person.name} ~ {person.phone}</div>
    )
}

const Form = ({ persons, setPersons }) => {

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (persons.find((p) => p.name === newName) !== undefined) {
            alert(`The name ${newName} has already been added.`)
            return;
        }
        api.create({ name: newName, phone: newPhone })
            .then(data => {
                console.log(data);
                setPersons(persons.concat(data))
            })
    }

    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    return (<form>
        <div>
            Name: <input value={newName} onChange={(ev) => setNewName(ev.target.value)} />
            <br />
            Number: <input value={newPhone} onChange={(ev) => setNewPhone(ev.target.value)} />
        </div>
        <div>
            <button type="submit" onClick={handleSubmit}>add</button>
        </div>
    </form>)
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {

        const eventHandler = data => {
            setPersons(data)
        }

        const promise = api.getAll();
        promise.then(eventHandler)

    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <h3>Filter phonebook</h3>
            <input value={filter} onChange={(ev) => setFilter(ev.target.value)}></input>
            <h3>Add new people</h3>
            <Form persons={persons} setPersons={setPersons}></Form>
            <h3>Numbers</h3>
            <Persons persons={persons} filter={filter}></Persons>
        </div>
    )
}

export default App