import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Success = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/').then(r => r);
        }, 3000);

        // Clean up the timer when the component is unmounted
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-blue-900">Merci pour votre achat !</h2>
                    <p className="mt-2 text-blue-900">Vous allez etre redirigé vers la page d'acceuil.</p>
                </div>
            </div>
        </div>
    );
};

export default Success;

