import React, { Component } from 'react';
import { Layout } from 'antd';
import Bar from './module/Side_Functions/bar.js';
import Calendar_Tasks from './module/Main_Function/mytodolist';
import Sidebar from './module/Side_Functions/Sider';
import './module/CSS/style.css';

const { Header, Footer, Sider, Content } = Layout;

class PageComposition extends Component {
    state = {
        events: '', // 存储事件与其对应的日期
    };
    changeEvents = (newEvents) => {
        this.setState(newEvents);
    };
    render() {
        const headerStyle = {
            textAlign: 'center',
            color: '#fff',
            height: 64,
            paddingInline: 50,
            lineHeight: '64px',
            backgroundColor: '#fff',
        };

        const contentStyle = {
            textAlign: 'center',
            minHeight: 120,
            lineHeight: '120px',
            color: '#fff',
            backgroundColor: '#ffffff',
        };

        const siderStyle = {
            textAlign: 'center',
            lineHeight: '120px',
            color: '#fff',
            backgroundColor: '#aacdf1',
        };

        const footerStyle = {
            textAlign: 'center',
            color: '#fff',
            backgroundColor: '#7dbcea',
        };

        return (
            <div className='container'>
                <Layout>
                    <Sider style={siderStyle}>
                        <div className="username"> </div>
                        <Sidebar />
                    </Sider>
                    <Layout>
                        <Header style={headerStyle}>
                            <Bar />
                        </Header>

                        <Content style={contentStyle} >
                            <Calendar_Tasks   />
                        </Content>
                        <Footer style={footerStyle}>Footer</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default PageComposition;
