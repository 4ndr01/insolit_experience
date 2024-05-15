import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white text-center py-4 h-56">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    {/* Section Assistance */}
                    <div className="w-1/3">
                        <h2 className="text-2xl font-bold text-white mb-4">Assistance</h2>
                        <Link href={"/aide/aide"} className="text-white block mb-2">
                            Aide
                        </Link>
                        <p className="text-white mb-2">Vous avez un handicap</p>
                    </div>

                    {/* Section Pour les professionnels */}
                    <div className="w-1/3">
                        <h2 className="text-2xl font-bold text-white mb-4">Pour les professionnels</h2>
                        <Link className="text-white block mb-2" href="/contact/contact">
                            Contactez-nous
                        </Link>
                    </div>

                    {/* Section Insolite Experience */}
                    <div className="w-1/3">
                        <h2 className="text-2xl font-bold text-white mb-4">Insolite Experience</h2>
                        <p className="text-white mb-2">Qui sommes-nous ?</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
