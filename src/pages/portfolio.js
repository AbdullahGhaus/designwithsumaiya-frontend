import { message, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appConfig from '../utils/config'

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
            className="relative bg-custom-main_creame w-full rounded-2xl shadow-md border border-custom-army_green grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 cursor-pointer hover:shadow-2xl transition-all hover:bg-custom-light_creame"
            onClick={() => navigate(`/category/${_id}`, { state: { name } })}
            data-aos-duration="2000" data-aos="zoom-in"
        >
            <div className="absolute top-4 left-4 w-5 h-5 bg-custom-main_green rounded-full"></div>
            <div className="absolute top-4 right-4 w-5 h-5 bg-custom-main_green rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-5 h-5 bg-custom-main_green rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-5 h-5 bg-custom-main_green rounded-full"></div>

            <div className={`col-span-1 flex flex-col gap-5 justify-center px-5 ${index % 2 === 1 ? "order-2" : "order-1"}`}>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-custom-main_green text-[10px] font-semibold tracking-[1px]">Service.</span>
                    <h2 className="text-[#917461] text-[20px] md:text-[30px] sm:text-[40px] font-semibold text-center">
                        {name}.
                    </h2>
                </div>
            </div>
            <div className={`flex items-center justify-center col-span-1 ${index % 2 === 1 ? "order-1" : "order-2"}`}>
                <div className="w-full h-[200px] p-5 sm:p-5 sm:h-[550px]">
                    <img
                        src={thumbnail}
                        alt="Thumbnail"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className='flex flex-col py-14'>
            <div className='flex items-center justify-center cooper text-[35px] sm:text-[50px] py-10 md:py-20 text-[#917461] font-semibold' data-aos-duration="2000" data-aos="fade-down">Portfolio.</div>
            <Spin spinning={loader}>
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
            </Spin>
        </div>
    )
}

export default Portfolio
