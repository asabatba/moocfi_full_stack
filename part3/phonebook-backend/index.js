
const express = require('express');

const app = new express();

app.use(express.json());

const PORT = 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

let persons = [
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


app.delete('/api/persons/:id', (request, response) => {

    const id = parseInt(request.params.id);
    const personIdx = persons.findIndex((p) => p.id === id);

    if (personIdx) {
        persons = persons.filter((p) => p.id !== id);
        response.status(204).end();
    } else {
        response.status(404).end();
    }
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        response.status(400).json({ error: 'Be sure to provide the name and number in the request.' });
        return;
    }

    if (persons.find(p => p.name === body.name)) {
        response.status(400).json({ error: `The name ${body.name} is already un use. POST calls are exclusive for creation of new entries.` });
        return;
    }

    const id = Math.floor(Math.random() * 1000000);
    const person = { ...body, id };
    persons = persons.concat(person);

    response.json(person);
});