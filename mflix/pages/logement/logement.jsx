import SearchBar from '../../components/searchBarDate';
import NavComponent from "../../components/nav";
import Footer from "../../components/footer";
import '../SearchBar.module.css';
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

            <div className="min-h-screen bg-gradient-to-b from-purple-300 via-purple-400 to-blue-500 px-4 py-8 md:py-16"
                    style={{background: 'linear-gradient(to bottom, #8474E4,#4CB4FF)'}}>
                <h1 className="">Nos logements</h1>

                <SearchBar data={data}/>
            </div>
            <Footer/>
            <style jsx>{`

                h1{
                    font-family: 'Anomega', sans-serif; /* Ajout de la police personnalisée */
                    font-size: 3rem;
                    color: white;
                    
                }

                .custom-button {
                    cursor: pointer;
                    background-color: rgb(74 108 247);
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    transition: background-color 0.3s ease;
                }

                .custom-button:hover {
                    background-color: rgb(57, 80, 197);
                }

                
            `}</style>
        </>
    );
};

export default Home;
