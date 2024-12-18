import { Image, message, Modal, Popover, Radio, Button, Form, Row, Col, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import appConfig from '../../../../utils/config';
import { MdDelete } from 'react-icons/md';
import { BsFileSlides } from 'react-icons/bs';
import { LuDelete, LuFileSearch } from 'react-icons/lu';
import { FiDelete } from 'react-icons/fi';

const CategorizeProjectFiles = ({ open, close, setReloader }) => {

    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false);
    const [project, setProject] = useState(null);
    const [files, setFiles] = useState([]); // Files to be added to stories
    const [stories, setStories] = useState([{ files: [] }]);
    const [images, setImages] = useState([])
    const [videos, setVideos] = useState([])

    const fetchProject = async () => {
        setLoader(true);
        const response = await fetch(`${appConfig.api_url}/project/${open?.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
        });
        setLoader(false);
        let result = await response.json();

        if (result?.success) {
            setProject(result?.project);
            setFiles(result?.project?.files || []);

            const mediaToRemove = [
                ...(result?.project?.categorizedMedia?.images || []),
                ...(result?.project?.categorizedMedia?.videos || []),
                ...(result?.project?.categorizedMedia?.stories?.flatMap(x => x?.files) || [])
            ];

            const updatedFiles = files.filter(fileUrl => !mediaToRemove.includes(fileUrl));


            if (result?.project?.categorizedMedia?.images?.length) {
                setImages(result?.project?.categorizedMedia?.images);
                setFiles(updatedFiles);

            }
            if (result?.project?.categorizedMedia?.videos?.length) {
                setVideos(result?.project?.categorizedMedia?.videos);
                setFiles(updatedFiles);
            }

            if (result?.project?.categorizedMedia?.stories?.flatMap(x => x?.files)?.length) {
                let data = result?.project?.categorizedMedia?.stories?.map(x => {
                    return { files: x?.files }
                })
                setStories(data)
                form.setFieldsValue({
                    stories: data
                })
                setFiles(updatedFiles);
            }

        } else {
            message.error(result?.message);
        }
    };

    useEffect(() => {
        if (open?.flag) {
            fetchProject();
        }
    }, [open]);

    const FormItemContainer = ({ children, name }) => {
        return <div className="flex flex-col gap-1">
            <span className='text-[10px] font-semibold capitalize'>{name}</span>
            {children}
        </div>
    };

    const Content = ({ storyIndex = null, type = "image" }) => {

        const addFileToStory = (fileUrl) => {
            setStories((prevStories) => {
                const updatedStories = [...prevStories];

                // Ensure the story at `storyIndex` exists
                if (!updatedStories[storyIndex]) {
                    updatedStories[storyIndex] = { files: [] };
                }

                // Ensure the `files` array exists
                if (!updatedStories[storyIndex].files) {
                    updatedStories[storyIndex].files = [];
                }

                // Add the selected file to the `files` array
                updatedStories[storyIndex].files.push(fileUrl);

                return updatedStories;
            });

            let allFiles = [...files]
            allFiles = allFiles?.filter(x => x !== fileUrl)
            setFiles(allFiles)

        };

        const addFileToImages = (fileUrl) => {

            setImages(prev => [...prev, fileUrl])

            let allFiles = [...files]
            allFiles = allFiles?.filter(x => x !== fileUrl)
            setFiles(allFiles)

        };

        const addFileToVideos = (fileUrl) => {

            setVideos(prev => [...prev, fileUrl])

            let allFiles = [...files]
            allFiles = allFiles?.filter(x => x !== fileUrl)
            setFiles(allFiles)

        };


        const handleOnClick = (fileUrl) => {
            let map = {
                image: () => addFileToImages(fileUrl),
                story: () => addFileToStory(fileUrl),
                video: () => addFileToVideos(fileUrl)
            }

            return map[type]()
        }


        return (
            <div className="flex items-center justify-start flex-wrap gap-3 p-4">
                {files?.length ? (
                    files.map((fileUrl, index) => {
                        const extension = fileUrl.split('.').pop().toLowerCase();
                        if (['jpg', 'jpeg', 'png'].includes(extension)) {
                            return (
                                <Image
                                    src={fileUrl}
                                    width={70}
                                    height={70}
                                    className="object-cover cursor-pointer hover:shadow-lg transition-all"
                                    preview={false}
                                    onClick={() => handleOnClick(fileUrl)}
                                    key={index}
                                />
                            );
                        } else if (extension === 'mp4') {
                            return (
                                <video
                                    className="h-auto max-w-[70px] rounded-lg cursor-pointer hover:shadow-lg transition-all"
                                    src={fileUrl}
                                    muted
                                    loop={false}
                                    autoPlay={false}
                                    onClick={() => handleOnClick(fileUrl)}
                                    key={index}
                                />
                            );
                        }
                    })
                ) : (
                    <span className="text-[10px]">No files found</span>
                )}
            </div>
        );
    };

    const onFinish = async () => {
        let body = {
            images: images,
            videos: videos,
            stories: stories
        }

        console.log(body);

        setLoader(true)
        const response = await fetch(`${appConfig.api_url}/project/${open?.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("access-token")
            },
            body: JSON.stringify({ categorizedMedia: body })
        });
        setLoader(false)
        let result = await response.json()

        if (result?.success) {
            message.success("Files managed successfully")
            setLoader(false)
            close(null)
            setProject(null)
            setImages([])
            setVideos([])
            setStories([{ files: [] }])
        }
        else {
            message.error(result?.message)
        }
        setLoader(false)

    }

    return (
        <Modal
            open={open.flag}
            onCancel={() => {
                close();
                setProject(null)
                setImages([])
                setVideos([])
                setStories([{ files: [] }])
            }}
            title={`Manage ${project?.name}'s files`}
            footer={null}
        >
            <Spin spinning={loader}>
                <div className='flex flex-col gap-5'>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <div className='flex flex-col gap-5 mt-5'>
                            <FormItemContainer name="Images">
                                <div className='px-2'>
                                    <Row gutter={16} className='bg-[#0000000c] rounded-md p-2'>
                                        <Col span={24}>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center flex-wrap gap-2'>
                                                    {images?.length ? images?.map((fileUrl, index) => {
                                                        const extension = fileUrl.split('.').pop().toLowerCase();
                                                        if (['jpg', 'jpeg', 'png'].includes(extension)) {
                                                            return <div className='relative group'>
                                                                <div className='absolute inset-0 bg-[#00000064] opacity-0 group-hover:opacity-100 transition-all z-[1] flex items-center justify-center'>
                                                                    <MdDelete className='text-[20px] text-white cursor-pointer' onClick={() => {

                                                                        let tempImages = [...images]
                                                                        tempImages = tempImages?.filter(x => x !== fileUrl)
                                                                        setImages(tempImages)

                                                                        setFiles(prev => [...prev, fileUrl])

                                                                    }} />
                                                                </div>
                                                                <Image src={fileUrl} width={50} height={50} preview={false} key={index} className='object-cover' />
                                                            </div>
                                                        } else if (extension === 'mp4') {
                                                            return <div className='relative group'>
                                                                <div className='absolute inset-0 bg-[#00000064] opacity-0 group-hover:opacity-100 transition-all z-[1] flex items-center justify-center'>
                                                                    <MdDelete className='text-[20px] text-white cursor-pointer' onClick={() => {

                                                                        let tempImages = [...images]
                                                                        tempImages = tempImages?.filter(x => x !== fileUrl)
                                                                        setImages(tempImages)

                                                                        setFiles(prev => [...prev, fileUrl])

                                                                    }} />
                                                                </div>
                                                                <video className="h-[50px] max-w-[50px] rounded-lg" src={fileUrl} muted={true} loop={false} key={index} />
                                                            </div>
                                                        }
                                                    }) : "No images selected"}
                                                </div>
                                                <div className='flex items-center justify-end gap-2'>
                                                    <Popover content={<Content type="image" />}>
                                                        <Button type='primary' className='text-[10px] mb-2'>
                                                            <LuFileSearch className='text-[15px]' />
                                                        </Button>
                                                    </Popover>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </FormItemContainer>
                            <FormItemContainer name="Videos">
                                <div className='px-2'>
                                    <Row gutter={16} className='bg-[#0000000c] rounded-md p-2'>
                                        <Col span={24}>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center flex-wrap gap-2'>
                                                    {videos?.length ? videos?.map((fileUrl, index) => {
                                                        const extension = fileUrl.split('.').pop().toLowerCase();
                                                        if (['jpg', 'jpeg', 'png'].includes(extension)) {
                                                            return <div className='relative group'>
                                                                <div className='absolute inset-0 bg-[#00000064] opacity-0 group-hover:opacity-100 transition-all z-[1] flex items-center justify-center'>
                                                                    <MdDelete className='text-[20px] text-white cursor-pointer' onClick={() => {

                                                                        let tempVideos = [...videos]
                                                                        tempVideos = tempVideos?.filter(x => x !== fileUrl)
                                                                        setVideos(tempVideos)

                                                                        setFiles(prev => [...prev, fileUrl])

                                                                    }} />
                                                                </div>
                                                                <Image src={fileUrl} width={50} height={50} preview={false} key={index} className='object-cover' />
                                                            </div>
                                                        } else if (extension === 'mp4') {
                                                            return <div className='relative group'>
                                                                <div className='absolute inset-0 bg-[#00000064] opacity-0 group-hover:opacity-100 transition-all z-[1] flex items-center justify-center'>
                                                                    <MdDelete className='text-[20px] text-white cursor-pointer' onClick={() => {

                                                                        let tempVideos = [...videos]
                                                                        tempVideos = tempVideos?.filter(x => x !== fileUrl)
                                                                        setVideos(tempVideos)

                                                                        setFiles(prev => [...prev, fileUrl])

                                                                    }} />
                                                                </div>
                                                                <video className="h-[50px] max-w-[50px] rounded-lg" src={fileUrl} muted={true} loop={false} key={index} />
                                                            </div>
                                                        }
                                                    }) : "No images selected"}
                                                </div>
                                                <div className='flex items-center justify-end gap-2'>
                                                    <Popover content={<Content type="video" />}>
                                                        <Button type='primary' className='text-[10px] mb-2'>
                                                            <LuFileSearch className='text-[15px]' />
                                                        </Button>
                                                    </Popover>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </FormItemContainer>
                            <FormItemContainer name="Stories">
                                <div className='px-2'>
                                    <Form.List
                                        name="stories"
                                        initialValue={[{ files: [] }]}
                                        rules={[
                                            {
                                                validator: async (_, stories) => {
                                                    if (!stories || stories.length < 1) {
                                                        return Promise.reject(new Error('At least one story is required'));
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        {(fields, { add, remove }) => (
                                            <div className='flex flex-col gap-2'>
                                                {fields.map(({ key, name, fieldKey }) => (
                                                    <Row key={key} gutter={16} className='bg-[#0000000c] rounded-md p-2'>
                                                        <Col span={24}>
                                                            <div className='flex items-center justify-between'>
                                                                <div className='flex items-center flex-wrap gap-2'>
                                                                    {stories[fieldKey]?.files?.length ? stories[fieldKey]?.files.map((fileUrl, index) => {
                                                                        const extension = fileUrl.split('.').pop().toLowerCase();
                                                                        if (['jpg', 'jpeg', 'png'].includes(extension)) {
                                                                            return <div className='relative group'>
                                                                                <div className='absolute inset-0 bg-[#00000064] opacity-0 group-hover:opacity-100 transition-all z-[1] flex items-center justify-center'>
                                                                                    <MdDelete className='text-[20px] text-white cursor-pointer' onClick={() => {

                                                                                        let tempStories = [...stories]
                                                                                        tempStories[fieldKey].files = tempStories[fieldKey]?.files?.filter(x => x !== fileUrl)
                                                                                        setStories(tempStories)

                                                                                        setFiles(prev => [...prev, fileUrl])

                                                                                    }} />
                                                                                </div>
                                                                                <Image src={fileUrl} width={50} height={50} preview={false} key={index} className='object-cover' />
                                                                            </div>
                                                                        } else if (extension === 'mp4') {
                                                                            return <div className='relative group'>
                                                                                <div className='absolute inset-0 bg-[#00000064] opacity-0 group-hover:opacity-100 transition-all z-[1] flex items-center justify-center'>
                                                                                    <MdDelete className='text-[20px] text-white cursor-pointer' onClick={() => {

                                                                                        let tempStories = [...stories]
                                                                                        tempStories[fieldKey].files = tempStories[fieldKey]?.files?.filter(x => x !== fileUrl)
                                                                                        setStories(tempStories)

                                                                                        setFiles(prev => [...prev, fileUrl])

                                                                                    }} />
                                                                                </div>
                                                                                <video className="h-[50px] max-w-[50px] rounded-lg" src={fileUrl} muted={true} loop={false} key={index} />
                                                                            </div>
                                                                        }
                                                                    }) : "No files selected for this story"}
                                                                </div>
                                                                <div className='flex items-center justify-end gap-2'>
                                                                    <Popover content={<Content storyIndex={fieldKey} type="story" />}>
                                                                        <Button type='primary' className='text-[10px] mb-2'>
                                                                            <LuFileSearch className='text-[15px]' />
                                                                        </Button>
                                                                    </Popover>
                                                                    <Button type='primary' onClick={() => remove(name)} danger className='text-[10px] mb-2'>
                                                                        <MdDelete className='text-[15px]' />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                ))}
                                                <Form.Item>
                                                    <Button type="primary" className='text-[10px]' onClick={() => add()} block>
                                                        Add Story
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        )}
                                    </Form.List>
                                </div>
                            </FormItemContainer>
                        </div>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button type="primary" className='text-[12px] bg-sky-900 mt-10' htmlType="submit" block>
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Spin>
        </Modal>
    );
};

export default CategorizeProjectFiles;
