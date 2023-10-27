import React, { useState } from "react";
import { Modal, Button, Form, Input, Space } from "antd";
import { ContactsOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [visible, setVisible] = useState(true);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        setVisible(false);
        setCredentials({ username: values.username, password: values.password });
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <>
                <Button className="login" onClick={showModal} type="dashed" ghost>
                    Log in
                </Button>
                <Modal
                    centered={true}
                    keyboard={false}
                    closeIcon={null}
                    maskClosable={false}
                    open={visible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Space className="login_title">
                        <ContactsOutlined className="login_icon" />
                        <h1>{"Mytodolist"}</h1>
                    </Space>

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Username!",
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username"
                                onChange={(e) =>
                                    setCredentials({ ...credentials, username: e.target.value })
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    setCredentials({ ...credentials, password: e.target.value })
                                }
                            />
                        </Form.Item>
                        <Form.Item>
                            <div className="aaa">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login_text"
                                    block
                                    onClick={() => navigate(`/mytodolist`, { state: { credentials } })}
                                >
                                    Log in
                                </Button>
                                <div className="or">or</div>
                                <Button htmlType="submit" className="signup_text" block>
                                    Register
                                </Button>
                            </div>
                        </Form.Item>
                        <Form.Item></Form.Item>
                    </Form>
                </Modal>
            </>
        </div>
    );
};

export default Login;