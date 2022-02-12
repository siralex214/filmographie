const mongoose = require('mongoose')

const FilmsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Veuillez ajouter un titre'],
        unique: true,
        maxlength: [40, '40 Caractères maximum']
    },
    description: {
        type: String,
        required: true,
        maxlength: [200, '200 Caractères maximum']
    },
    // image: {
    //     type: String,
    //     required: true,
    //     maxlength: [255, '255 Caractères maximum']
    // },
    sortie: {
        type: String,
        required: true,
    },
    acteur: {
        type: String,
        required: true,
    },
    realisator: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.models.Films || mongoose.model('Films', FilmsSchema)