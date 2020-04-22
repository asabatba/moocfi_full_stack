
import React, { useState } from 'react';
import api from './api';


const Form = ({ persons, setPersons, setMessage }) => {

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const person = { name: newName, number: newNumber }

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
                setMessage({ content: `Added '${data.name}' to the phonebook`, type: 'info' })
                setTimeout(() => { setMessage({ content: null, type: 'info' }) }, 3000)
            })
    }

    const updatePerson = (id, updatedPerson) => {

        api.update(id, updatedPerson).then(data => {
            setPersons(persons.map((p) => p.id === id ? data : p))
            setMessage({ content: `Updated listed phone of '${data.name}'`, type: 'info' })
            setTimeout(() => { setMessage({ content: null, type: 'info' }) }, 3000)
        }).catch((err) => {
            console.log(err.response)
            setPersons(persons.filter((p) => p.id !== id))
            setMessage({ content: `Update of ${updatedPerson.name} failed`, type: 'error' })
            setTimeout(() => { setMessage({ content: null, type: 'error' }) }, 3000)
        })
    }

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    return (<form>
        <div>
            Name: <input value={newName} onChange={(ev) => setNewName(ev.target.value)} />
            <br />
            Number: <input value={newNumber} onChange={(ev) => setNewNumber(ev.target.value)} />
        </div>
        <div>
            <button type="submit" onClick={handleSubmit}>add</button>
        </div>
    </form>)
}

export default Form