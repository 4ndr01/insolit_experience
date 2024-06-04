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

voyageReserveSchema.pre(/^find/, function (next) {
    this.populate({
        path: "userId", // Mettez à jour le chemin pour correspondre à votre schéma
        select: "name email _id",
    });
    next();
});

const VoyageReserve = mongoose.model('VoyageReserve', voyageReserveSchema);

module.exports = VoyageReserve;
