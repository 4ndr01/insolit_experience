import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white text-center py-4 h-56">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    {/* Section Assistance */}
                    <div className="w-1/3 mr-20">
                        <h2 className="text-2xl font-bold text-white mb-4">Assistance</h2>
                        <Link href={"/aide/aide"} className="text-white block mb-2">
                            Centre d'aide
                        </Link>
                        <p className="text-white mb-2">CGV</p>
                        <p className="text-white mb-2">Gestion des cookies</p>

                    </div>

                    {/* Section Pour les professionnels */}
                    <div className="w-1/3 mr-20">
                        <h2 className="text-2xl font-bold text-white mb-4">Contacts</h2>
                        <Link className="text-white block mb-2" href="/contact/contact">
                            Contactez-nous
                        </Link>
                    </div>

                    {/* Section Insolite Experience */}
                    <div className="w-1/3 ml-32">
                        <h2 className="text-2xl font-bold text-white mb-4">Insolite Experience</h2>
                        <p className="text-white mb-2">Qui sommes-nous ?</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
