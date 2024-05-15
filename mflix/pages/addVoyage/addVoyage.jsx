import React from 'react';

function VoyageComponent() {
    const handleImageUpload = async (event) => {
        const formData = new FormData();
        formData.append('image', event.target.files[0]);

        const response = await fetch('/api/uploadimage', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Image uploaded successfully:', data.path);
            // Utilisez le chemin d'accès de l'image pour afficher ou enregistrer dans le modèle de voyage
        } else {
            console.error('Failed to upload image');
        }
    };

    return (
        <div>
            <h1>Upload Voyage Image</h1>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
    );
}

export default VoyageComponent;
