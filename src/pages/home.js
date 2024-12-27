import React, { useEffect, useRef } from 'react'
import Landing from './components/pages/home/landing';
import Services from './components/pages/home/services';

const Home = () => {

    return (
        <div className='flex flex-col mb-40'>
            <Landing />
            <Services />
        </div>
    )
}

export default Home