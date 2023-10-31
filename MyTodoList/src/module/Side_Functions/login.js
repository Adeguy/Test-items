import React from 'react';
import { Button, Modal, Space, Form, Input } from 'antd';
import {ContactsOutlined, UserOutlined, LockOutlined, PoweroffOutlined} from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
import CryptoJS from "crypto-js";
import axios from 'axios';
const key = CryptoJS.enc.Utf8.parse('wxgwxgwxgwxgwxgwxgwx_32bytes_key'); // Get key as bytes



class Login extends React.Component {
    state = {
        visible: true,
        login_state: 2,
        credentials: {
            username: '',
            password: '',
        },
    };

    handleSubmit_res = async () => {

        const { credentials } = this.state;
        const credentialsString = JSON.stringify({username: credentials.username, password: credentials.password});
        const encrypted = CryptoJS.AES.encrypt(credentialsString, key, {
            mode: CryptoJS.mode.ECB, // 使用 ECB 模式
            padding: CryptoJS.pad.Pkcs7, // 使用 PKCS7 填充方式
        }).toString();
        await  axios
            .post('http://localhost:5000/register', { encrypted })
            .then((response) => {
                if (response.status === 200 && response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    console.log('123132：',this.state.login_state)
                    this.setState({ login_state:1});
                } else if (response.data.message==='err') {

                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({ login_state:0});
                Modal.warning({
                    title: '已经被注册！',
                    content: '请更换用户名',})
                this.setState({ visible: true })
            });
    };

    handleSubmit_log = async () => {
        const { credentials } = this.state;
        const credentialsString = JSON.stringify({username: credentials.username, password: credentials.password});
        const encrypted = CryptoJS.AES.encrypt(credentialsString, key, {
            mode: CryptoJS.mode.ECB, // 使用 ECB 模式
            padding: CryptoJS.pad.Pkcs7, // 使用 PKCS7 填充方式
        }).toString();
        axios
            .post('http://localhost:5000/login', { encrypted })
            .then((response) => {
                console.log(response.data);
                if (response.status === 200 && response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    this.setState({ login_state:1});
                    console.log(this.state.login_state);
                } else if (response.data==='err') {
                    this.setState({ login_state:0});
                    Modal.warning({
                        title: '密码错误',
                        content: '无法登录！密码错误',})
                    this.setState({ visible: true })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    onFinish = (values) => {
        console.log('Received values of form: ', values);
        this.setState({
            visible: false,
            credentials: { username: values.username, password: values.password },
        });
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };
    render() {
        const { visible, credentials, login_state } = this.state;
        console.log(this.state.login_state);
        if (login_state === 1) {
            return <Navigate to="/mytodolist" />;
        } else if (login_state === 0) {

        //     Modal.warning({
        //         title: '密码错误',
        //         content: '无法登录！密码错误',
        //         onCancel:()=>{this.setvisible()}
        //
        // })
        }
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
                                        message: 'Please input your Username!',
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
                                        message: 'Please input your Password!',
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
                                        onClick={this.handleSubmit_log} // 添加提交事件
                                    >
                                        Log in
                                    </Button>

                                    <div className="or">or</div>
                                    <Button
                                        htmlType="submit"
                                        className="signup_text"
                                        block
                                        onClick={this.handleSubmit_res} // 添加提交事件
                                    >
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
