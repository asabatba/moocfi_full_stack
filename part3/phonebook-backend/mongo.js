const mongoose = require('mongoose')
const logger = require('node-color-log')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster2b-ai2ht.azure.mongodb.net/phonebook?retryWrites=true&w=majority`


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
})

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length < 5) {


    Entry.find({}).then(result => {
        logger.color('magenta').log("Phonebook\n")
        result.forEach(entry => {
            logger.color('yellow').log(`${entry.name} - ${entry.number}`)
        })
        mongoose.connection.close()
    })

} else {

    const name = process.argv[3]
    const number = process.argv[4]


    const entry = new Entry({
        name: name,
        number: number,
        date: new Date(),
    })

    entry.save().then(response => {
        console.log(`added ${response.name} - ${response.number} to phonebook`)
        mongoose.connection.close()
    })

}




