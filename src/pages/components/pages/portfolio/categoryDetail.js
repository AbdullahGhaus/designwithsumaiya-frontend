import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { message, Spin } from 'antd'
import appConfig from '../../../../utils/config'

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
                        <div className='absolute inset-0 bg-[#000000] opacity-0 group-hover:opacity-70 transition-all z-10 flex items-center justify-center' >
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
        <Spin spinning={loader}>
            <div className='pt-16 flex flex-col'>
                <div className='flex items-center justify-center cooper text-[50px] tracking-[1px] py-14 text-white bg-custom-red border-b border-custom-army_green' data-aos-duration="2000" data-aos="fade-down">{location?.state?.name}.</div>
            </div>
            <CustomGallery
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
        </Spin>
    )
}

export default CategoryDetail