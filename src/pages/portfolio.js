import { message, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
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
            className="relative bg-custom-creame w-full rounded-2xl shadow-md border border-custom-army_green grid grid-cols-2 gap-5 p-10 cursor-pointer hover:shadow-2xl transition-all hover:bg-custom-light_creame"
            onClick={() => navigate(`/category/${_id}`, { state: { name } })}
            data-aos-duration="2000" data-aos="zoom-in"
        >
            <div className="absolute top-4 left-4 w-5 h-5 bg-[#4b4c02] rounded-full"></div>
            <div className="absolute top-4 right-4 w-5 h-5 bg-[#4b4c02] rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-5 h-5 bg-[#4b4c02] rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-5 h-5 bg-[#4b4c02] rounded-full"></div>
            <div className={`col-span-1 flex flex-col gap-5 justify-center px-5 odd:order-2 ${index % 2 === 1 ? "order-2" : "order-1"}`}>
                <div className="flex flex-col">
                    <span className="text-custom-army_green text-[10px] font-semibold tracking-[1px]">Service.</span>
                    <h2 className="text-[#4b4c02] text-[40px] font-medium cooper">
                        {name}.
                    </h2>
                </div>
                <span className='text-[17px] text-custom-army_green mt-[-10px]'>Lifelines partnered with us to launch new products, and our strategic art direction and high-quality assets helped elevate their brand’s visual identity across digital platforms.</span>
                <div className="flex items-center flex-wrap gap-3">
                    {projects?.map((project, i) => (
                        <span key={i} className="max-w-fit px-4 text-[14px] uppercase border-2 rounded-full border-custom-army_green py-2 text-custom-army_green font-semibold bg-[#ffb5d5]">
                            {project?.name}
                        </span>
                    ))}
                </div>
            </div>
            <div className={`flex items-center justify-center col-span-1 ${index % 2 === 1 ? "order-1" : "order-2"}`}>
                <div className="w-full h-[550px]">
                    <img
                        src={thumbnail}
                        alt="Thumbnail"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>
            </div>

        </div >
    );


    return (
        <div className='flex flex-col pt-14'>
            <div className='flex items-center justify-center cooper text-[50px] tracking-[1px] py-20 text-white bg-custom-red border-b border-custom-army_green' data-aos-duration="2000" data-aos="fade-down">Portfolio.</div>
            <Spin spinning={loader}>
                <div className={`flex flex-col gap-20 mt-10 px-14 ${!services?.length ? "w-full h-[50vh]" : ""}`}>
                    {
                        services?.map((service, index) => <ComponentMap {...service} index={index} />)
                    }
                </div>
            </Spin>
        </div>
    )
}

export default Portfolio