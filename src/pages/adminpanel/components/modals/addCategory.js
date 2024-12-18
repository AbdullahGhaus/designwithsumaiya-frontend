import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Upload, message, Spin, Popover } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { MdDelete } from 'react-icons/md';
import appConfig from '../../../../utils/config';

const AddCategory = ({ open, close, setReloader, setSelectedCategory }) => {


    const [form] = Form.useForm();
    const [categories, setCategories] = useState([])
    const [loaderAddCategory, setLoaderAddCategory] = useState(false)

    const onFinish = async (values) => {

        setLoaderAddCategory(true)
        const response = await fetch(`${appConfig.api_url}/category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
            body: JSON.stringify({ name: values?.name })
        });
        setLoaderAddCategory(false)
        let result = await response.json()

        if (result?.success) {
            message.success("Category added successfully")
            setLoaderAddCategory(false)
            form.resetFields()
            close()
            setSelectedCategory({ id: null, action: "" })
            setReloader(prev => !prev)
        }
        else {
            message.error(result?.message)
        }
        setLoaderAddCategory(false)


    }

    const fetchCategoriesByCloudinary = async () => {
        setLoaderAddCategory(true)
        const response = await fetch(`${appConfig.api_url}/category/names`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
        });
        setLoaderAddCategory(false)
        let result = await response.json()

        if (result?.success) {
            setCategories(result?.folders)
        }
        else {
            message.error(result?.message)
        }
        setLoaderAddCategory(false)

    }

    useEffect(() => {
        if (open) fetchCategoriesByCloudinary()
    }, [open])


    return (
        <Modal
            open={open}
            onCancel={() => {
                close()
                form.resetFields()
            }}
            title="Add Category"
            footer={null}
        >
            <Spin spinning={loaderAddCategory}>
                <div className='mt-10'>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={(e) => console.log("Form Submit Failed:", e)}
                        layout='vertical'
                    >
                        <div className='flex flex-col gap-3'>
                            <Form.Item
                                name="name"
                                labelCol={24}
                                label={<div className='flex items-center justify-between'>
                                    <span>Category Name</span>
                                    <span className='ml-5 mt-[-4px]'>
                                        <Popover
                                            content={<div className='flex flex-col gap-1'>
                                                {categories?.map(x => <span className='text-[9px]'>{x}</span>)}
                                            </div>}>
                                            <span className='text-[10px] bg-slate-200 rounded-md p-1 px-2'>Categories on cloudinary</span>
                                        </Popover>
                                    </span>
                                </div>}
                                rules={[{ required: true, message: 'Please enter the category name!' }]}
                            >
                                <Input placeholder="Enter category name" />
                            </Form.Item>

                            {/* Submit Button */}
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Spin>
        </Modal>
    );
};

export default AddCategory;
