import React from 'react'
import thuglife from "../../../../assets/images/thuglife.png"

const Warning = () => {
    return (
        <div className='flex items-center justify-center mt-40 mb-20'>
            <di className='calvino text-[30px] font-semibold tracking-wide relative'>
                Warning: May turn your brief into something unexpectedly cool
                <img src={thuglife} className='w-[230px] absolute -top-[100px] -right-[70px] scale-x-[-1] rotate-[16deg]'/>
            </di>
        </div>
    )
}

export default Warning