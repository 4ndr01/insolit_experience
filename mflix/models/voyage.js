// models/Voyage.js

const mongoose = require('mongoose');

// Définition du schéma pour le modèle de Voyage
const voyageSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: ''
    }
});

// Création du modèle de Voyage à partir du schéma
const Voyage = mongoose.model('Voyage', voyageSchema);

module.exports = Voyage;
