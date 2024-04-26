import 'tailwindcss/tailwind.css';
import NavComponent from "../components/nav.jsx";
import VoyagesList from "../components/voyages/list_voyageComponent";
import News from "../components/voyages/newsComponent";
import Packs from "../components/voyages/packs";
import SearchBarWithVoyagesList from "../components/searchbar";
import Voyages from "../components/voyages/list";
import Footer from "../components/footer";

const Main = () => {
    return (
        <>
            <NavComponent />

            <div className="min-h-screen" style={{ background: 'linear-gradient( #8474E4,#4CB4FF )' }}>
                <section className="container mx-auto p-4">
                    <SearchBarWithVoyagesList voyages={Voyages} />
                    <VoyagesList />
                    <News />
                    <Packs />
                </section>
                <Footer />
            </div>
        </>
    );
}

export default Main;
