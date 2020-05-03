const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const url = process.env['MONGODB_URI'];

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
})

entrySchema.set('toJSON', {
    transform: (doc, returned) => {
        returned.id = returned._id.toString();
        delete returned._id;
        delete returned.__v;
        delete returned.date;
    }
});

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry;
