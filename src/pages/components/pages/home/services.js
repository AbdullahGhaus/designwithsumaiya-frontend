import React, { useEffect, useRef, useState } from 'react';
import CryptoJS from "crypto-js"
import { message, Spin } from 'antd';
import appConfig from '../../../../utils/config';
import { useNavigate } from 'react-router-dom';

const Services = () => {

    const navigate = useNavigate()
    const contentRef = useRef(null);
    const cardRefs = useRef([]);
    const [loader, setLoader] = useState(false)
    const [services, setServices] = useState([])

    const ComponentMap = ({ name, index, id }) => (
        <div
            ref={(el) => {
                if (el) cardRefs.current[index] = el;
            }}
            data-aos="zoom-in" data-aos-duration={`1000`}
            data-aos-delay={`${index * 200}`}
            data-aos-anchor-placement="top-bottom"
            className="relative bg-white rounded-lg shadow-md border-t-8 border-custom-main_pink p-6 md:p-12"
        >
            <div className="absolute top-4 left-4 w-4 h-4 bg-[#4b4c02] rounded-full"></div>
            <div className="absolute top-4 right-4 w-4 h-4 bg-[#4b4c02] rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 bg-[#4b4c02] rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 bg-[#4b4c02] rounded-full"></div>
            <h2 className="text-[#bb967d] text-[18px] md:text-2xl font-bold text-center cooper  w-[300px] h-[100px] flex items-center justify-center">
                {name}
            </h2>
            <div className="flex justify-center">
                <button className="bg-custom-main_pink text-[#96272c] px-4 py-2 font-semibold rounded-full shadow text-[12px]" onClick={() => navigate(`/category/${id}`, { state: { name } })}>
                    PROJECTS
                </button>
            </div>
        </div >
    );

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
        <Spin spinning={loader}>
            <div ref={contentRef} className="flex justify-center items-center min-h-[80vh] py-10 bg-custom-main_brown relative overflow-hidden">
                <div
                    className="absolute left-0 top-0 bottom-0 w-10 bg-custom-main_pink hidden md:flex items-center justify-center transform origin-left"
                >
                    <span className="text-[#96272c] font-bold text-[12px] tracking-[10px] rotate-[-90deg]" >
                        {/* SERVICES */}
                    </span>
                </div>
                <div
                    className="absolute right-0 top-0 bottom-0 w-10 bg-custom-main_pink hidden md:flex items-center justify-center transform origin-right"
                >
                    <span className="text-[#96272c] font-bold text-[12px] tracking-[10px] rotate-[90deg]">
                        {/* SERVICES */}
                    </span>
                </div>
                <div className="flex items-center justify-center flex-wrap gap-4">
                    {services?.length ? services?.map((service, index) => (
                        <ComponentMap key={index} index={index} name={service?.name} id={service?._id} />
                    )) : <></>}
                </div>
            </div>
        </Spin>
    );
};

export default Services;
