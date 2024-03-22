

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
      }
    });

  travelSchema.pre(/^find/, function (next) {
    this.populate({
      path: "user",
      select: "name email _id ",
    });

    next();
  });
    Travel = mongoose.model('Travel', travelSchema);
}

export default Travel;

