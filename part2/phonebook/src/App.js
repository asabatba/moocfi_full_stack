
import React, { useEffect, useState } from 'react';
import api from './api';
import './App.css';
import Form from './Form';
import Persons from './Persons';


const App = () => {
    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)


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

    const msgClasses = 'message' + (message != null ? ' active' : '');

    return (
        <div>
            <h2>Phonebook</h2>
            <div className={msgClasses}>{message}</div>
            <h3>Filter phonebook</h3>
            <input value={filter} onChange={(ev) => setFilter(ev.target.value)}></input>
            <h3>Add new people</h3>
            <Form persons={persons} setPersons={setPersons} setMessage={setMessage}></Form>
            <h3>Numbers</h3>
            <Persons persons={persons} filter={filter} removeId={removeId}></Persons>
            {/* <button onClick={() => { setMessage('hey'); setShowMessage(true) }}>test</button> */}
        </div>
    )
}

export default App