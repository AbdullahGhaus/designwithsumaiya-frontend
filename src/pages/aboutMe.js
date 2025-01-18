import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { Link } from 'react-router-dom'
import appConfig from '../utils/config'
import Loader from '../components/loader'

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
            setResume(result?.user?.resume)
        }
        else {
            message.error(result?.message)
        }
    }

    useEffect(() => {
    fetchResume()
    }, [])

    return (
        loaderResume
            ? <div className='h-[100vh] bg-slate-100'>
                <Loader page="services" />
            </div>
            : <div className='flex flex-col gap-20 py-16 px-5 md:px-10 mb-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 py-16'>
                    <div className='flex flex-col gap-14 justify-center'>
                        <div data-aos-duration="2000" data-aos="fade-right" data-aos-anchor-placement="top-bottom" className='flex flex-col gap-3'>
                            <span className='cooper text-[28px] md:text-[35px]  text-[#bb967d] font-semibold'>Hey, this is {resume?.name}!</span>
                            <span className='text-[black] text-[12px] md:text-[16px]'>{resume?.summary}</span>
                            <span className='text-[black] text-[12px] md:text-[16px] mt-3'>
                                For work related queries, email at: <Link to={`mailto:${resume?.email}`} className='font-bold'>{resume?.email}</Link>
                            </span>
                        </div>
                        <a
                            href={resume?.url}
                            target={"_blank"}
                            className="max-w-fit px-4 text-[10px] md:text-[12px] border-2 rounded-full border-custom-main_green py-2 text-white font-semibold bg-custom-main_green"
                            data-aos="zoom-in"
                            data-aos-duration="3000"
                            data-aos-anchor-placement="top-bottom"
                            rel="noreferrer"
                        >
                            My Resume
                        </a>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
                    <div className='flex flex-col gap-3'>
                        <span className='cooper text-[#917461] font-semibold text-[25px] md:text-[30px]' data-aos="fade-right">Skilled In.</span>
                        <div className="flex items-center flex-wrap gap-3">
                            {resume?.skills?.split(",")?.map((x, i) => (
                                <span key={i} className="max-w-fit px-4 text-[10px] md:text-[12px] uppercase border-2 rounded-full border-[#bb967d] py-2 text-[#bb967d] font-semibold" data-aos-anchor-placement="top-bottom" data-aos="fade-right" data-aos-duration="1000" data-aos-delay={`${i * 200}`}>
                                    {x}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className='cooper text-[#917461] font-semibold text-[25px] md:text-[30px]' data-aos="fade-right">Education.</span>
                        <div className='flex flex-col gap-5'>
                            {resume?.education?.map((x, idx) => (
                                <div key={idx} data-aos="fade-right" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" data-aos-delay={`${idx * 200}`}>
                                    <h3 className="font-semibold text-gray-600 text-[13px] md:text-[16px]">{x.degree}</h3>
                                    <p className='text-[black] text-[10px] md:text-[12px]'>{x?.department}, {x.institute}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <span className='cooper text-[#917461] font-semibold text-[25px] md:text-[30px]' data-aos="fade-right">Experience.</span>
                    <div className='flex flex-col gap-5'>
                        {resume?.experience?.map((x, idx) => (
                            <div key={idx} className='flex flex-col gap-2' data-aos-anchor-placement="top-bottom" data-aos="fade-right" data-aos-duration="1000" data-aos-delay={`${idx * 200}`}>
                                <h3 className="font-semibold text-[black] text-[13px] md:text-[16px]">{x.designation}, {x?.office}</h3>
                                <p className="text-gray-600 text-[8px] md:text-[10px]">{x.date}</p>
                                <div className='flex flex-col gap-1 w-full md:w-[70%]'>
                                    {x?.description?.split("\n")?.map((point, index) => <span key={index} className='text-[11px] md:text-[14px]'>{point}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    )
}

export default AboutMe
