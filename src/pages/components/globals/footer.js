import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaPhoneAlt } from 'react-icons/fa';
import CustomButton from '../../../components/buttons';
import logo from "../../../assets/images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { ImLinkedin2 } from "react-icons/im";
import { BiLogoLinkedin } from "react-icons/bi";
import { message } from 'antd';
import appConfig from '../../../utils/config';



const Footer = ({ page = "default" }) => {

  let navigate = useNavigate();
  const [loaderResume, setLoaderResume] = useState(false)
  const [resume, setResume] = useState(null)

  let details = [
    { head: "Email", description: <Link to={`mailto:${resume?.resume?.email}`}>{resume?.resume?.email}</Link> },
  ];

  let services = resume?.resume?.skills?.split(",");


  let links = [
    { link: "/about-me", name: "About Me" },
    { link: "/portfolio", name: "Portfolio" },
    { link: "/about-me", name: "Resume" },
    { link: "/contact-me", name: "Contact Me" },
  ];

  const fetchResume = async () => {
    setLoaderResume(true)
    const response = await fetch(`${appConfig.api_url}/resume`, {
      method: "GET",
      headers: {
        "Authorization": localStorage.getItem("access-token")
      }
    });
    setLoaderResume(false)
    let result = await response.json()

    if (result?.success) {
      setLoaderResume(false)
      setResume(result?.user)
    }
    else {
      message.error(result?.message)
    }
    setLoaderResume(false)
  }

  useEffect(() => {
    fetchResume()
  }, [])


  return (
    <footer className="flex flex-col">
      {/* Contact Us Section */}
      {window.location.pathname !== "/contact-us" ? (
        <div className='flex flex-col gap-5 py-10 md:py-20 bg-custom-creame map_bg bg-contain bg-no-repeat bg-center'>
          <div className='flex items-center justify-center' data-aos="zoom-in" data-aos-duration="2000">
            <span className='text-center font-semibold text-xl md:text-2xl lg:text-3xl w-[90%] md:w-[60%] lg:w-[35%] cooper text-custom-army_green uppercase'>
              Feel free to get in touch if I can be of any assistance
            </span>
          </div>
          <div className='flex items-center justify-center' data-aos="zoom-in" data-aos-duration="2000">
            <div className="flex items-center justify-center w-[100px] h-[100px] rounded-full bg-custom-army_green text-custom-creame uppercase text-center cursor-pointer" onClick={() => navigate("/contact-me")}>Contact Me</div>
          </div>
        </div>
      ) : null}

      {/* Footer Details Section */}
      <div className="bg-custom-army_green py-10 md:py-[80px] flex justify-center text-custom-creame">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-5 lg:ml-32 justify-center w-[90%] md:w-[80%]'>
          {/* Logo and Details */}
          <div className='flex flex-col justify-between gap-5'>
            <div className='flex flex-col' data-aos="fade-right" data-aos-duration="1000">
              <img src={logo} alt="Logo" className="w-[80px] md:w-[150px] ml-[-17px]" />
              <span className='text-[12px] w-full md:w-[80%]'>A social-first creative and performance partner for consumer brands.</span>
            </div>
            {details?.map((x, i) => (
              <div key={i} className='flex items-start gap-1' data-aos="fade-right" data-aos-duration="1200">
                <span className='text-[12px] font-semibold'>{x.head}:</span>
                <span className='text-[12px]'>{x.description}</span>
              </div>
            ))}
          </div>

          {/* Services Section */}
          <div className='flex flex-col justify-between gap-2' data-aos="fade-right" data-aos-duration="1500">
            <span className='text-[16px] md:text-[20px] text-custom-creame font-medium h-[53px] pt-2 md:pt-5'>
              I Offer
            </span>
            {services?.map((x, i) => (
              <span key={i} onClick={() => navigate("/portfolio")} className='text-[12px] capitalize hover:text-custom-creame cursor-pointer transition-all hover:-translate-y-[2px]'>
                {x}
              </span>
            ))}
          </div>

          {/* Quick Links Section */}
          <div className='flex flex-col gap-3' data-aos="fade-right" data-aos-duration="1700">
            <span className='text-[16px] md:text-[20px] text-custom-creame font-medium h-[53px] pt-2 md:pt-5'>
              Quick Links
            </span>
            {links?.map((x, i) => (
              <span
                key={i}
                onClick={() => navigate(x.link)}
                className='text-[12px] capitalize hover:text-custom-creame cursor-pointer transition-all hover:-translate-y-[2px]'
              >
                {x.name}
              </span>
            ))}
          </div>

          <div className='flex flex-col gap-3 mt-5' data-aos="fade-right" data-aos-duration="2000">
            <FaInstagram className='text-custom-army_green bg-custom-creame rounded-full text-[5px] p-[10px] w-[50px] h-[50px] cursor-pointer ' />
            <FaPinterestP className='text-custom-army_green bg-custom-creame rounded-full text-[5px] p-[10px] w-[50px] h-[50px] cursor-pointer ' />
            <BiLogoLinkedin className='text-custom-army_green bg-custom-creame rounded-full text-[5px] p-[10px] w-[50px] h-[50px] cursor-pointer ' />

          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className='flex justify-center bg-custom-army_green'>
        <div className='w-[90%] md:w-[80%] py-3 text-center text-[14px] text-custom-creame'>
          Copyright © 2024 Design With Sumaiya. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
