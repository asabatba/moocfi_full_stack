
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = new express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('jsonReq', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :jsonReq'));

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

app.put('/api/persons/:id', (request, response) => {

    // if (!body.name || !body.number) {
    //     response.status(400).json({ error: 'Be sure to provide the name and number in the request.' });
    //     return;
    // }

    const id = parseInt(request.params.id);
    const person = persons.find((p) => p.id === id);

    if (person) {
        console.log(person,request.body);
        const nperson = { ...person, ...request.body };
        persons = persons.concat(nperson);
        response.status(200).json(nperson);
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