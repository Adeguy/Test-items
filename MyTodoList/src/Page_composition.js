import Bar from "./module/Side_Functions/bar.js"
import Calendar_Tasks from "./module/Main_Function/mytodolist"
import  Sidebar from "./module/Side_Functions/Sider"
import "./module/CSS/mytodolist.css"
import React, { memo } from 'react'
import DefineRoutes from './router'
import {useLocation, } from 'react-router-dom';
import {Layout} from 'antd';


const { Header, Footer, Sider, Content } = Layout;
const PageComposition = () => {
    const { state } = useLocation()


    const headerStyle = {
        textAlign: 'center',
        color: '#fff',
        height: 64,
        paddingInline: 50,
        lineHeight: '64px',
        backgroundColor:'#fff',
    };

    const contentStyle = {
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#108ee9',
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

        <div style={{ position: 'relative' }}>

            <Layout>
                <Sider style={siderStyle}><div className='username'> </div><Sidebar /></Sider>
                <Layout>

                    <Header style={headerStyle}><Bar /></Header>
                    <Content style={contentStyle}><Calendar_Tasks /></Content>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    );
};

export default PageComposition;