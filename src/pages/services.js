import React, { useEffect } from 'react'

const Services = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='flex flex-col gap-5'>
            services
        </div>
    )
}

export default Services