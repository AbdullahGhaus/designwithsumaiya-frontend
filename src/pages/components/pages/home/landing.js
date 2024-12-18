import React, { useEffect, useRef } from 'react'
import girl from "../../../../assets/images/girl.jpg"
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate()
    return (
        <div className='grid grid-cols-12 h-screen pt-14 bg-custom-light_creame relative'>
            <div className='col-span-6 flex flex-col gap-14 justify-center px-10 pt-[-50px]'>
                <div className='flex flex-col' data-aos="zoom-in" data-aos-duration="1000">
                    <span className='cooper text-[50px] text-custom-army_green font-normal'>Sumaiya Ghani</span>
                    <span className='text-custom-army_green w-[90%] text-[20px]'>As your social-first creative and performance partner, my expertise is designed for brands that dare to stand out.</span>
                </div>
                <span className='flex items-center gap-5'>
                    <button className='bg-[#ffb5d5] text-custom-army_green hover:bg-[#fdbdd9] transition-all px-4 py-2 text-[16px] rounded-full font-medium' data-aos="zoom-in-right" data-aos-duration="1250" onClick={() => navigate("/contact-me")}>Lets Be Friends</button>
                    <button className='bg-custom-red hover:bg-[#ff9767] transition-all px-4 py-2 text-[16px] rounded-full font-medium text-white' data-aos="zoom-in-right" data-aos-duration="1500" onClick={() => navigate("/portfolio")}>Work</button>
                </span>
            </div>
            <div className='col-span-6 flex items-center justify-center relative px-10 gap-3' data-aos="zoom-in" data-aos-duration="3000">
                <img alt="" src={girl} className='object-contain w-[300px] z-10 mt-[-20px]' />
            </div>
        </div>
    )
}

export default Landing