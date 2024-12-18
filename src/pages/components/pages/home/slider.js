import React from 'react';
import Slider from 'react-slick';
import logo1 from "../../../../assets/images/logo1.png";
import logo2 from "../../../../assets/images/logo2.png";
import logo3 from "../../../../assets/images/logo3.png";
import logo4 from "../../../../assets/images/logo4.png";
import logo5 from "../../../../assets/images/logo5.png";
import logo6 from "../../../../assets/images/logo6.png";
import logo7 from "../../../../assets/images/logo7.png";
import logo8 from "../../../../assets/images/logo8.png";
import logo9 from "../../../../assets/images/logo9.png";
import logo10 from "../../../../assets/images/logo10.png";
import logo11 from "../../../../assets/images/logo11.png";
import logo12 from "../../../../assets/images/logo12.png";
import logo13 from "../../../../assets/images/logo13.png";
import logo14 from "../../../../assets/images/logo14.png";

// Logos array
const logos = [
    { image: logo1, alt: "Logo 1" },
    { image: logo2, alt: "Logo 2" },
    { image: logo3, alt: "Logo 3" },
    { image: logo4, alt: "Logo 4" },
    { image: logo5, alt: "Logo 5" },
    { image: logo6, alt: "Logo 1" },
    { image: logo7, alt: "Logo 2" },
    { image: logo8, alt: "Logo 3" },
    { image: logo9, alt: "Logo 4" },
    { image: logo10, alt: "Logo 5" },
    { image: logo11, alt: "Logo 1" },
    { image: logo12, alt: "Logo 2" },
    { image: logo13, alt: "Logo 3" },
    { image: logo14, alt: "Logo 4" },
    // Add more logos as needed
];

const SliderSection = () => {
    const settings = {
        dots: false, // Hide dots for navigation
        autoplay: true, // Enable autoplay
        infinite: true, // Enable infinite loop
        speed: 3000, // Slide transition speed
        autoplaySpeed: 0, // Speed of autoplay, 0 makes it continuous without pause
        slidesToShow: 10, // Number of slides to show at once
        slidesToScroll: 1, // Number of slides to scroll at once
        pauseOnHover: false, // No pause on hover
        cssEase: 'linear', // Smooth sliding effect
        responsive: [
            {
                breakpoint: 1024, // For screens less than 1024px
                settings: {
                    slidesToShow: 5, // Show 5 slides on medium screens
                }
            },
            {
                breakpoint: 768, // For screens less than 768px
                settings: {
                    slidesToShow: 3, // Show 3 slides on smaller screens
                }
            },
            {
                breakpoint: 480, // For screens less than 480px
                settings: {
                    slidesToShow: 2, // Show 2 slides on mobile screens
                }
            }
        ]
    };

    return (
        <section className="w-full bg-custom-creame">
            <Slider {...settings}>
                {logos.map((logo, index) => (
                    <div key={index} className="w-32 h-32 rounded-full">
                        <img src={logo.image} alt={logo.alt} className="max-w-full max-h-full object-contain h-full w-[100px]" />
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default SliderSection;
