import React, { useEffect, useRef, useState } from 'react'
import girl from "../assets/images/girl.jpg"
import { DiIllustrator, DiPhotoshop } from 'react-icons/di'
import { SiAdobeillustrator, SiAdobeindesign, SiAdobelightroom, SiAdobephotoshop, SiAdobexd } from 'react-icons/si'
import appConfig from '../utils/config'
import { message } from 'antd'
import { Link } from 'react-router-dom'

const AboutMe = () => {
    const [loaderResume, setLoaderResume] = useState(false)
    const [resume, setResume] = useState(null)

    const fetchResume = async () => {
        setLoaderResume(true)
        const response = await fetch(`${appConfig.api_url}/resume`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("access-token")
            }
        });
        setLoaderResume(false)
        let result = await response.json()

        if (result?.success) {
            setLoaderResume(false)
            setResume(result?.user?.resume)
        }
        else {
            message.error(result?.message)
        }
        setLoaderResume(false)
    }

    useEffect(() => {
        fetchResume()
    }, [])

    return (
        <div div className='flex flex-col py-16 ' >
            <div className='flex flex-col'>
                <div className='flex items-center justify-center  text-[50px] tracking-[1px] py-14 text-white bg-custom-red border-b border-custom-army_green' ><span data-aos-duration="2000" data-aos="fade-down" className='cooper'>About Me.</span></div>
            </div>
            <div className='flex flex-col gap-20 px-10'>
                <div className='grid grid-cols-12 py-10 relative'>
                    <div className='col-span-6 flex flex-col gap-14 justify-center pt-[-50px]'>
                        <div className='flex flex-col' data-aos-duration="2000" data-aos="fade-right">
                            <span className='cooper text-[50px] text-custom-army_green font-normal'>Hey, this is {resume?.name}!</span>
                            <span className='text-custom-army_green w-[90%] text-[20px]'>{resume?.summary}</span>
                            <span className='text-custom-army_green w-[90%] text-[20px] mt-3'>
                                For work related queries, email at: <Link to={`mailto:${resume?.email}`} className='font-bold cursor-pointer'>{resume?.email}</Link>
                            </span>
                        </div>
                        <a
                            href={resume?.url}
                            target={"_blank"}
                            className="max-w-fit px-4 text-[14px] uppercase border-2 rounded-full border-custom-army_green py-2 text-custom-army_green font-semibold bg-[#ffb5d5]"
                            data-aos="zoom-in"
                            data-aos-duration="3000"
                            rel="noreferrer"
                        >
                            Download My Resume
                        </a>
                    </div>
                    <div className='col-span-6 flex items-center  justify-end relative gap-3'>
                        <img alt="" src={girl} className='object-contain w-[300px] z-10 mt-[-20px]' data-aos-duration="2000" data-aos="fade-left" />
                        <img alt="" src={girl} className='object-contain w-[300px] z-10 mt-[20px]' data-aos-duration="2000" data-aos="fade-left" />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-10'>
                    <div className='flex flex-col gap-3'>
                        <span className='cooper text-custom-army_green text-[30px]' data-aos="fade-right">Skilled In.</span>
                        <div className="flex items-center flex-wrap gap-3">
                            {resume?.skills?.split(",")?.map((x, i) => (
                                <span key={i} className="max-w-fit px-4 text-[14px] uppercase border-2 rounded-full border-custom-army_green py-2 text-custom-army_green font-semibold bg-[#ffb5d5]" data-aos="fade-right" data-aos-duration="1000" data-aos-delay={`${i * 200}`}>
                                    {x}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className='cooper text-custom-army_green text-[30px]' data-aos="fade-right">Education.</span>
                        <div className='flex flex-col gap-5'>
                            {resume?.education?.map((x, idx) => (
                                <div key={idx} className="" data-aos="fade-right" data-aos-duration="1000" data-aos-delay={`${idx * 200}`}>
                                    <h3 className="font-semibold text-custom-army_green text-[20px]">{x.degree}</h3>
                                    <p className='text-custom-army_green '>{x?.department}, {x.institute}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <span className='cooper text-custom-army_green text-[30px]' data-aos="fade-right">Experience.</span>
                    <div className='flex flex-col gap-5'>
                        {resume?.experience?.map((x, idx) => (
                            <div key={idx} className="" data-aos="fade-right" data-aos-duration="1000" data-aos-delay={`${idx * 200}`}>
                                <h3 className="font-semibold text-custom-army_green text-[20px]">{x.designation}, {x?.office}</h3>
                                <p className="text-sm text-gray-600">{x.date}</p>
                                {/* <ul className="list-disc list-inside mt-1 text-gray-700">
                                    {x.description?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul> */}
                                <span>{x?.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutMe