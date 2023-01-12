const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
mongoose.set('debug', true)
mongoose.set('strictQuery', true)

const password = process.env.MONGO_PW
const url = `mongodb+srv://shaunyuencw:${password}@cluster0.y0udsnt.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
}, { collection: "persons" })
const Person = mongoose.model('Person', personSchema)

// Generate random id
const generateId = () => {
    return Math.floor(Math.random() * 1000000000)
}

if (process.argv.length === 4) {
    const name = process.argv[2]
    const number = process.argv[3]

    // Create
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')

            const person = new Person({
                name: name,
                number: number,
                id: generateId(),
            })

            return person.save()
        })
        .then(() => {
            console.log(`added ${name} number ${number} to phonebook`)
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}

else if (process.argv.length == 2) {
    // Read
    mongoose
        .connect(url)
        .then((result) => {
            Person.find({}).then(result => {
                console.log("phonebook:")
                result.forEach(person => {
                    console.log(`${person.name} ${person.number}`)
                })
            })
                .then(() => {
                    mongoose.connection.close()
                })
        })
}




