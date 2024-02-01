// components/Carousel.js

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings} className="flex items-center justify-center mt-4">
            <div>
                <img src="https://placekitten.com/800/400" alt="Slide 1" className=" ml-96  rounded-lg" />
            </div>
            <div>
                <img src="https://placekitten.com/800/401" alt="Slide 2" className=" ml-96 rounded-lg" />
            </div>
            <div>
                <img src="https://placekitten.com/800/402" alt="Slide 3" className=" ml-96 rounded-lg" />
            </div>
        </Slider>
    );
};

export default Carousel;
