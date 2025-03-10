import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import appConfig from '../../../../utils/config';
import { Button, Image, message } from 'antd';
import Loader from '../../../../components/loader';

const SliderSection = () => {

    const navigate = useNavigate()
    const [URLs, setURLs] = useState([])

    const fetchURLs = async () => {
        const response = await fetch(`${appConfig.api_url}/some-of-my-work`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
        });
        let result = await response.json()
        if (result.success) {
            setURLs(result?.urls)
        }
        else {
            message.error(result.message)
        }
    }

    useEffect(() => {
        fetchURLs()
    }, [])



    return (
        URLs?.length
            ? <div className="flex flex-col gap-10 px-5 md:p-10">
                <span className='calvino font-semibold text-[30px] md:text-[50px] tracking-wide'>Some of my fav work</span>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-14 justify-items-center md:px-20'>
                    {URLs?.map(file => {
                        const extension = file?.split('.').pop().toLowerCase(); // Extract and normalize extension
                        if (['jpg', 'jpeg', 'png'].includes(extension)) {
                            return <img
                                className="h-[500px] w-full object-fill rounded-md"
                                src={file}
                                preview={true} // Enables the preview feature
                            />
                        } else if (extension === 'mp4') {
                            return <video
                                className="h-[500px] w-full object-fill rounded-md"
                                src={file} // URL of the video
                                controls={false} // Shows the default video controls
                                muted={true} // Video will not autoplay muted, user can play it manually
                                loop={true} // Does not loop, user controls playback
                                autoPlay
                            />
                        }
                    })}
                </div>
            </div>
            : <div className='h-[90vh] bg-slate-100'>
                <Loader page="services" />
            </div>
    );
};


export default SliderSection;
