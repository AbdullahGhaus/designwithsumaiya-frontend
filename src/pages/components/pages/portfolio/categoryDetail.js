import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { message, Spin } from 'antd'
import appConfig from '../../../../utils/config'
import Loader from '../../../../components/loader'

const CategoryDetail = () => {

    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState([])

    const fetchProjectDetails = async () => {
        setLoader(true)
        const response = await fetch(`${appConfig.api_url}/project/category/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
        });

        let result = await response.json()

        if (result.success) {
            setData(result?.projects)
            return setLoader(false)
        }
        else {
            message.error(result?.message)
            return setLoader(false)
        }
    }

    useEffect(() => {
        fetchProjectDetails()
    }, [])


    function filterImageUrls(urls) {
        // Regular expression to match image file extensions
        const imageRegex = /\.(jpg|jpeg|png)(?=\?|#|$)/i;
        // Filter the array to include only URLs that match the regex
        return urls.filter(url => imageRegex.test(url));
    }

    const CustomGallery = ({ imageUrls }) => {
        return (
            <div className="items-center justify-center flex flex-wrap gap-10 my-10" data-aos-duration="2000" data-aos="zoom-in">
                {imageUrls?.map(({ url, name, id }, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-lg cursor-pointer" onClick={() => navigate(`/project/${id}`)}>
                        <div className='absolute inset-0 bg-[#000000] opacity-70 md:opacity-0 md:group-hover:opacity-70 transition-all z-10 flex items-center justify-center' >
                            <div className="flex flex-col">
                                <span className="text-white text-[12px] font-semibold tracking-[3px]">Project</span>
                                <span className='text-white text-[40px] cooper tracking-[1px]'>{name}</span>
                            </div>
                        </div>
                        <img
                            src={url}
                            alt={`Gallery ${index}`}
                            className="w-[400px] h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        loader
            ? <div className='h-[100vh] bg-slate-100'>
                <Loader page="services" />
            </div>
            : <div className='py-16 px-5 flex flex-col'>
                <div className='flex items-center justify-center cooper text-[35px] md:text-[50px] text-center py-10 md:py-20 text-[#917461] font-semibold' data-aos-duration="2000" data-aos="fade-down">{location?.state?.name}.
                </div>
                {data?.length
                    ? <CustomGallery
                        imageUrls={data?.map(x => filterImageUrls(x?.files)[0]) // Access the first file from the `files` array
                            .flat() // Flatten the array if it's nested
                            .map((y, index) => {
                                const name = data[index]?.name; // Use the `name` from the same `data` object
                                const id = data[index]?._id; // Use the `name` from the same `data` object
                                return {
                                    id,
                                    url: y,  // The image URL
                                    name: name  // The name extracted from `x?.name`
                                };
                            })}
                    />
                    : <div className='flex flex-col gap-5 my-20'>
                        <div className='flex flex-col items-center justify-center gap-3' data-aos="zoom-in" data-aos-duration="1250" >
                            <span className='cooper text-[25px] md:text-[35px] text-custom-army_green text-center' >Projects Coming Soon!</span>
                            <span className='text-[12px] md:text-[14px] text-custom-army_green text-center' >This category is currently being updated. Please check back soon for new and exciting projects.</span>
                        </div>
                        <div className='flex items-center justify-center' data-aos="zoom-in" data-aos-duration="1250">
                            <button className='bg-[#ffb5d5] text-custom-army_green hover:bg-[#fdbdd9] transition-all px-4 py-2 text-[10px] md:text-[12px] rounded-full font-medium w-[150px]' onClick={() => navigate("/contact-me")}>Contact Me</button>
                        </div>
                    </div>
                }
            </div>

    )
}

export default CategoryDetail