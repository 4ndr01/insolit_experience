import SearchBar from '../../components/searchBarDate';
import NavComponent from "../../components/nav";
import Footer from "../../components/footer";
import '../SearchBar.module.css';

const data = [
    {  },
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
                    color: black;
                    
                }


                
            `}</style>
        </>
    );
};

export default Home;
