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
    <footer className="flex flex-col border-t-[0.75px] border-black">

      <div className="bg-custom-main_creame py-10 md:py-[80px] flex justify-center text-[#bb967d]">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-5 lg:ml-32 justify-center w-[90%] md:w-[80%]'>

          <div className='flex flex-col justify-between gap-5'>
            <div className='flex flex-col' data-aos="fade-right" data-aos-duration="1000">
              <img src={logo} alt="Logo" className="w-[200px] md:w-[250px] md:ml-[-17px] mt-[25px]" />
            </div>
            {details?.map((x, i) => (
              <div key={i} className='flex items-start gap-1' data-aos="fade-right" data-aos-duration="1200">
                <span className='text-[12px] text-custom-main_green font-semibold'>{x.head}:</span>
                <span className='text-[12px] text-black transition-all hover:-translate-y-[2px]'>{x.description}</span>
              </div>
            ))}
          </div>
          <div className='hidden md:flex md:flex-col md:justify-between md:gap-2' data-aos="fade-right" data-aos-duration="1500">
            <span className='text-[16px] md:text-[20px] text-custom-main_green font-semibold h-[53px] pt-2 md:pt-5'>
              I Offer
            </span>
            {services?.map((x, i) => (
              <span key={i} onClick={() => navigate("/portfolio")} className='text-[12px] max-w-fit text-[black] capitalize cursor-pointer transition-all hover:-translate-y-[2px]'>
                {x}
              </span>
            ))}
          </div>


          <div className='flex flex-col gap-3' data-aos="fade-right" data-aos-duration="1700">
            <span className='text-[16px] md:text-[20px] text-custom-main_green font-semibold h-[53px] pt-2 md:pt-5'>
              Quick Links
            </span>
            {links?.map((x, i) => (
              <span
                key={i}
                onClick={() => navigate(x.link)}
                className='text-[12px] text-black capitalize cursor-pointer max-w-fit transition-all hover:-translate-y-[2px]'
              >
                {x.name}
              </span>
            ))}
          </div>

          <div className='flex md:flex-col gap-3 mt-5' data-aos="fade-right" data-aos-duration="2000">
            <FaInstagram
              className='text-custom-main_creame bg-custom-main_green rounded-full text-[5px] p-[10px] w-[50px]  h-[50px]  cursor-pointer '
              onClick={() => window.open("https://www.instagram.com/sumaiyadraws/", "_blank")}
            />
            <BiLogoLinkedin
              className='text-custom-main_creame bg-custom-main_green rounded-full text-[5px] p-[10px] w-[50px]  h-[50px]  cursor-pointer '
              onClick={() => window.open("https://www.linkedin.com/in/sumaiya-ghani-736322221/", "_blank")}
            />
          </div>
        </div>
      </div>

      <div className='flex justify-center bg-custom-main_creame '>
        <div className='w-[90%] md:w-[80%] py-5 text-center text-[10px] text-black'>
          Copyright © 2025 Design With Sumaiya. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
