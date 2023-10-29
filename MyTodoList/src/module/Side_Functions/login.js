import React, { Component } from "react";
import { Modal, Button, Form, Input, Space } from "antd";
import { ContactsOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";


class Login extends Component {
    state = {
        visible: true,
        credentials: {
            username: "",
            password: "",
        }
    };

    onFinish = (values) => {
        console.log("Received values of form: ", values);
        this.setState({ visible: false, credentials: { username: values.username, password: values.password } });
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, credentials } = this.state;

        return (
            <div>
                <>
                    <Button className="login" onClick={this.showModal} type="dashed" ghost>
                        Log in
                    </Button>
                    <Modal
                        centered={true}
                        keyboard={false}
                        closeIcon={null}
                        maskClosable={false}
                        open={visible}
                        onCancel={this.handleCancel}
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
                            onFinish={this.onFinish}
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
                                        this.setState({ credentials: { ...credentials, username: e.target.value } })
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
                                        this.setState({ credentials: { ...credentials, password: e.target.value } })
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
                                        href='/mytodolist'
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
    }
}

export default Login;