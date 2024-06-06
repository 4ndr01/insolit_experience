const mongoose = require('mongoose');

const voyageReserveSchema = new mongoose.Schema({destination: {
        type: String,
        required: false,
    },
    departDate: {
        type: Date,
        required: false,
    },
    retourDate: {
        type: Date,
        required: false,
    },
    nombrePersonnes: {
        type: String,
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    etat: {
        type: String,
        enum: ["En attente", "En cours", "Terminé"],
        default: "En attente",
    },
    imageUrl: { type: String } // Champ pour le chemin d'accès de l'image

});

let VoyageReserve;
if (mongoose.models.VoyageReserve) {
    VoyageReserve = mongoose.models.VoyageReserve; // Utilisez le modèle existant
} else {
    VoyageReserve = mongoose.model('VoyageReserve', voyageReserveSchema); // Créez le modèle s'il n'existe pas
}

export default VoyageReserve;