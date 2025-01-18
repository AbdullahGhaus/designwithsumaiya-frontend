import React, { useEffect, useState } from 'react';
import { Button, Drawer } from 'antd';
import logo from "../../../assets/images/logo.png";
import CustomButton from '../../../components/buttons';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { FacebookFilled, InstagramFilled, LinkedinFilled, TwitterCircleFilled } from '@ant-design/icons';

const Header = () => {
    const navigate = useNavigate();
    const [isSticky, setIsSticky] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Handle scroll to make the header sticky after scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 70) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Toggle drawer for mobile/tablet
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const menuItems = ["/", "/portfolio", "/about-me", "/contact-me"]

    return (
        <header className={`flex items-center justify-between transition-all duration-300 grid-cols-2 md:grid-cols-3 py-3 border-b border-black px-5 md:px-10 bg-[#fcf4df] 
             ${isSticky ? 'fixed top-0 left-0 right-0 z-50  shadow-lg' : "absolute top-0 left-0 right-0 z-[10]"}
             `}
        >
            {/* Logo */}
            <div className={`relative ${isSticky ? "w-[80px] md:w-[100px]" : "md:w-[150px] w-[120px]"}`}>
                <img src={logo} alt="Logo" className="w-full h-auto relative z-10 ml-[-10px]" />
            </div>

            {/* Desktop Menu */}
            <nav className='hidden md:flex items-center justify-center gap-2'>
                {menuItems.map((path, index) => (
                    <span
                        key={index}
                        onClick={() => { navigate(path); window.scrollTo(0, 0); }}
                        className={`uppercase cursor-pointer text-center rubik font-medium  tracking-[0.2em] transition-all  rounded-full   px-4 py-2
                            ${path === window?.location?.pathname ? "bg-[#afbd78] border-[#afbd78] text-white" : "text-custom-army_green border-custom-army_green hover:text-white hover:bg-custom-army_green"}
                            ${isSticky ? "text-[8px] border" : "text-[10px] border"}
                       `}
                    >
                        {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
                    </span>
                ))}
            </nav>

            {/* Hamburger Menu for Mobile/Tablets */}
            <div className='md:hidden flex items-center justify-end'>
                <button onClick={toggleDrawer} className={`${isSticky ? "text-custom-main_green" : "text-custom-main_green"}`}>
                    <AiOutlineMenu size={20} />
                </button>
            </div>

            {/* Ant Design Full-Screen Drawer for Mobile */}
            <Drawer
                title={false}
                placement="top"
                onClose={toggleDrawer}
                open={isDrawerOpen}
                closeIcon={false}
                width={"100%"}
                height="100vh"
                className="p-0 m-0 transition-all duration-500"
            // bodyStyle={{ height: '100%', padding: '20px' }}
            >
                <div className="flex flex-col gap-5 h-[85%]">
                    <div className='flex items-center justify-between'>
                        <img src={logo} alt="Logo" className="w-[90px] h-auto" />
                        <AiOutlineClose size={15} onClick={toggleDrawer} className='text-black' />
                    </div>
                    <div className='flex flex-col gap-5 mt-5'>
                        {menuItems.map((path, index) => (
                            <span
                                key={index}
                                onClick={() => { navigate(path); toggleDrawer(); }}
                                className={`ml-1 text-black font-medium text-[12px] cursor-pointer capitalize
                                 ${window.location.pathname === path
                                        ? "underline underline-offset-8 decoration-2 decoration-custom-main_green text-custom-main_green font-bold"
                                        : ""
                                    }`}
                            >
                                {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
                            </span>
                        ))}
                    </div>
                    <div className='ml-1 flex items-center border-t border-t-[#B0B3BC] pt-2'>
                        <div className='flex items-center gap-4 mt-2'>
                            <InstagramFilled className='text-[25px] text-custom-main_green' />
                            <LinkedinFilled className='text-[25px] text-custom-main_green' />
                        </div>
                        {/* <CustomButton type="yellowFilled" text="Contact Us" className="mt-10" /> */}
                    </div>
                </div>
            </Drawer>
        </header>
    );
};

export default Header;
