import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import appConfig from '../../../../utils/config';
import Loader from '../../../../components/loader';
import logo from "../../../../assets/images/logo.png"

const CategoryDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    const fetchProjectDetails = async () => {
        setLoader(true);

        const response = await fetch(`${appConfig.api_url}/project/category/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('access-token'),
            },
        });

        const result = await response.json();

        if (result.success) {
            const projects = result.projects;

            // Extract the first image URLs from each project's files
            const urls = projects.map((project) => {
                const images = filterImageUrls(project?.files || []);
                return images[0] || null; // Use the first image or null if no images
            });

            // Wait for all images to load
            await preloadImages(urls);

            setData(projects);
            setImageUrls(urls.map((url, index) => ({
                id: projects[index]?._id,
                name: projects[index]?.name,
                url,
            })));

            setLoader(false);
        } else {
            message.error(result.message);
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchProjectDetails();
    }, []);

    console.log(imageUrls);


    const filterImageUrls = (urls) => {
        const imageRegex = /\.(jpg|jpeg|png)(?=\?|#|$)/i;
        return urls.filter((url) => imageRegex.test(url));
    };

    const preloadImages = (urls) => {
        // Create a Promise for each image load
        const promises = urls.map((url) => {
            if (!url) return Promise.resolve(); // Skip if URL is null
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = resolve; // Resolve when the image loads
                img.onerror = reject; // Reject if the image fails to load
            });
        });

        // Return a Promise that resolves when all images are loaded
        return Promise.all(promises);
    };

    const CustomGallery = ({ imageUrls }) => {
        return (
            <div
                className="items-center justify-center flex flex-wrap gap-10 my-10"
                data-aos-duration="2000"
                data-aos="zoom-in"
            >
                {imageUrls.map(({ url, name, id }, index) => (
                    <div
                        className="relative flex-col items-center justify-center gap-3 flex cursor-pointer"
                        onClick={() => navigate(`/project/${id}`)}
                        key={index}
                    >
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-[1]">
                            <span className="text-[18px] text-center font-bold bg-custom-main_creame p-2 rounded-md text-custom-army_green shadow-md">{name}</span>
                        </div>
                        <img
                            src={url || logo}
                            alt={`Gallery ${index}`}
                            className={`w-[400px] h-[400px] blur-sm opacity-70 ${url ? "object-cover" : "object-contain"}`}
                        />


                    </div>
                ))}
            </div>
        );
    };

    return loader ? (
        <div className="h-[100vh] bg-slate-100">
            <Loader page="services" />
        </div>
    ) : (
        <div className="py-16 px-5 flex flex-col">
            <div className="flex flex-col gap-2 items-center justify-center  py-10 md:py-20">
                <div
                    className="flex items-center justify-center cooper text-[35px] md:text-[50px] text-center text-[#917461] font-semibold"
                    data-aos-duration="2000"
                    data-aos="fade-down"
                >
                    {location?.state?.name}.
                </div>
                <div className='cooper text-[12px] md:text-[15px] tracking-[1px] text-[#917461]' data-aos-duration="2500" data-aos="fade-down">
                    Projects
                </div>
            </div>

            {imageUrls.length ? (
                <CustomGallery imageUrls={imageUrls} />
            ) : (
                <div className="flex flex-col gap-5 my-20">
                    <div
                        className="flex flex-col items-center justify-center gap-3"
                        data-aos="zoom-in"
                        data-aos-duration="1250"
                    >
                        <span className="cooper text-[25px] md:text-[35px] text-custom-army_green text-center">
                            Projects Coming Soon!
                        </span>
                        <span className="text-[12px] md:text-[14px] text-custom-army_green text-center">
                            This category is currently being updated. Please check back soon for new and exciting
                            projects.
                        </span>
                    </div>
                    <div
                        className="flex items-center justify-center"
                        data-aos="zoom-in"
                        data-aos-duration="1250"
                    >
                        <button
                            className="bg-[#ffb5d5] text-custom-army_green hover:bg-[#fdbdd9] transition-all px-4 py-2 text-[10px] md:text-[12px] rounded-full font-medium w-[150px]"
                            onClick={() => navigate('/contact-me')}
                        >
                            Contact Me
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryDetail;
