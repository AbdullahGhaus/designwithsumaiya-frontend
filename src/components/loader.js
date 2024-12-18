// src/components/Loader.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logo from '../assets/images/logo.png';

const Loader = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    // GSAP Animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true }); // Repeat infinitely and yoyo

    // Add bounce and fade animation
    tl.to(imageRef.current, {
      scale: 1.1, // Scale up to 110%
      opacity: 0.7, // Fade out to 70% opacity
      duration: 0.5,
      ease: "power1.inOut"
    })
      .to(imageRef.current, {
        scale: 1, // Scale back to 100%
        opacity: 1, // Fade back to full opacity
        duration: 0.5,
        ease: "power1.inOut"
      });
  }, []);

  return (
    <div className="flex flex-col gap-3 justify-center items-center h-screen">
      <div className="relative w-52 h-52 flex justify-center items-center">
        <img
          ref={imageRef}
          src={logo}
          alt="Bit By Bit Loader"
          className="w-52 h-52 object-contain" // Set width and height
        />
      </div>
    </div>
  );
};

export default Loader;
