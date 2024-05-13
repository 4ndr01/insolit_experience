import mongoose from 'mongoose';

let Commande;

try {
  // Tentez de récupérer le modèle s'il existe déjà
  Commande = mongoose.model('Travel');
} catch (e) {
  // Si le modèle n'existe pas, créez-le
  const commandeSchema = new mongoose.Schema({
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
  });

  commandeSchema.pre(/^find/, function (next) {
    this.populate({
      path: "userId", // Mettez à jour le chemin pour correspondre à votre schéma
      select: "name email _id",
    });
    next();
  });

  Commande = mongoose.model('Travel', commandeSchema);
}

export default Commande