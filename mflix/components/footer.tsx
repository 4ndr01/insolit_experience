import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white text-center py-4 h-32">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <div className="w-1/3">
                        <h2 className="text-2xl font-bold text-white">Assistance</h2>
                        <p className="mt-2 text-white">Centre d'aide</p>
                        <p className="mt-2 text-white">Vous avez un handicap</p>
                    </div>

                    <div className="w-1/3 text-center">
                        <h2 className="text-2xl font-bold text-white">Pour les professionnels</h2>
                        <Link className="mt-2 text-white" href="/contact/contact">Nous contacter</Link>
                    </div>

                    <div className="w-1/3 text-right">
                        <h2 className="text-2xl font-bold text-white">Insolite Experience</h2>
                        <p className="mt-2 text-white">Qui sommes-nous ?</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
