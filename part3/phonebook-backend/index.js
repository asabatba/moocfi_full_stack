
require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('node-color-log');

const app = new express();
const Entry = require('./models/entry');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('jsonReq', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :jsonReq'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));


app.get('/info', (req, res) => {

    Entry.find({}).then(results => {
        res.send(`<p>Phonebook has info for ${results.length} people</p><p>${(new Date()).toString()}</p>`)
    }).catch(err => next(err));

})


app.get('/api/persons', (request, response) => {

    Entry.find({}).then(result => {
        logger.color('magenta').log("Phonebook\n");
        result.forEach(entry => {
            logger.color('yellow').log(`${entry.name} - ${entry.number}`)
        });
        response.json(result.map(e => e.toJSON()));
    })
});


app.get('/api/persons/:id', (request, response, next) => {
    // const id = parseInt(request.params.id);

    Entry.findById(request.params.id).then(result => {
        if (result) {
            response.json(result.toJSON());
        } else {
            response.status(404).end();
        }
    }).catch((err) => next(err));
});


app.put('/api/persons/:id', (request, response, next) => {

    const body = request.body;

    const updated = {
        name: body.name,
        number: body.number,
    };

    Entry.findByIdAndUpdate(request.params.id, updated, { new: true }).then(doc => {
        response.send(doc.toJSON());
    });
});


app.delete('/api/persons/:id', (request, response, next) => {

    Entry.findByIdAndDelete(request.params.id).then(doc => {
        response.status(204).end();
    }).catch(err => next(err));
});


app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    if (!body.name || !body.number) {
        response.status(400).json({ error: 'Be sure to provide the name and number in the request.' });
        return;
    }

    const entry = new Entry({
        name: body.name,
        number: body.number,
    });

    entry.save().then((doc) => {
        response.json(doc.toJSON());
    }).catch((err) => next(err));

});



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'ill-formed id' })
    }
    next(error);
}

app.use(errorHandler);
