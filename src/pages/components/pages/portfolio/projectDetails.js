import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Image, message, Spin } from 'antd'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import appConfig from '../../../../utils/config'
import Loader from '../../../../components/loader'

const ProjectDetails = () => {

    const { id } = useParams()
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState([])

    const fetchSubFolder = async () => {
        setLoader(true)
        const response = await fetch(`${appConfig.api_url}/project/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
        });
        let result = await response.json()

        if (result.success) {
            setData(result?.project)
            return setLoader(false)
        }
        else {
            message.error(result?.message)
            return setLoader(false)
        }
    }

    useEffect(() => {
        fetchSubFolder()
    }, [])

    return (
        loader
            ? <div className='h-[100vh] bg-slate-100'>
                <Loader page="services" />
            </div>
            : <>
                <div className='py-10 md:py-20 flex flex-col items-center justify-center'>
                    <div className='cooper text-[35px] md:text-[50px] pt-12 text-[#917461] font-semibold' data-aos-duration="2000" data-aos="fade-down">{data?.name}.</div>
                    <div className='cooper text-[12px] md:text-[15px] tracking-[1px] text-[#917461]' data-aos-duration="2500" data-aos="fade-down">
                        Category - {data?.categoryID?.name}
                    </div>
                </div>
                <div className='flex flex-col gap-5 justify-center mb-20'>
                    {data?.categorizedMedia?.images?.length
                        ? <div className={`p-5 md:p-10 grid grid-cols-${Math.min(3, data?.categorizedMedia?.images?.length || 0)} gap-4`}>
                            {data?.categorizedMedia?.images?.map(x => {
                                return <Image
                                    className="h-auto max-w-"
                                    src={x}
                                    preview={true}  // Enables the preview feature
                                />
                            })}
                        </div>
                        : <></>
                    }
                    {data?.categorizedMedia?.videos?.length
                        ? <div className={`p-5 md:p-10 grid grid-cols-${Math.min(3, data?.categorizedMedia?.videos?.length || 0)} gap-4`}>
                            {data?.categorizedMedia?.videos?.map(x => {
                                return <video
                                    className="h-auto max-w-full"
                                    src={x}  // URL of the video
                                    controls  // Shows the default video controls
                                    muted={true}  // Video will not autoplay muted, user can play it manually
                                    loop={true}   // Does not loop, user controls playback
                                    autoPlay
                                />
                            })}
                        </div>
                        : <></>
                    }
                    {data?.categorizedMedia?.stories?.length
                        ? data?.categorizedMedia?.stories?.map(story =>
                            <div
                                className={`p-5 md:p-10 grid gap-4 ${story?.files?.length === 1
                                    ? 'grid-cols-1'
                                    : 'grid-cols-2 md:grid-cols-4'
                                    }`}
                            >
                                {story?.files?.length
                                    ? story?.files?.map(file => {
                                        const extension = file?.split('.').pop().toLowerCase(); // Extract and normalize extension
                                        if (['jpg', 'jpeg', 'png'].includes(extension)) {
                                            return <Image
                                                className="h-auto max-w-full"
                                                src={file}
                                                preview={true} // Enables the preview feature
                                            />
                                        } else if (extension === 'mp4') {
                                            return <video
                                                className="h-auto max-w-full"
                                                src={file} // URL of the video
                                                controls // Shows the default video controls
                                                muted={true} // Video will not autoplay muted, user can play it manually
                                                loop={true} // Does not loop, user controls playback
                                                autoPlay
                                            />
                                        }
                                    })
                                    : <></>
                                }
                            </div>
                        )
                        : <></>
                    }
                </div>
            </>


    )
}

export default ProjectDetails