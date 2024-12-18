import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Upload, message, Spin, InputNumber, Select, Popover } from 'antd';
import appConfig from '../../../../utils/config';

const AddProject = ({ open, close, setReloader }) => {


    const [loaderAddProject, setLoaderAddProject] = useState(false)
    const [projectName, setProjectName] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categories, setCategories] = useState([])
    const [projectNamesByCloudinary, setProjectNamesByCloudinary] = useState([])


    const onFinish = async () => {

        if (projectName === "" || !projectName) return message.error("Please enter project name")
        if (!selectedCategory) return message.error("Please select category")

        setLoaderAddProject(true)
        const response = await fetch(`${appConfig.api_url}/project`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
            body: JSON.stringify({ name: projectName, categoryID: selectedCategory })
        });
        setLoaderAddProject(false)
        let result = await response.json()

        if (result?.success) {
            message.success("Project added successfully")
            setLoaderAddProject(false)
            setSelectedCategory(null)
            setProjectName("")
            close()
            setReloader(prev => !prev)
        }
        else {
            message.error(result?.message)
        }
        setLoaderAddProject(false)


    }

    const fetchCategories = async (values) => {
        setLoaderAddProject(true)
        const response = await fetch(`${appConfig.api_url}/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
        });
        setLoaderAddProject(false)
        let result = await response.json()

        if (result?.success) {
            setLoaderAddProject(false)
            setCategories(result?.categories)
        }
        else {
            message.error(result?.message)
        }
        setLoaderAddProject(false)

    };

    const fetchProhectNamesByCloudinary = async (values) => {
        setLoaderAddProject(true)
        const response = await fetch(`${appConfig.api_url}/project/names`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
        });
        setLoaderAddProject(false)
        let result = await response.json()

        if (result?.success) {
            setLoaderAddProject(false)
            setProjectNamesByCloudinary(result?.folders)
        }
        else {
            message.error(result?.message)
        }
        setLoaderAddProject(false)

    };

    useEffect(() => {
        if (open) {
            fetchCategories()
            fetchProhectNamesByCloudinary()
        }
    }, [open])




    return (
        <Modal
            open={open}
            onCancel={() => {
                close()
                setProjectName("")
                setSelectedCategory(null)
            }}
            title="Add Project"
            footer={null}
        >
            <Spin spinning={loaderAddProject}>
                <div className='mt-10 flex flex-col gap-5'>
                    <div className="flex flex-col gap-2">
                        <div className='flex items-center justify-start'>
                            <span>Enter Project Name</span>
                            <span className='ml-5 mt-[-4px]'>
                                <Popover
                                    content={<div className='flex flex-col gap-1'>
                                        {projectNamesByCloudinary?.map(x => <span className='text-[9px]'>{x}</span>)}
                                    </div>}>
                                    <span className='text-[10px] bg-slate-200 rounded-md p-1 px-2'>Projects on cloudinary</span>
                                </Popover>
                            </span>
                        </div>
                        <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} maxLength={100} placeholder='Enter Project Name' className='w-full' />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className='text-[12px] font-bold'>Select Category</span>
                        <Select value={selectedCategory} optionLabelProp='name' onChange={(e) => setSelectedCategory(e)} placeholder='Select Category' className='w-full'>
                            {categories?.map(x => <Select.Option value={x?._id} name={x?.name} className="text-[10px]">{x?.name}</Select.Option>)}
                        </Select>
                    </div>
                    <Button type="primary" onClick={onFinish} >Submit</Button>
                </div>
            </Spin>
        </Modal>
    );
};

export default AddProject;
