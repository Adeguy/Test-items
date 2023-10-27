import React, { Component } from 'react';

import { LogoutOutlined} from '@ant-design/icons';
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

            <a href="/"  rel="noopener noreferrer">
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

    render() {
        const {  current } = this.state; // 解构state中的visible和current

        return (
            <div>
                <Menu
                    onClick={this.onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                />

            </div>
        );
    }
}

export default Bar; 
