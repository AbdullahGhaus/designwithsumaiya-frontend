import { Button, Col, Divider, Form, Image, Input, message, Row, Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { MdDelete, MdRefresh } from 'react-icons/md'
import appConfig from '../../../utils/config'
import TextArea from 'antd/es/input/TextArea'
import { FcCancel, FcDeleteRow } from 'react-icons/fc'
import { BiCross } from 'react-icons/bi'

const Resume = () => {

    const [loaderResume, setLoaderResume] = useState(false)
    const [resume, setResume] = useState(null)
    const [form] = Form.useForm();

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
            setResume(result?.user?.resume)
            form.setFieldsValue({
                name: result?.user?.resume?.name,
                summary: result?.user?.resume?.summary,
                email: result?.user?.resume?.email,
                skills: result?.user?.resume?.skills?.split(","),
                experience: result?.user?.resume?.experience,
                education: result?.user?.resume?.education
            })
        }
        else {
            message.error(result?.message)
        }
        setLoaderResume(false)
    }

    const refreshResume = async () => {
        setLoaderResume(true)
        const response = await fetch(`${appConfig.api_url}/resume/cloudinary/${JSON.parse(localStorage.getItem("userDetails"))._id}`, {
            method: "PUT",
            headers: {
                "Authorization": localStorage.getItem("access-token")
            }
        });
        setLoaderResume(false)
        let result = await response.json()

        if (result?.success) {
            setLoaderResume(false)
            setResume(result?.user?.resume)
        }
        else {
            message.error(result?.message)
        }
        setLoaderResume(false)
    }

    useEffect(() => {
        fetchResume()
    }, [])

    const onFinish = async (values) => {
        let body = {
            ...values,
            skills: values?.skills?.join()
        }
        setLoaderResume(true)
        const response = await fetch(`${appConfig.api_url}/resume/${JSON.parse(localStorage.getItem("userDetails"))._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
            body: JSON.stringify(body)
        });
        setLoaderResume(false)
        let result = await response.json()

        if (result?.success) {
            setLoaderResume(false)
            message.success("Resume updated successfully")
            setResume(result?.user?.resume)
            fetchResume()
        }
        else {
            message.error(result?.message)
        }
        setLoaderResume(false)

    };

    const FormItemContainer = ({ children, name }) => {
        return <div className="flex flex-col gap-1">
            <span className='text-[10px] font-semibold capitalize'>{name}</span>
            {children}
        </div>
    }

    return (
        <Spin spinning={loaderResume}>
            <div className='flex flex-col gap-5 p-4 border shadow-md rounded-lg bg-white'>
                <span className='text-[15px] font-bold'>Resume</span>

                <div className='flex flex-col gap-3'>
                    <div className='flex items-center justify-between'>
                        <div className="flex flex-col gap-2">
                            <span className='text-[12px] font-semibold'>Uploaded Resume File</span>
                            {resume ? <Image src={resume?.url} width={100} height={100} className='object-cover' /> : <span className='text-[12px]'>No resume file uploaded on cloudinary</span>}
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <button className='flex items-center justify-center gap-2 text-[12px] bg-slate-600 text-white px-3 py-2 rounded-md'
                                onClick={() => refreshResume()}>
                                <MdRefresh className='text-white text-[15px]' />
                                Refresh
                            </button>
                        </div>
                    </div>

                    <Divider className='my-2' />
                    <div className="flex flex-col gap-2">
                        <span className='text-[12px] font-semibold'>Resume Details</span>
                        <Form
                            form={form}
                            onFinish={onFinish}
                            layout="vertical"
                        >
                            {/* Static Fields */}
                            <FormItemContainer name="Name">
                                <Form.Item
                                    name="name"
                                    rules={[{ required: true, message: 'Please enter your name' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </FormItemContainer>

                            <FormItemContainer name="Summary">
                                <Form.Item
                                    name="summary"
                                    rules={[{ required: true, message: 'Please enter a summary' }]}
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                            </FormItemContainer>

                            <FormItemContainer name="Email">
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </FormItemContainer>


                            <FormItemContainer name="Skills">
                                <Form.Item
                                    name="skills"
                                    rules={[{ required: true, message: 'Please list your skills' }]}
                                >
                                    <Select
                                        mode="tags"
                                        style={{ width: '100%' }}
                                        placeholder="Type or select skills"
                                    >
                                        {["Brand Identity", "Illustration", "Storyboarding", "Social Media Content", "Typography", "User Interface", "Digital Drawing", "Vector Drawing"]?.map(x => <Select.Option value={x}>{x}</Select.Option>)}
                                    </Select>
                                </Form.Item>
                            </FormItemContainer>

                            {/* Dynamic Experience Fields */}
                            <FormItemContainer name="Experience">
                                <div className='px-2'>
                                    <Form.List
                                        name="experience"
                                        initialValue={[{ office: '', designation: '', date: '', description: '' }]}
                                        rules={[
                                            {
                                                validator: async (_, experience) => {
                                                    if (!experience || experience.length < 1) {
                                                        return Promise.reject(new Error('At least one experience entry is required'));
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        {(fields, { add, remove }) => (
                                            <div className='flex flex-col gap-2'>
                                                {fields.map(({ key, name, fieldKey, fieldIndex }) => (
                                                    <Row key={key} gutter={16} className='bg-[#0000001b] rounded-md p-2'>
                                                        <Col span={24}>
                                                            <div className='flex items-center justify-end'>
                                                                <Button type='primary' onClick={() => remove(name)} danger className='text-[10px] mb-2'>
                                                                    <MdDelete className='text-[15px]' /> Remove Experience
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                        <Col span={12}>
                                                            <FormItemContainer name="Office">
                                                                <Form.Item
                                                                    name={[name, 'office']}
                                                                    fieldKey={[fieldKey, 'office']}
                                                                    rules={[{ required: true, message: 'Please enter office name' }]}
                                                                >
                                                                    <Input />
                                                                </Form.Item>
                                                            </FormItemContainer>
                                                        </Col>
                                                        <Col span={12}>
                                                            <FormItemContainer name="designation">
                                                                <Form.Item
                                                                    name={[name, 'designation']}
                                                                    fieldKey={[fieldKey, 'designation']}
                                                                    rules={[{ required: true, message: 'Please enter designation' }]}
                                                                >
                                                                    <Input />
                                                                </Form.Item>
                                                            </FormItemContainer>
                                                        </Col>
                                                        <Col span={12}>
                                                            <FormItemContainer name="date">
                                                                <Form.Item
                                                                    name={[name, 'date']}
                                                                    fieldKey={[fieldKey, 'date']}
                                                                    rules={[{ required: true, message: 'Please enter the date' }]}
                                                                >
                                                                    <Input />
                                                                </Form.Item>
                                                            </FormItemContainer>
                                                        </Col>
                                                        <Col span={12}>
                                                            <FormItemContainer name="description">
                                                                <Form.Item
                                                                    name={[name, 'description']}
                                                                    fieldKey={[fieldKey, 'description']}
                                                                    rules={[{ required: true, message: 'Please enter description' }]}
                                                                >
                                                                    <TextArea rows={3} />
                                                                </Form.Item>
                                                            </FormItemContainer>
                                                        </Col>

                                                    </Row>
                                                ))}
                                                <Form.Item>
                                                    <Button type="primary" className='text-[10px]' onClick={() => add()} block>
                                                        Add Experience
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        )}
                                    </Form.List>
                                </div>
                            </FormItemContainer>

                            {/* Dynamic Education Fields */}
                            <FormItemContainer name="Education">
                                <Form.List
                                    name="education"
                                    initialValue={[{ degree: '', department: '', institute: '' }]}
                                    rules={[
                                        {
                                            validator: async (_, education) => {
                                                if (!education || education.length < 1) {
                                                    return Promise.reject(new Error('At least one education entry is required'));
                                                }
                                            },
                                        },
                                    ]}
                                >
                                    {(fields, { add, remove }) => (
                                        <div className='px-2 flex flex-col gap-2'>
                                            {fields.map(({ key, name, fieldKey, fieldIndex }) => (
                                                <Row key={key} gutter={16} className='bg-[#0000001b] rounded-md p-2'>
                                                    <Col span={24}>
                                                        <div className='flex items-center justify-end'>
                                                            <Button type='primary' onClick={() => remove(name)} danger className='text-[10px] mb-2'>
                                                                <MdDelete className='text-[15px]' /> Remove Education
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                    <Col span={8}>
                                                        <FormItemContainer name="degree">
                                                            <Form.Item
                                                                name={[name, 'degree']}
                                                                fieldKey={[fieldKey, 'degree']}
                                                                rules={[{ required: true, message: 'Please enter your degree' }]}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                        </FormItemContainer>
                                                    </Col>
                                                    <Col span={8}>
                                                        <FormItemContainer name="department">
                                                            <Form.Item
                                                                name={[name, 'department']}
                                                                fieldKey={[fieldKey, 'department']}
                                                                rules={[{ required: true, message: 'Please enter department' }]}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                        </FormItemContainer>
                                                    </Col>
                                                    <Col span={8}>
                                                        <FormItemContainer name="institute">
                                                            <Form.Item
                                                                name={[name, 'institute']}
                                                                fieldKey={[fieldKey, 'institute']}
                                                                rules={[{ required: true, message: 'Please enter institute name' }]}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                        </FormItemContainer>
                                                    </Col>
                                                </Row>
                                            ))}
                                            <Form.Item>
                                                <Button type="primary" className='text-[10px]' onClick={() => add()} block>
                                                    Add Education
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    )}
                                </Form.List>
                            </FormItemContainer>

                            {/* Submit Button */}
                            <Form.Item>
                                <Button type="primary" className='text-[12px] bg-sky-900 mt-10' htmlType="submit" block>
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                </div>
            </div>
        </Spin>
    )
}

export default Resume