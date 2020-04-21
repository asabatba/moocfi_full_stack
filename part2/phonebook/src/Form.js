
import React, { useState } from 'react';
import api from './api';


const Form = ({ persons, setPersons, setMessage }) => {

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
                setMessage(`Added '${data.name}' to the phonebook`)
                setTimeout(() => { setMessage(null) }, 3000)
            })
    }

    const updatePerson = (id, updatedPerson) => {

        api.update(id, updatedPerson).then(data => {
            setPersons(persons.map((p) => p.id === id ? data : p))
            setMessage(`Updated listed phone of '${data.name}'`)
            setTimeout(() => { setMessage(null) }, 3000)
        }
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

export default Form