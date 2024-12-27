import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import appConfig from '../../../utils/config';

const Login = () => {
    const navigate = useNavigate();
    const [loader, setloader] = useState(false)

    const onFinish = async (values) => {
        setloader(true)
        const response = await fetch(`${appConfig.api_url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        });
        setloader(false)
        let result = await response.json()

        if (result?.success) {
            message.success("Login Successfull")
            setloader(false)
            localStorage.setItem("access-token", result?.token)
            localStorage.setItem("userDetails", JSON.stringify(result?.user))
            navigate('/admin/dashboard'); // Redirect after login
        }
        else {
            message.error(result?.message)
        }
        setloader(false)

    };

    return (
        <Spin spinning={loader}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} className='p-5 md:p-0'>
                <Card title="Panel Login" style={{ width: 500 }}>
                    <Form name="login" onFinish={onFinish} autoComplete="off">
                        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Login
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="link" onClick={() => navigate('/forgot-password')}>
                                Forgot Password?
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </Spin>
    );
};

export default Login;
