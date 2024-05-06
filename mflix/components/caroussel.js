import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
    const settings = {
        dots: true, // Afficher les indicateurs de pagination (dots)
        infinite: true, // Permettre un défilement infini
        speed: 1000000,
        slidesToShow: 1, // Nombre de slides à afficher à la fois
        slidesToScroll: 1, // Nombre de slides à faire défiler à la fois
    };

    return (
        <Slider {...settings} className="flex items-center justify-center mt-4">

            <div>
                <img src="https://placekitten.com/800/401" alt="Slide 2" className="ml-96 rounded-lg" />
            </div>
            <div>
                <img src="https://placekitten.com/800/402" alt="Slide 3" className="ml-96 rounded-lg" />
            </div>
        </Slider>
    );
};

export default Carousel;
