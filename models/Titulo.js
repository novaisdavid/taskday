const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Titulo = new Schema({
    titulo: {
        type: String,
        required: true
    }
})

mongoose.model('titulos',Titulo)