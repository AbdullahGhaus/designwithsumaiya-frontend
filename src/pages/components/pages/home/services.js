// import React, { useEffect, useRef, useState } from 'react';
// import CryptoJS from "crypto-js"
// import { message, Spin } from 'antd';
// import appConfig from '../../../../utils/config';
// import { useNavigate } from 'react-router-dom';

// const Services = () => {

//     const navigate = useNavigate()
//     const contentRef = useRef(null);
//     const cardRefs = useRef([]);
//     const [loader, setLoader] = useState(false)
//     const [services, setServices] = useState([])

//     const ComponentMap = ({ name, index, id }) => (
//         <div
//             ref={(el) => {
//                 if (el) cardRefs.current[index] = el;
//             }}
//             data-aos="zoom-in" data-aos-duration={`1000`}
//             data-aos-delay={`${index * 200}`}
//             data-aos-anchor-placement="top-bottom"
//             className="relative bg-white rounded-lg shadow-md border-t-8 border-custom-main_pink p-6 md:p-12"
//         >
//             <div className="absolute top-4 left-4 w-4 h-4 bg-[#4b4c02] rounded-full"></div>
//             <div className="absolute top-4 right-4 w-4 h-4 bg-[#4b4c02] rounded-full"></div>
//             <div className="absolute bottom-4 right-4 w-4 h-4 bg-[#4b4c02] rounded-full"></div>
//             <div className="absolute bottom-4 left-4 w-4 h-4 bg-[#4b4c02] rounded-full"></div>
//             <h2 className="text-[#bb967d] text-[18px] md:text-2xl font-bold text-center cooper  w-[300px] h-[100px] flex items-center justify-center">
//                 {name}
//             </h2>
//             <div className="flex justify-center">
//                 <button className="bg-custom-main_pink text-[#96272c] px-4 py-2 font-semibold rounded-full shadow text-[12px]" onClick={() => navigate(`/category/${id}`, { state: { name } })}>
//                     PROJECTS
//                 </button>
//             </div>
//         </div >
//     );

//     const fetchServices = async () => {
//         setLoader(true)
//         const response = await fetch(`${appConfig.api_url}/categories`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": localStorage.getItem("access-token")
//             },
//         });
//         let result = await response.json()
//         if (result.success) {
//             setServices(result?.categories)
//             return setLoader(false)
//         }
//         else {
//             message.error(result.message)
//             return setLoader(false)
//         }
//     }

//     useEffect(() => {
//         fetchServices()
//     }, [])


//     return (
//         <Spin spinning={loader}>
//             <div ref={contentRef} className="flex justify-center items-center min-h-[80vh] py-10 bg-custom-main_brown relative overflow-hidden">
//                 <div
//                     className="absolute left-0 top-0 bottom-0 w-10 bg-custom-main_pink hidden md:flex items-center justify-center transform origin-left"
//                 >
//                     <span className="text-[#96272c] font-bold text-[12px] tracking-[10px] rotate-[-90deg]" >
//                         {/* SERVICES */}
//                     </span>
//                 </div>
//                 <div
//                     className="absolute right-0 top-0 bottom-0 w-10 bg-custom-main_pink hidden md:flex items-center justify-center transform origin-right"
//                 >
//                     <span className="text-[#96272c] font-bold text-[12px] tracking-[10px] rotate-[90deg]">
//                         {/* SERVICES */}
//                     </span>
//                 </div>
//                 <div className="flex items-center justify-center flex-wrap gap-4">
//                     {services?.length ? services?.map((service, index) => (
//                         <ComponentMap key={index} index={index} name={service?.name} id={service?._id} />
//                     )) : <></>}
//                 </div>
//             </div>
//         </Spin>
//     );
// };

// export default Services;


import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
// import CustomButton from '../../../components/buttons';
import { useNavigate } from 'react-router-dom';
import appConfig from '../../../../utils/config';
import { Button, message } from 'antd';
import Loader from '../../../../components/loader';

