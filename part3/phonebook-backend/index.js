
const express = require('express');

const app = new express();

app.use(express.json());

const PORT = 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

const persons = [
    {
        name: "Arto Hellas",
        number: "040-132456",
        id: 1
    },
    {
        name: "Orto Holos",
        number: "040-543234",
        id: 2
    },
    {
        name: "Horo Oro",
        number: "040-432425",
        id: 3
    },
]

app.get('/info', (req, res) => {

    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${(new Date()).toString()}</p>`)
})

app.get('/api/persons', (request, response) => {

    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = parseInt(request.params.id);

    const person = persons.find((p) => p.id === id);

    if (person) {
        response.json(person);

    } else {
        response.status(404).end();
    }
});

