import React, { useEffect, useState } from 'react'
import appConfig from '../../../utils/config'
import { message, Popover, Progress, Spin } from 'antd'
import { MdRefresh } from 'react-icons/md'
import { IoMdInformationCircleOutline } from 'react-icons/io'

const CloudinaryUsage = () => {

    const [usage, setUsage] = useState(null)
    const [loader, setLoader] = useState(false)

    const fetchCloudinaryUsage = async () => {
        setLoader(true)
        const response = await fetch(`${appConfig.api_url}/cloudinary/usage`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("access-token")
            }
        });
        setLoader(false)
        let result = await response.json()

        if (result?.success) {
            setLoader(false)
            setUsage(result?.usage)
        }
        else {
            message.error(result?.message)
        }
        setLoader(false)
    }

    useEffect(() => {
        fetchCloudinaryUsage()
    }, [])

    let maxStorage = 25 * 1024 * 1024 * 1024
    let percentUsed = (usage?.storage?.usage / maxStorage) * 100


    function formatBytes(bytes) {
        const mb = 1024 * 1024; // 1 MB in bytes
        const gb = 1024 * 1024 * 1024; // 1 GB in bytes

        if (bytes < gb) {
            // If less than 1 GB, display in MB
            return (bytes / mb).toFixed(2) + ' MB';
        } else {
            // If greater than or equal to 1 GB, display in GB
            return (bytes / gb).toFixed(2) + ' GB';
        }
    }

    return (
        <Spin spinning={loader}>
            <div className='flex flex-col gap-3 p-4 border shadow-md rounded-lg bg-white'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-5'>
                        <span className='text-[15px] font-bold'>Cloudinary Storage Stats</span>
                        <Popover
                            content={<div className='flex flex-col gap-1'>
                                {usage ? Object?.entries(usage?.media_limits)?.slice(0, 3)?.map(([key, value]) => <span className='text-[9px] capitalize'>
                                    {key?.replace(/_/g, ' ')?.replace(/BYTES$/i, '')}: {formatBytes(value)}</span>) : <></>}
                            </div>}>
                            <IoMdInformationCircleOutline className='text-[20px] text-blue-600' />
                        </Popover>
                    </div>
                    <button className='flex items-center justify-center gap-2 text-[12px] bg-slate-600 text-white px-3 py-2 rounded-md'
                        onClick={() => fetchCloudinaryUsage()}>
                        <MdRefresh className='text-white text-[15px]' />
                        Refresh Stats
                    </button>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2 w-[50%]'>
                        <span className='text-[12px]'>Total storage: 25GB</span>
                    </div>
                    <div className='flex flex-col gap-2 w-[50%]'>
                        <span className='text-[12px]'>Storage Used:</span>
                        <Progress percent={percentUsed?.toFixed(2)} format={() => `${formatBytes(usage?.storage?.usage)} / 25GB`} />
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default CloudinaryUsage