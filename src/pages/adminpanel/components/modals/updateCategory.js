import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Upload, message, Spin, InputNumber, Select } from 'antd';
import appConfig from '../../../../utils/config';

const UpdateCategory = ({ open, close, setReloader, selectedCategory }) => {


    const [loader, setLoader] = useState(false)
    const [categoryName, setCategoryName] = useState(null)


    const onFinish = async () => {

        if (categoryName === "" || !categoryName) return message.error("Please enter category name")

        setLoader(true)
        const response = await fetch(`${appConfig.api_url}/category/${selectedCategory?.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
            body: JSON.stringify({ name: categoryName })
        });
        setLoader(false)
        let result = await response.json()

        if (result?.success) {
            message.success("Category updated successfully")
            setLoader(false)
            setCategoryName(null)
            close()
            setReloader(prev => !prev)
        }
        else {
            message.error(result?.message)
        }
        setLoader(false)


    }


    const fetchCategory = async (values) => {
        setLoader(true)
        const response = await fetch(`${appConfig.api_url}/category/${selectedCategory?.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
        });
        setLoader(false)
        let result = await response.json()

        if (result?.success) {
            setLoader(false)
            setCategoryName(result?.category?.name)
        }
        else {
            message.error(result?.message)
        }
        setLoader(false)

    };

    useEffect(() => {
        if (open) {
            fetchCategory()
        }
    }, [open])



    return (
        <Modal
            open={open}
            onCancel={() => {
                close()
                setCategoryName(null)
            }}
            title="Add Project"
            footer={null}
        >
            <Spin spinning={loader}>
                <div className='mt-10 flex flex-col gap-5'>
                    <div className="flex flex-col gap-2">
                        <span className='text-[12px] font-bold'>Edit Category Name</span>
                        <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} maxLength={100} placeholder='Enter Category Name' className='w-full' />
                    </div>
                    <Button type="primary" onClick={onFinish} >Submit</Button>
                </div>
            </Spin>
        </Modal>
    );
};

export default UpdateCategory;
