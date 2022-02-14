const mongoose = require('mongoose')

const FilmsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Veuillez ajouter un titre'],
        unique: true,
        maxlength: [100, '100 Caractères maximum'],
        minlength: [3, '3 Caractères Minimum'],
    },
    description: {
        type: String,
        required: true,
        maxlength: [500, '500 Caractères maximum'],
        minlength: [3, '3 Caractères Minimum'],
    },
    sortie: {
        type: String,
        required: true,
        maxlength: [10, '10 Caractères maximum'],
    },
    acteur: {
        type: String,
        required: true,
        maxlength: [100, '100 Caractères maximum'],
        minlength: [3, '3 Caractères Minimum'],
    },
    realisator: {
        type: String,
        required: true,
        maxlength: [100, '100 Caractères maximum'],
        minlength: [3, '3 Caractères Minimum'],
    },
    image: {
        type: String,
        required: true,
    },
})
module.exports = mongoose.models.Films || mongoose.model('Films', FilmsSchema)