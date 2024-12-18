import { Carousel, Image, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import appConfig from '../../../../utils/config';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const MyWork = () => {

    const [work, setWork] = useState([]);
    const [loader, setLoader] = useState(false);

    console.log(work);

    const fetchMyWork = async () => {
        setLoader(true);
        const response = await fetch(`${appConfig.api_url}/projects`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
        });

        let result = await response.json();

        if (result.success) {
            let files = result?.projects?.flatMap(x => x?.files?.slice(0, 2)); // Flatten the files array and take first 2 files
            setWork(files);
            setLoader(false);
        } else {
            message.error(result.message);
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchMyWork();
    }, []);

    const renderMedia = (fileUrl) => {
        const extension = fileUrl?.split('.').pop().toLowerCase(); // Extract and normalize extension

        if (['jpg', 'jpeg', 'png'].includes(extension)) {
            return (
                <Image
                    className="h-auto max-w-full"
                    src={fileUrl}
                    alt="image"
                    preview={true} // Enables the preview feature
                    fallback="https://via.placeholder.com/150"
                    data-aos="zoom-in" data-aos-duration="1000"// Fallback if image fails to load
                />
            );
        } else if (extension === 'mp4') {
            return (
                <video
                    className="h-auto max-w-full rounded-lg"
                    src={fileUrl} // URL of the video
                    controls={false} // Shows the default video controls
                    muted={true} // Video will not autoplay muted, user can play it manually
                    autoPlay
                    loop={true} // Does not loop, user controls playback
                    alt="video"
                    data-aos="zoom-in" data-aos-duration="1000"
                />
            );
        } else {
            return null;
        }
    };

    return (
        <Spin spinning={loader}>
            <div className="bg-custom-creame flex flex-col gap-10 pb-10 border-b border-custom-army_green">
                <div className="flex items-center justify-center bg-[#fcde9c] text-custom-army_green py-10 border-y border-custom-army_green">
                    <h2 className="text-center text-5xl font-bold text-[#4b4c02] cooper ">My Work.</h2>
                </div>
                <ResponsiveMasonry
                    className="p-10"
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry gutter="10px">
                        {work?.map((fileUrl) => {
                            return renderMedia(fileUrl)
                        })}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </Spin>
    );
};

export default MyWork;
