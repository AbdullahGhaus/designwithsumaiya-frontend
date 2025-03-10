import React from 'react';
import girl from '../../../../assets/images/girl.jpg';

const Landing = () => {
    return (
        <div className="h-screen w-full">
            {/* Video section (visible on tablets and larger screens) */}
            <div className="hidden md:block h-full w-full">
                <video
                    src="https://res.cloudinary.com/dnkegkovy/video/upload/v1740506143/website/ygjj8g9kztzsapiexzkc.mp4"
                    className="h-full w-full object-fill"
                    controls={false}
                    autoPlay
                    loop
                />
            </div>

            {/* Comments section (visible only on mobile) */}
            <div className='md:hidden grid grid-cols-12 h-screen py-16 relative'>
                <div className='col-span-12 md:col-span-6 flex flex-col gap-14 justify-center px-5 md:px-10 pt-[-50px]'>
                    <div className='flex flex-col' data-aos="zoom-in" data-aos-duration="1000" data-aos-anchor-placement="top-bottom">
                        <span className='calvino tracking-wider text-[28px] md:text-[35px] text-[black] font-semibold'>
                            Hey - this is Sumaiya!
                        </span>
                        <span className='text-black w-[90%] text-[10px] md:text-[16px]'>
                            I'm an artist and graphic designer who loves creating brand identities, design social media content and draw vibrant illustrations that depict stories. I love colour, light and also painting whimsical worlds.
                        </span>
                    </div>
                </div>
                {/* <div className='col-span-12 md:col-span-6 flex items-center justify-center relative px-5 md:px-10 gap-3' data-aos="zoom-in" data-aos-duration="3000" data-aos-anchor-placement="top-bottom">
                    <img alt="" src={girl} className='object-contain w-[200px] md:w-[300px] z-10 mt-[-20px]' />
                </div> */}
            </div>
        </div>
    );
};

export default Landing;
