import React, { useEffect, useState } from 'react'
import AdminDashboard from './home'
import { Button, Image, message, Popover, Spin, Table } from 'antd'
import appConfig from '../../../utils/config'
import { MdDelete, MdEdit, MdFolder, MdAddCircle, MdRefresh } from "react-icons/md";
import AddCategory from '../components/modals/addCategory';
import AddProject from '../components/modals/addProject';
import UpdateProject from '../components/modals/updateProject';
import Resume from '../components/resume';
import CloudinaryUsage from '../components/cloudinaryUsage';
import UpdateCategory from '../components/modals/updateCategory';
import { TbArrowsMove } from 'react-icons/tb';
import { ImMoveDown, ImMoveUp } from 'react-icons/im';
import { PiFilesLight } from 'react-icons/pi';
import CategorizeProjectFiles from '../components/modals/categorizeProjectFiles';



const Dashboard = () => {

    const [categories, setCategories] = useState([])
    const [projects, setProjects] = useState([])
    const [loaderCategories, setLoaderCategories] = useState(false)
    const [loaderProjects, setLoaderProjects] = useState(false)
    const [selectedProject, setSelectedProject] = useState({
        id: null,
        action: ""
    })
    const [selectedCategory, setSelectedCategory] = useState({
        id: null,
        action: ""
    })
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)
    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false)
    const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false)
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false)
    const [reloader, setReloader] = useState(false)
    const [isDeleteCategoryPopoverOpen, setIsDeleteCategoryPopoverOpen] = useState({
        id: null,
        flag: false
    })
    const [isDeleteProjectPopoverOpen, setIsDeleteProjectPopoverOpen] = useState({
        id: null,
        flag: false
    })

    const [isCategorizeProjectFilesOpen, setIsCategorizeProjectFilesOpen] = useState({
        id: null,
        flag: false
    })


    const moveCategory = async (id, direction) => {
        setLoaderCategories(true)
        const response = await fetch(`${appConfig.api_url}/category/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
            body: JSON.stringify({ direction })
        });
        setLoaderCategories(false)
        let result = await response.json()

        if (result?.success) {
            message.success("Cateogry updated successfully!")
            setLoaderCategories(false)
            fetchCategories()
        }
        else {
            message.error(result?.message)
        }
        setLoaderCategories(false)

    };

    const columns = [
        {
            title: 'Category Name',
            render: (_, record) => {
                return <span>{record?.name}</span>
            }
        },
        {
            title: 'No. Of Projects',
            render: (_, record) => {
                return <span>{record?.projects?.length || 0}</span>
            }
        },
        {
            title: 'Projects',
            render: (_, record) => {
                return <div className='flex items-center gap-2'>{
                    record?.projects?.length ? record?.projects?.map(x => <span className="rounded-lg max-w-fit px-2 py-1 text-white bg-slate-700 text-[10px] capitalize">{x?.name}</span>) : <span className="text-[10px]">No projects added yet</span>
                }</div>
            }
        },
        {
            title: 'Thumbnail',
            render: (_, record) => {
                return <Image src={record?.thumbnail} width={50} height={50} className='object-cover' />
            }
        },
        {
            title: "Actions",
            width: "25%",
            align: "center",
            render: (_, record, index) => {
                return <div className="flex items-center gap-3 flex-wrap justify-center">
                    <button
                        className='text-[12px] p-2 rounded-md bg-indigo-400 text-white border-none'
                        onClick={() => {
                            refreshCategory(record?._id)
                        }}
                    >
                        <MdRefresh className='text-[20px] text-white' />
                    </button>
                    <button
                        className='text-[12px] p-2 rounded-md bg-indigo-400 text-white border-none'
                        onClick={() => {
                            fetchProjects(record?._id)
                            localStorage?.setItem("selectedCategory", record?.name)
                        }}
                    >
                        <MdFolder className='text-[20px] text-white' />
                    </button>
                    <button
                        className='text-[12px] p-2 rounded-md bg-blue-400 text-white border-none'
                        onClick={() => {
                            setSelectedCategory({ id: record?._id, action: "update" })
                            setIsEditCategoryModalOpen(true)
                        }}
                    >
                        <MdEdit className='text-[20px] text-white' />
                    </button>
                    <button
                        className='text-[12px] p-2 rounded-md bg-blue-400 text-white border-none disabled:opacity-50'
                        onClick={() => moveCategory(record?._id, "up")}
                        disabled={index === 0}
                    >
                        <ImMoveUp className='text-[20px] text-white' />
                    </button>
                    <button
                        className='text-[12px] p-2 rounded-md bg-blue-400 text-white border-none disabled:opacity-50'
                        onClick={() => moveCategory(record?._id, "down")}
                        disabled={categories?.length - 1 === index}
                    >
                        <ImMoveDown className='text-[20px] text-white' />
                    </button>
                    <Popover
                        open={record?._id === isDeleteCategoryPopoverOpen?.id}
                        content={
                            <div className='flex flex-col gap-2 items-center justify-center'>
                                <span className='text-[11px] text-center w-[80%]'>Are you sure you want to delete this category?</span>
                                <span className='flex items-center justify-center gap-3'>
                                    <span
                                        className='text-[10px] bg-blue-400 text-white py-1 px-2 rounded-md cursor-pointer'
                                        onClick={() => deleteCategory(record?._id)}
                                    >
                                        Yes
                                    </span>
                                    <span
                                        className='text-[10px] bg-red-400 text-white py-1 px-2 rounded-md cursor-pointer'
                                        onClick={() => setIsDeleteCategoryPopoverOpen({
                                            id: null,
                                            flag: false
                                        })}
                                    >
                                        No
                                    </span>
                                </span>
                            </div>
                        }
                    >
                        <button
                            className='text-[12px] p-2 rounded-md bg-red-400 text-white border-none'
                            onClick={() => setIsDeleteCategoryPopoverOpen({
                                id: record?._id,
                                flag: true
                            })}
                        >
                            <MdDelete className='text-[20px] text-white' />
                        </button>
                    </Popover>
                </div>
            }
        }
    ];

    function separateFilesByType(fileUrls) {
        const images = [];
        const videos = [];

        fileUrls.forEach((url) => {
            const extension = url.split('.').pop().toLowerCase(); // Extract and normalize extension

            if (['jpg', 'jpeg', 'png'].includes(extension)) {
                images.push(url);
            } else if (extension === 'mp4') {
                videos.push(url);
            }
        });

        return { images, videos };
    }

    const columns_projects = [
        {
            title: 'Project Name',
            render: (_, record) => {
                return <span className='capitalize'>{record?.name}</span>
            }
        },
        {
            title: 'Category Name',
            render: (_, record) => {
                return <span className='capitalize'>{record?.categoryID?.name}</span>
            }
        },
        {
            title: 'No. Of Images',
            render: (_, record) => {
                return <span>{record?.files?.length ? separateFilesByType(record?.files).images?.length : 0}</span>
            }
        },
        {
            title: 'No. Of Videos',
            render: (_, record) => {
                return <span>{record?.files?.length ? separateFilesByType(record?.files).videos?.length : 0}</span>
            }
        },
        {
            title: "Actions",
            width: "25%",
            align: "center",
            render: (_, record) => {
                return <div className="flex items-center gap-3 flex-wrap justify-center">
                    <button
                        className='text-[12px] p-2 rounded-md bg-indigo-400 text-white border-none'
                        onClick={() => refreshProject(record?._id)}
                    >
                        <MdRefresh className='text-[20px] text-white' />
                    </button>
                    <button
                        className='text-[12px] p-2 rounded-md bg-blue-400 text-white border-none'
                        onClick={() => {
                            setSelectedProject({ id: record?._id, action: "update" })
                            setIsEditProjectModalOpen(true)
                        }}
                    >
                        <MdEdit className='text-[20px] text-white' />
                    </button>
                    <Popover
                        open={record?._id === isDeleteProjectPopoverOpen?.id}
                        content={
                            <div className='flex flex-col gap-2 items-center justify-center'>
                                <span className='text-[11px] text-center w-[80%]'>Are you sure you want to delete this project?</span>
                                <span className='flex items-center justify-center gap-3'>
                                    <span
                                        className='text-[10px] bg-blue-400 text-white py-1 px-2 rounded-md cursor-pointer'
                                        onClick={() => deleteProject(record?._id)}
                                    >
                                        Yes
                                    </span>
                                    <span
                                        className='text-[10px] bg-red-400 text-white py-1 px-2 rounded-md cursor-pointer'
                                        onClick={() => setIsDeleteProjectPopoverOpen({
                                            id: null,
                                            flag: false
                                        })}
                                    >
                                        No
                                    </span>
                                </span>
                            </div>
                        }
                    >
                        <button
                            className='text-[12px] p-2 rounded-md bg-red-400 text-white border-none'
                            onClick={() => setIsDeleteProjectPopoverOpen({
                                id: record?._id,
                                flag: true
                            })}
                        >
                            <MdDelete className='text-[20px] text-white' />
                        </button>
                    </Popover>
                    <button
                        className='text-[12px] p-2 rounded-md bg-indigo-400 text-white border-none'
                        onClick={() => setIsCategorizeProjectFilesOpen({
                            id: record?._id,
                            flag: true
                        })}
                    >
                        <PiFilesLight className='text-[20px] text-white' />
                    </button>
                </div>
            }
        }
    ];

    const fetchCategories = async (values) => {
        setLoaderCategories(true)
        const response = await fetch(`${appConfig.api_url}/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
        });
        setLoaderCategories(false)
        let result = await response.json()

        if (result?.success) {
            setLoaderCategories(false)
            setCategories(result?.categories)
        }
        else {
            message.error(result?.message)
        }
        setLoaderCategories(false)

    };

    const fetchProjects = async (id) => {
        setLoaderProjects(true)
        const response = await fetch(`${appConfig.api_url}/project/category/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
        });
        setLoaderProjects(false)
        let result = await response.json()

        if (result?.success) {
            setLoaderProjects(false)
            setProjects(result?.projects)
        }
        else {
            message.error(result?.message)
        }
        setLoaderProjects(false)

    };

    const refreshProject = async (id) => {
        setLoaderProjects(true)
        const response = await fetch(`${appConfig.api_url}/project/cloudinary/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
            body: JSON.stringify({ projectID: id, categoryID: selectedCategory?.id })
        });
        setLoaderProjects(false)
        let result = await response.json()

        if (result?.success) {
            message.success(result?.message)
            setLoaderProjects(false)
            fetchAllProjects()
        }
        else {
            message.error(result?.message)
        }
        setLoaderProjects(false)

    };

    const refreshCategory = async (id) => {
        setLoaderCategories(true)
        const response = await fetch(`${appConfig.api_url}/category/cloudinary/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
            body: JSON.stringify({ categoryID: id })
        });
        setLoaderCategories(false)
        let result = await response.json()

        if (result?.success) {
            message.success(result?.message)
            setLoaderCategories(false)
            fetchCategories()
        }
        else {
            message.error(result?.message)
        }
        setLoaderCategories(false)

    };

    const deleteCategory = async (id) => {
        setLoaderCategories(true)
        const response = await fetch(`${appConfig.api_url}/category/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("access-token")
            }
        });
        setLoaderCategories(false)
        let result = await response.json()

        if (result?.success) {
            message.success(result?.message)
            setLoaderCategories(false)
            fetchCategories()
            fetchAllProjects()
        }
        else {
            message.error(result?.message)
        }
        setLoaderCategories(false)

    };

    const deleteProject = async (id) => {
        setLoaderProjects(true)
        const response = await fetch(`${appConfig.api_url}/project/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("access-token")
            }
        });
        setLoaderProjects(false)
        let result = await response.json()

        if (result?.success) {
            message.success(result?.message)
            setLoaderProjects(false)
            fetchCategories()
            fetchAllProjects()
        }
        else {
            message.error(result?.message)
        }
        setLoaderProjects(false)

    };

    const fetchAllProjects = async (values) => {
        setLoaderProjects(true)
        const response = await fetch(`${appConfig.api_url}/projects`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("access-token")
            }
        });
        setLoaderProjects(false)
        let result = await response.json()

        if (result?.success) {
            setLoaderProjects(false)
            setProjects(result?.projects)
        }
        else {
            message.error(result?.message)
        }
        setLoaderProjects(false)

    };


    useEffect(() => {
        fetchCategories()
        fetchAllProjects()
        localStorage.setItem("selectedCategory", "All")
    }, [reloader])

    return (
        <AdminDashboard>
            <div className='flex flex-col gap-10'>
                <CloudinaryUsage />
                <Spin spinning={loaderCategories}>
                    <div className='flex flex-col gap-3 p-4 border shadow-md rounded-lg bg-white'>
                        <div className='flex items-center justify-between'>
                            <span className='text-[15px] font-bold'>Categories</span>
                            <div className="flex items-center justify-center gap-2">
                                <button disabled={localStorage?.getItem("selectedCategory") === "All"} className='disabled:opacity-40 flex items-center justify-center gap-2 text-[12px] bg-slate-600 text-white px-3 py-2 rounded-md'
                                    onClick={() => {
                                        setSelectedCategory({ id: null, action: "" })
                                        fetchAllProjects()
                                        localStorage.setItem("selectedCategory", "All")
                                    }}>
                                    <MdAddCircle className='text-white text-[15px]' />
                                    Clear Filter
                                </button>
                                <button className='flex items-center justify-center gap-2 text-[12px] bg-slate-600 text-white px-3 py-2 rounded-md'
                                    onClick={() => setIsAddCategoryModalOpen(true)}>
                                    <MdAddCircle className='text-white text-[15px]' />
                                    Add Category
                                </button>
                            </div>
                        </div>
                        <Table
                            dataSource={categories?.sort((a, b) => a.sortOrder - b.sortOrder)}
                            columns={columns}
                            size='small'
                            className='border'
                            pagination={false}
                            rowClassName={(record) => record?.name == localStorage.getItem("selectedCategory") ? "bg-green-200" : ""}
                            scroll={{
                                y: "250px"
                            }} />
                    </div>
                </Spin>
                <Spin spinning={loaderProjects}>
                    <div className='flex flex-col gap-3 p-4 border shadow-md rounded-lg bg-white'>
                        <div className='flex items-center justify-between'>
                            <span className='text-[15px] font-bold'>Projects ({localStorage.getItem("selectedCategory")})</span>
                            <button className='flex items-center justify-center gap-2 text-[12px] bg-slate-600 text-white px-3 py-2 rounded-md'
                                onClick={() => setIsAddProjectModalOpen(true)}>
                                <MdAddCircle className='text-white text-[15px]' />
                                Add Project
                            </button>
                        </div>
                        <Table dataSource={projects} columns={columns_projects} size='small' className='border' pagination={false} scroll={{
                            y: "250px"
                        }} />
                    </div>
                </Spin>
                <Resume />
                <CategorizeProjectFiles open={isCategorizeProjectFilesOpen} close={() => setIsCategorizeProjectFilesOpen({ id: null, flag: false })} setReloader={setReloader} />
                <AddCategory open={isAddCategoryModalOpen} close={() => setIsAddCategoryModalOpen(false)} setReloader={setReloader} setSelectedCategory={setSelectedCategory} />
                <AddProject open={isAddProjectModalOpen} close={() => setIsAddProjectModalOpen(false)} setReloader={setReloader} />
                <UpdateProject open={isEditProjectModalOpen} close={() => setIsEditProjectModalOpen(false)} setReloader={setReloader} selectedProject={selectedProject} />
                <UpdateCategory open={isEditCategoryModalOpen} close={() => setIsEditCategoryModalOpen(false)} setReloader={setReloader} selectedCategory={selectedCategory} />
            </div>
        </AdminDashboard>
    )
}

export default Dashboard