const SliderSection = () => {

    const navigate = useNavigate()
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loader, setLoader] = useState(false)
    const [services, setServices] = useState([])

    const settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: false,
        autoplaySpeed: 5000,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };


    // Handle parallax effect on scroll
    const getBackgroundStyle = (index) => {
        const parallaxValue = scrollPosition * 0.2; // Control parallax intensity
        return {
            backgroundPosition: `center`
        };
    };

    const ItemsContainer = ({ name, index, thumbnail, _id }) => {
        const [isVisible, setIsVisible] = useState(false); // Control visibility state

        useEffect(() => {
            const timer = setTimeout(() => {
                setIsVisible(true); // Show after 2 seconds
            }, 500);

            return () => clearTimeout(timer); // Cleanup the timeout when unmounting
        }, [currentSlide]); // Re-trigger on slide change

        return (
            <div
                className={`relative h-[90vh] bg-cover bg-center transition-opacity flex justify-center`}
                style={getBackgroundStyle(index)}
            >
                <img alt="" className="absolute inset-0 w-full h-full object-cover" src={thumbnail} />
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                {isVisible && ( // Only show content after 2 seconds
                    <div className="relative z-10 flex flex-col gap-10 justify-center items-center text-center h-full text-white px-4 animate-fadeInUp w-[100%] md:w-[60%] lg:w-[60%]">
                        <span className="text-[25px] leading-6 md:leading-normal md:text-[35px] font-semibold bg-[#ffffff18] px-4 py-1 rounded-full capitalize">{name}<span className='text-[50px] text-custom-yellow'>.</span></span>
                        {/* <span className='text-[12px] md:text-[15px] w-[80%] md:w-[50%] mt-[-20px] text-white text-center  bg-[#ffffff18] px-4 py-1 rounded-md '>asdasdsadad  a a s d a sdsadadaasda s d s a d a daasdasd s a d a d aasdasdsad adaasdas dsadad aasd asdsa dadaas dasd sadadaasdasds a d a daasdasdsadad aasdasdsadadaasdasdsadada</span> */}
                        <button className="bg-custom-main_pink text-[#96272c] px-4 py-2 font-semibold rounded-full shadow text-[12px]" onClick={() => navigate(`/category/${_id}`, { state: { name } })}>
                            PROJECTS
                        </button>
                    </div>
                )}
            </div>
        );
    };

    const handleSlideClick = (index) => {
        sliderRef.current.slickGoTo(index);
    };

    const fetchServices = async () => {
        setLoader(true)
        const response = await fetch(`${appConfig.api_url}/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
        });
        let result = await response.json()
        if (result.success) {
            setServices(result?.categories)
            return setLoader(false)
        }
        else {
            message.error(result.message)
            return setLoader(false)
        }
    }

    useEffect(() => {
        fetchServices()
    }, [])



    return (
        services?.length
            ? <section className="relative">
                <Slider ref={sliderRef} {...settings}>
                    {services.map((x, i) => (
                        <ItemsContainer key={i} {...x} />
                    ))}
                </Slider>

                <div className="absolute left-0 top-0 bottom-0 w-10 bg-custom-main_creame hidden md:flex items-center justify-center transform origin-left" >
                    <span className="text-black text-[12px] tracking-[10px] rotate-[-90deg]" >
                        PORTFOLIO
                    </span>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-10 bg-custom-main_creame hidden md:flex items-center justify-center transform origin-right" >
                    <span className="text-black text-[12px] tracking-[10px] rotate-[90deg]">
                        PORTFOLIO
                    </span>
                </div>

                <div className="absolute bottom-5 left-0 right-0 text-center text-white">
                    {services.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => handleSlideClick(index)}
                            className={`mx-3  rounded-full text-[8px] md:text-[11px] relative ${currentSlide === index ? 'text-custom-yellow font-bold' : 'text-white'}`}
                        >
                            {index + 1}
                        </span>
                    ))}
                </div>
            </section >
            : <div className='h-[90vh] bg-slate-100'>
                <Loader page="services" />
            </div>
    );
};


// Custom Next Arrow Component
const NextArrow = (props) => {
    return (
        <button
            className="absolute right-10 transform top-1/2 -translate-y-1/2 p-4 text-white rounded-full z-10 transition-opacity duration-300 hidden md:block" // Hide on mobile
            onClick={props.onClick}
        >
            <SlArrowRight size={30} className='bg-custom-main_pink p-2 text-black text-bold rounded-full' />
        </button>
    );
};

// Custom Prev Arrow Component
const PrevArrow = (props) => {
    return (
        <button
            className="absolute left-10 transform top-1/2 -translate-y-1/2 p-4 text-white rounded-full z-10 transition-opacity duration-300 hidden md:block" // Hide on mobile
            onClick={props.onClick}
        >
            <SlArrowLeft size={30} className='bg-custom-main_pink p-2 text-black text-bold rounded-full' />
        </button>
    );
};



export default SliderSection;
