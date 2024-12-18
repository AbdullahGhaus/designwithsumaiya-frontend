import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Image, message, Spin } from 'antd'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import appConfig from '../../../../utils/config'

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
        <Spin spinning={loader}>
            <div className='pt-16 flex flex-col'>
                <div className='flex flex-col items-center justify-center gap-3 py-14 border-b border-custom-army_green bg-custom-red' >
                    <div className='cooper text-[50px] tracking-[1px] text-white ' data-aos-duration="2000" data-aos="zoom-in">{data?.name}.</div>
                    <div className='cooper text-[15px] tracking-[1px] text-white ' data-aos-duration="2300" data-aos="zoom-in">Category - {data?.categoryID?.name}</div>

                </div>
            </div>
            <ResponsiveMasonry
                className='p-10'
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
                <Masonry gutter='20px'>
                    {data?.files?.map(x => {
                        const extension = x?.split('.').pop().toLowerCase(); // Extract and normalize extension

                        if (['jpg', 'jpeg', 'png'].includes(extension)) {
                            return <Image
                                className="h-auto max-w-full"
                                src={x}
                                preview={true}  // Enables the preview feature
                            />
                        } else if (extension === 'mp4') {
                            return <video
                                className="h-auto max-w-full rounded-lg"
                                src={x}  // URL of the video
                                controls  // Shows the default video controls
                                muted={true}  // Video will not autoplay muted, user can play it manually
                                loop={true}   // Does not loop, user controls playback
                                autoPlay
                            />
                        }
                    })}
                </Masonry>
            </ResponsiveMasonry>
        </Spin>
    )
}

export default ProjectDetails