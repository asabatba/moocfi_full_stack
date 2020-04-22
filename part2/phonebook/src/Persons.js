
import React from 'react';
import './Persons.css';


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
        <div>{person.name} ~ {person.number} <button onClick={handleClick}>delete</button></div>
    )
}

export default Persons