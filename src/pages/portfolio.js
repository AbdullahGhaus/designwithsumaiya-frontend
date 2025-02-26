import { message, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appConfig from '../utils/config'
import Loader from '../components/loader'

const Portfolio = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [services, setServices] = useState([])

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

    const ComponentMap = ({ name, projects, thumbnail, index, _id }) => (
        <div
            className="relative w-full h-[80vh] cursor-pointer"
            onClick={() => navigate(`/category/${_id}`, { state: { name } })}
            data-aos-duration="2000"
            data-aos="zoom-in"
        >
            {/* Background Image */}
            <img
                src={thumbnail}
                alt="Thumbnail"
                className="absolute inset-0 w-full h-full object-cover rounded-3xl blur-sm"
            />

            {/* Heading Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className='flex flex-col gap-1 items-center bg-custom-main_creame p-2 rounded-3xl'>
                    {/* <span className="text-custom-main_green text-[10px] font-semibold tracking-[1px]">
                        Service.
                    </span> */}
                    <h2 className="text-[#917461] text-[20px] md:text-[30px] sm:text-[40px] font-semibold text-center">
                        {name}.
                    </h2>
                </div>
            </div>

            {/* Optional Dark Overlay for Better Readability */}
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-3xl"></div>
        </div>
    );


    return (
        loader
            ? <div className='h-[100vh] bg-slate-100'>
                <Loader page="services" />
            </div>
            : <div className='flex flex-col py-14'>
                <div className='flex items-center justify-center cooper text-[35px] sm:text-[50px] py-10 md:py-20 text-[#917461] font-semibold' data-aos-duration="2000" data-aos="fade-down">Portfolio.</div>
                <div className={`flex flex-col gap-10 sm:gap-20 my-10 px-5 sm:px-14 ${!services?.length ? "w-full h-[50vh]" : ""}`}>
                    {services?.length
                        ? services?.sort((a, b) => a?.sortOrder - b?.sortOrder)?.map((service, index) => <ComponentMap {...service} index={index} />)
                        : <div className='flex flex-col gap-5 my-20'>
                            <div className='flex flex-col items-center justify-center gap-3' data-aos="zoom-in" data-aos-duration="1250">
                                <span className='cooper text-[30px] sm:text-[35px] text-custom-army_green text-center'>Portfolio Coming Soon!</span>
                                <span className='text-[14px] text-custom-army_green text-center'>The services are currently being updated. Please check back soon for new and exciting services.</span>
                            </div>
                            <div className='flex items-center justify-center' data-aos="zoom-in" data-aos-duration="1250">
                                <button className='bg-[#ffb5d5] text-custom-army_green hover:bg-[#fdbdd9] transition-all px-4 py-2 text-[12px] rounded-full font-medium w-[150px]' onClick={() => navigate("/contact-me")}>Contact Me</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
    )
}

export default Portfolio
