import React, { useEffect, useRef } from 'react'
import Landing from './components/pages/home/landing';
import Services from './components/pages/home/services';
import Warning from './components/pages/home/warning';

const Home = () => {

    return (
        <div className='flex flex-col gap-20 mb-40'>
            <Landing />
            <Services />
            <Warning />
        </div>
    )
}

export default Home