import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import appConfig from '../../../utils/config';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loader, setloader] = useState(false)

  const onFinish = async (values) => {
    setloader(true)
    const response = await fetch(`${appConfig.api_url}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values)
    });
    setloader(false)
    let result = await response.json()

    if (result?.success) {
      message.success("Request for password change sent!")
      setloader(false)
      localStorage.setItem("email", JSON.stringify(values?.email))
      navigate(`/reset-password/${result?.resetToken}`); // Redirect after login
    }
    else {
      message.error(result?.message)
    }
    setloader(false)

  };

  return (
    <Spin spinning={loader}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card title="Forgot Password" style={{ width: 500 }}>
          <Form name="forgot-password" onFinish={onFinish} autoComplete="off">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
          <span className='text-center cursor-pointer' onClick={() => navigate("/panel")}>Back to Login</span>
        </Card>
      </div>
    </Spin>
  );
};

export default ForgotPassword;
