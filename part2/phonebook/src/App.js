import React, { useEffect, useState } from 'react';
import api from './api';

const Persons = ({ persons, filter, removeId }) => {
    return (<div>
        {persons
            .filter((p) => (p.name.toLowerCase().includes(filter.toLowerCase())))
            .map((p) => <Number key={p.name} person={p} removeId={removeId}></Number>)}
    </div>
    )
}

const Number = ({ person, removeId }) => {

    const handleClick = () => {
        if (window.confirm(`Do you really want to remove ${person.name} from the list?`))
            removeId(person.id);
    }

    return (
        <div>{person.name} ~ {person.phone} <button onClick={handleClick}>delete</button></div>
    )
}

const Form = ({ persons, setPersons }) => {

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const person = { name: newName, phone: newPhone }

        const existingPerson = persons.find((p) => p.name === newName)
        if (existingPerson !== undefined) {

            if (window.confirm(`The name ${newName} has already been added. Update phone number?`))
                updatePerson(existingPerson.id, person)

            return;
        }
        api.create(person)
            .then(data => {
                console.log(data);
                setPersons(persons.concat(data))
            })
    }

    const updatePerson = (id, updatedPerson) => {

        api.update(id, updatedPerson).then(data =>
            setPersons(persons.map((p) => p.id === id ? data : p))
        );
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

    const removeId = (id) =>
        api.remove(id).then(data => {
            setPersons(persons.filter(p => p.id !== id));
        })


    return (
        <div>
            <h2>Phonebook</h2>
            <h3>Filter phonebook</h3>
            <input value={filter} onChange={(ev) => setFilter(ev.target.value)}></input>
            <h3>Add new people</h3>
            <Form persons={persons} setPersons={setPersons}></Form>
            <h3>Numbers</h3>
            <Persons persons={persons} filter={filter} removeId={removeId}></Persons>
        </div>
    )
}

export default App