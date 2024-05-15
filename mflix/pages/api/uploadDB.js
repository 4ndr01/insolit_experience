import multer from 'multer';
import connectMongoDB from '../../lib/mongodb';
import ImageModel from '../../models/voyage'; // Supposons que vous avez un modèle d'image MongoDB

const upload = multer({ dest: 'uploads/' });

export default async function handler(req, res) {
    try {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                console.error('Erreur lors de l\'upload du fichier:', err);
                return res.status(500).json({ message: 'Erreur lors de l\'upload du fichier' });
            }

            // Récupérer les informations sur le fichier uploadé
            console.log('Fichier uploadé avec succès:', req.file);
            const { path, mimetype, originalname } = req.file;

            // Enregistrer les métadonnées de l'image dans la base de données
            await connectMongoDB(); // Connectez-vous à votre base de données MongoDB
            const newImage = new ImageModel({
                filename: originalname,
                path: path,
                mimetype: mimetype
            });
            const savedImage = await newImage.save();

            return res.status(200).json({ message: 'Fichier uploadé avec succès', image: savedImage });
        });
    } catch (error) {
        console.error('Erreur lors du traitement de la requête:', error);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
}
