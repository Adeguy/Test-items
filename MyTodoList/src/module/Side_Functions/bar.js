import React, { Component } from 'react';
import {Modal, Button,Form, Input, Space} from 'antd';
import {ContactsOutlined, LockOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {  FormOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import "../CSS/mytodolist.css"

const items = [ // 定义菜单项
    {
        label: 'My to do list',
        key: 'mail',
        icon: <FormOutlined />,
    },
    {
        icon: <LogoutOutlined />,
        label: (

            <a href="../Main_Function/mytodolist.js"  rel="noopener noreferrer">
                Log out
            </a>

        ),
        key: 'alipay',
    },
];

class Bar extends Component {
    constructor(props) {
        super(props); // 调用父类构造函数
        this.state = {
            visible: true, // Modal是否可见
            credentials: { username: "", password: "" }, // 用户名和密码
            current: 'mail'
        };
    }

    onFinish = (values) => {
        console.log('Received values of form: ', values); // 打印表单提交的值
        this.setState({ visible: false }); // 隐藏Modal
        this.setState({ credentials: { username: values.username, password: values.password } }); // 更新用户名和密码
    };
    // 显示Modal的函数
    showModal = () => {
        this.setState({ visible: true });
    };
    // 隐藏Modal的函数
    handleCancel = () => {
        this.setState({ visible: false });
    };
    // 点击菜单项回调
    onClick = (e) => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };

    render() {
        const { visible, current } = this.state; // 解构state中的visible和current

        return (
            <div>
                <Menu
                    onClick={this.onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                />
                <>
                    <Button className="login"  onClick={this.showModal} type="dashed" ghost>
                        Log in
                    </Button>
                    <Modal
                        centered={true} // 是否居中显示
                        keyboard={false} // 是否支持键盘操作
                        closeIcon={null} // 关闭图标
                        maskClosable={false} // 点击蒙层是否关闭Modal
                        open={visible} // 是否可见
                        onCancel={this.handleCancel} // 隐藏Modal回调
                        footer={null} // 底部内容
                    >
                        <Space className="login_title"><ContactsOutlined className="login_icon"/><h1>{"Mytodolist"}</h1></Space>

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
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                                />
                            </Form.Item>
                            <Form.Item>

                                    <div className="aaa">
                                <Button type="primary" htmlType="submit" className="login_text" block>
                                    Log in
                                </Button>
                                    <div className="or">or</div>
                                <Button  htmlType="submit" className="signup_text"block>
                                    Register
                                </Button>
                                    </div>


                            </Form.Item>

                            <Form.Item>


                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            </div>
        );
    }
}

export default Bar; 
