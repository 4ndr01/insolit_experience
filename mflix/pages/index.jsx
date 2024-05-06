import 'tailwindcss/tailwind.css';
import NavComponent from "../components/nav.jsx";
import VoyagesList from "../components/voyages/list_voyageComponent";
import News from "../components/voyages/newsComponent";
import Packs from "../components/voyages/packs";
import SearchBarWithVoyagesList from "../components/searchbar";
import Footer from "../components/footer";
import Voyages from "../components/voyages/list";


const Main = () => {
    return (
        <>
            <NavComponent />

            <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #8474E4,#4CB4FF)' }}>
                <section className="container mx-auto p-4">
                    <SearchBarWithVoyagesList voyages={Voyages} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>

                            <VoyagesList />
                            <News />

                        </div>
                        <div>
                            <Packs />
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}

export default Main;
