import React, { useEffect, useState } from 'react'
import logo from "../../../assets/images/logo.png"
import { Button, Image, message, Spin } from 'antd'
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({children}) => {

    const navigate = useNavigate();
    const [loader, setloader] = useState(false)

    const onClickLogout = async () => {
        setloader(true)
        const response = await fetch("http://localhost:7000/api/v1/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
            // body: JSON.stringify(values)
        });
        setloader(false)
        let result = await response.json()

        if (result?.success) {
            message.success("Logout Successfull")
            setloader(false)
            navigate('/panel'); // Redirect after login
        }
        else {
            message.error(result?.message)
        }
        setloader(false)

    };

    function isJwtBearerToken(token) {
        if (typeof token !== 'string') return false;

        // Split the token by dots
        const parts = token.split('.');

        // Check if the token has exactly 3 parts and none are empty
        return parts.length === 3 && parts.every(part => part.trim().length > 0);
    }

    useEffect(() => {
        let token = localStorage.getItem("access-token")
        if (!isJwtBearerToken(token)) {
            message.error("Access Denied, you are not authorized!")
            navigate("/panel")
        }
    }, [])


    return (
        <Spin spinning={loader}>
            <div className='flex flex-col'>
                <div className='bg-blue-950 py-1 px-2 text-white flex items-center justify-between'>
                    <Image preview={false} src={logo} width={100} />
                    <Button className='bg-red-400 text-white text-[12px]' onClick={onClickLogout}>Logout</Button>
                </div>
                <div className='p-3'>{children}</div>
            </div>
        </Spin>
    )
}

export default AdminDashboard