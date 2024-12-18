import React, { useEffect, useRef, useState } from 'react';
import CryptoJS from "crypto-js"
import { message, Spin } from 'antd';
import appConfig from '../../../../utils/config';

const Services = () => {

    const contentRef = useRef(null);
    const cardRefs = useRef([]);
    const [loader, setLoader] = useState(false)
    const [services, setServices] = useState([])

    const ComponentMap = ({ name, bullets, index }) => (
        <div
            ref={(el) => {
                if (el) cardRefs.current[index] = el;
            }}
            data-aos="zoom-in" data-aos-duration={`1000`}
            data-aos-delay={`${index * 200}`}
            className="relative bg-[#f9f5e4] rounded-lg shadow-md border-t-8 border-[#fbb4c1]"
        >
            <div className="absolute top-4 left-4 w-4 h-4 bg-[#4b4c02] rounded-full"></div>
            <div className="absolute top-4 right-4 w-4 h-4 bg-[#4b4c02] rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 bg-[#4b4c02] rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 bg-[#4b4c02] rounded-full"></div>
            <h2 className="text-[#4b4c02] text-2xl font-bold text-center cooper italic tracking-[2px] px-12 py-5 w-[300px] h-[100px] flex items-center justify-center">
                {name}
            </h2>
            <hr className="border-[#4b4c02]" />
            <div className="text-center flex flex-col text-[#4b4c02] font-medium tracking-widest px-12 py-5">
                {bullets?.map((bullet, i) => (
                    <span key={i} className="text-[12px] uppercase border-t border-[#4b4c02] first:border-none py-2">
                        {bullet}
                    </span>
                ))}
            </div>
            <div className="flex justify-center my-6">
                <button className="bg-[#fbb4c1] text-[#96272c] px-4 py-2 font-semibold rounded-full shadow">
                    LEARN MORE
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
            let mappedServices = result?.categories?.map(x => {
                if (x.name === "Branding") return { name: x.name, bullets: ["Photography", "Studio Videos", "Stop Motions", "Animations", "3D Renders"] }
                if (x.name === "Content Creation") return { name: x.name, bullets: ["SOCIAL STRATEGY", "UGC CONTENT", "TIKTOK VIDEOS", "INFLUENCERS", "COMMUNITY BUILDING"] }
                if (x.name === "Illustration") return { name: x.name, bullets: ["Photography", "Studio Videos", "Stop Motions", "Animations", "3D Renders"] }
                if (x.name === "Social Media Campaigns") return { name: x.name, bullets: ["Photography", "Studio Videos", "Stop Motions", "Animations", "3D Renders"] }
            })
            setServices(mappedServices)
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
            <div ref={contentRef} className="flex justify-center items-center min-h-[80vh] py-10 bg-[#ff6739] relative overflow-hidden">
                <div
                    className="absolute left-0 top-0 bottom-0 w-10 bg-[#fbb4c1] flex items-center justify-center transform origin-left"
                >
                    <span className="text-[#96272c] font-bold text-[12px] tracking-[10px] rotate-[-90deg]" >
                        SERVICES
                    </span>
                </div>
                <div
                    className="absolute right-0 top-0 bottom-0 w-10 bg-[#fbb4c1] flex items-center justify-center transform origin-right"
                >
                    <span className="text-[#96272c] font-bold text-[12px] tracking-[10px] rotate-[90deg]">
                        SERVICES
                    </span>
                </div>
                <div className="flex items-center justify-center flex-wrap gap-4">
                    {services?.length ? services?.map((service, index) => (
                        <ComponentMap key={index} index={index} name={service?.name} bullets={service?.bullets} />
                    )) : <></>}
                </div>
            </div>
        </Spin>
    );
};

export default Services;
