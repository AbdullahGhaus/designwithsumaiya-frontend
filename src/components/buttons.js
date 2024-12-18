import React from 'react'

const CustomButton = ({ type = "default", text = "", onClickCustom = () => { } }) => {

    let map = {
        yellow: <button
            onClick={onClickCustom}
            className="px-4 py-2 bg-transparent border border-white text-white hover:text-custom-blue text-[8px] md:text-[12px] tracking-wider hover:border-custom-yellow hover:bg-custom-yellow transition-all duration-300 animate-fadeIn">
            {text}
        </button>,
        yellowFilled: <button
            onClick={onClickCustom}
            className="px-4 py-2 bg-custom-yellow border border-custom-yellow text-custom-blue text-[8px] md:text-[12px] tracking-wider transition-all hover:text-bold duration-300 animate-fadeIn hover:bg-custom-blue hover:border-custom-blue hover:text-white">
            {text}
        </button>,
        blue: <button
            onClick={onClickCustom}
            className="px-4 py-2 bg-transparent border border-custom-blue hover:text-white text-[8px] md:text-[12px] tracking-wider hover:border-custom-blue hover:bg-custom-blue transition-all duration-300 animate-fadeIn">
            {text}
        </button>,
        default: <button
            onClick={onClickCustom}
            className="px-4 py-2 bg-transparent border border-[white] text-white hover:text-black text-[8px] md:text-[12px] tracking-wider hover:bg-white transition-all duration-300 animate-fadeIn">
            {text}
        </button>,
    }
    return (
        map[type]
    )
}

export default CustomButton