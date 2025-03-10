import { Form, Image, Input, message, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import appConfig from '../utils/config'

const ContactUs = () => {

    const [form] = Form.useForm();
    const [loader, setloader] = useState(false)

    const onFinish = async (values) => {
        setloader(true)
        const response = await fetch(`${appConfig.api_url}/mail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
            body: JSON.stringify(values)
        });
        setloader(false)
        let result = await response.json()

        if (result?.success) {
            message.success("Qoute sent successfully!")
            form.resetFields()
            window?.scrollTo(0, 0)
        }
        else {
            message.error(result?.message)
        }
    }

    return (
        <div className='pt-16 flex flex-col'>
            <div className='flex items-center justify-center gap-3 py-10' >
                <div className='calvino tracking-wider text-[35px] text-center md:text-[40px] md:pt-12 text-black font-semibold' data-aos-duration="2000" data-aos="fade-down">Hi, lets connect!</div>
            </div>
            <div className='p-5 md:p-20' data-aos="zoom-in" data-aos-duration="2500">
                <Spin
                    className={`bg-[#017a7409] h-full w-full`}
                    spinning={loader || false}
                >
                    <Form
                        form={form}
                        name="contact"
                        layout="vertical"
                        onFinish={onFinish}

                        className="w-full"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <Form.Item
                                name="name"
                                label={<span className='calvino tracking-wider text-black text-[10px] md:text-[18px] font-medium'>Name</span>}
                                rules={[{ required: true, message: 'Please enter your name' }]}
                            >
                                <Input className='p-4 cooper outline-none shadow-none focus:shadow-none border-t-0 rounded-none border-x-0 text-[10px] md:text-sm' placeholder='Enter your name' />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label={<span className='calvino tracking-wider text-black text-[10px] md:text-[18px] font-medium'>Email Address</span>}
                                rules={[
                                    { required: true, message: 'Please enter your email address' },
                                    { type: 'email', message: 'Please enter a valid email' },
                                ]}
                            >
                                <Input className='p-4 cooper outline-none shadow-none focus:shadow-none border-t-0 rounded-none border-x-0 text-[10px] md:text-sm' placeholder="Enter your email address" />
                            </Form.Item>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-3">
                            <Form.Item
                                name="phone"
                                label={<span className='calvino tracking-wider text-black text-[10px] md:text-[18px] font-medium'>Contact No.</span>}
                                rules={[{ required: true, message: 'Please enter your contact number' }, { pattern: /^(\+?\d{1,4})?((?!000)\d{10,12})$/, message: 'Please enter valid contact number' }]}
                            >
                                <Input className='p-4 cooper outline-none shadow-none focus:shadow-none border-t-0 rounded-none border-x-0 text-[10px] md:text-sm' placeholder='Enter your contact number' />
                            </Form.Item>

                            <Form.Item
                                name="subject"
                                label={<span className='calvino tracking-wider text-black text-[10px] md:text-[18px] font-medium'>Subject</span>}
                                rules={[{ required: true, message: 'Please enter the subject' }]}
                            >
                                <Input className='p-4 cooper outline-none shadow-none focus:shadow-none border-t-0 rounded-none border-x-0 text-[10px] md:text-sm' placeholder='Enter subject here' />
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="message"
                            label={<span className='calvino tracking-wider text-black text-[10px] md:text-[18px] font-medium'>How can I help you?</span>}
                            rules={[{ required: true, message: 'Please enter your message' }]}
                        >
                            <Input.TextArea rows={4} className='p-4 cooper outline-none shadow-none focus:shadow-none border-t-0 rounded-none border-x-0 text-[10px] md:text-sm' placeholder='Enter your message here' />
                        </Form.Item>

                        <div className='flex items-center justify-end my-3'>
                            <Form.Item>
                                <button type="submit" className="bg-[#fc88d2] uppercase rounded-full w-full px-5 py-3 font-medium shadow-sm hover:bg-custom-army_green transition-all duration-200 text-white text-[10px] md:text-sm">
                                    Submit
                                </button>
                            </Form.Item>
                        </div>
                    </Form>
                </Spin>
            </div>
        </div>
    )
}

export default ContactUs