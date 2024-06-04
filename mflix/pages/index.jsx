import 'tailwindcss/tailwind.css';
import NavComponent from "../components/nav.jsx";
import VoyagesList from "../components/voyages/list_voyageComponent";
import News from "../components/voyages/newsComponent";
import Packs from "../components/voyages/packs";
import SearchBarWithVoyagesList from "../components/searchbar.js";

import Footer from "../components/footer";
import Voyages from "../components/voyages/list";

import Head from "next/head";

const Main = () => {
    return (

        <>
            <Head>
                <title>InsoliteExperience</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content="Site de voyage insolite"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tahoma&display=swap" />
                <meta property="og:image" content="https://marv.lol"/>
                <meta property="og:url" content="https://marv.lol"/>
                <meta property="og:type" content="website"/>
            </Head>
            <NavComponent/>

            <div className="min-h-screen bg-gradient-to-b from-purple-300 via-purple-400 to-blue-500 px-4 py-8 md:py-16"
                 style={{background: 'linear-gradient(to bottom, #8474E4,#4CB4FF)' }}>
                <section className="container mx-auto p-4">
                    <SearchBarWithVoyagesList voyages={Voyages} />
                    <div className=" rounded-full" >
                        <div>
                            <VoyagesList />
                            <News />

                        </div>
                        <div>
                            <Packs />
                        </div>

                    </div>

                </section>

            </div>
            <Footer />
        </>
    );
}

export default Main;
