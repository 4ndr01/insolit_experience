

import mongoose from 'mongoose';

let Travel;

try {
  // Tentez de récupérer le modèle s'il existe déjà
  Travel = mongoose.model('Travel');
} catch (e) {
  // Si le modèle n'existe pas, créez-le
    const travelSchema = new mongoose.Schema({
      destination: {
        type: String,
        required: true,
      },
      departDate: {
        type: Date,
        required: true,
      },
      retourDate: {
        type: Date,
        required: true,
      },
      nombrePersonnes: {
        type: String,
        required: false,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }

    });

  Travel = mongoose.model('Travel', travelSchema);
}

export default Travel;

