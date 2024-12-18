import React from 'react'

const PageHeader = ({ page }) => {
    return (
        <div className={`flex items-center justify-center pt-40 md:pt-60 pb-20 md:pb-32 relative bg-cover ${window.location.pathname === "/about-us" ? "dummy_one" :
            window.location.pathname === "/services" ? "dummy_two" : "dummy_three"
            }`}>
            <div className='absolute inset-0 bg-custom-blue opacity-50'></div>
            <span className='text-3xl md:text-5xl font-semibold text-white z-[10]'>{page}</span>
        </div>
    )
}

export default PageHeader