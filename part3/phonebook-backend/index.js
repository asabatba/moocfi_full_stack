
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

app.get('/api/persons', (request, response) => {

    response.json(persons);
});
