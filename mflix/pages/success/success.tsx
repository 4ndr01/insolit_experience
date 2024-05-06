import React from 'react';

const Success = () => {
    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-blue-900">Merci pour votre achat !</h2>
                    <p className="mt-2 text-blue-900">Vous recevrez un email de confirmation dans quelques minutes.</p>
                </div>
            </div>
        </div>
    );

}

export default Success;

