import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import appConfig from '../../../utils/config';

const ResetPassword = () => {

    const { token } = useParams()
    const navigate = useNavigate();
    const [loader, setloader] = useState(false)

    const onFinish = async (values) => {
        setloader(true)
        const response = await fetch(`${appConfig.api_url}/reset-password/${token}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        });
        setloader(false)
        let result = await response.json()

        if (result?.success) {
            message.success("Password has ben updated!")
            setloader(false)
            localStorage.setItem("access-token", result?.token)
            localStorage.setItem("userDetails", JSON.stringify(result?.user))
            navigate(`/admin/dashboard`);
        }
        else {
            message.error(result?.message)
        }
        setloader(false)

    };


    return (
        <Spin spinning={loader}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card title="Reset Password" style={{ width: 300 }}>
                    <Form name="reset-password" onFinish={onFinish} autoComplete="off">
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your new password!' }]}>
                            <Input.Password placeholder="New Password" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Confirm Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Reset Password
                            </Button>
                        </Form.Item>
                    </Form>
                    <span className='text-center cursor-pointer' onClick={() => navigate("/panel")}>Back to Login</span>
                </Card>
            </div>
        </Spin>
    );
};

export default ResetPassword;
