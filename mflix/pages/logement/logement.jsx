import SearchBar from '../../components/searchBarDate';
import NavComponent from "../../components/nav";
import Footer from "../../components/footer";
// Exemple de données
const data = [
    { name: 'Événement 1', date: '2024-05-20' },
    { name: 'Événement 2', date: '2024-05-21' },
    { name: 'Événement 3', date: '2024-05-22' },
];

const Home = () => {
    return (
        <>
            <NavComponent/>
            <div
                className="min-h-screen bg-gradient-to-b from-purple-300 via-purple-400 to-blue-500 px-4 py-8 md:py-16"
                style={{background: 'linear-gradient(to bottom, #8474E4,#4CB4FF)'}}>
                <h1 className="custom-h1">Nos logements</h1>

                <SearchBar data={data}/>
            </div>
            <Footer/>
            <style jsx>{`
                /* Importer la police Tahoma */
                @font-face {
                    font-family: 'Tahoma';
                    src: url('/mflix/pages/logement/font/tahoma.ttf'); /* Assurez-vous que le chemin est correct */
                }

                button {
                    cursor: pointer;
                    background-color: rgb(74 108 247);
                }

                .button {
                    cursor: pointer;
                }

                h1 {

                    font-family: 'Tahoma', Arial, sans-serif;
                    font-size: 2rem;
                    
                    margin-bottom: 1rem;
                }
            `}</style>
        </>
    );
};

export default Home;
