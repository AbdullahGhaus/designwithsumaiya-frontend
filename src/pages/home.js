import React, { useEffect, useRef } from 'react'
import girl from "../assets/images/girl.jpg"

import gsap from 'gsap';
import Landing from './components/pages/home/landing';
import Services from './components/pages/home/services';
import MyWork from './components/pages/home/myWork';

const Home = () => {

    return (
        <div className='flex flex-col'>
            <Landing />
            <Services />
            {/* <MyWork /> */}
        </div>
    )
}

export default Home