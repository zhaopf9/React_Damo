import  './index.less';
import React from 'react'
import { Layout, Menu } from 'antd';
import { ReadOutlined, HomeOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

export default function index(props:any) {
  return (
    <Layout className="bigLayout">
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <NavLink to="/">首页</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<ReadOutlined />}>
          <NavLink to="/about">About</NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<ReadOutlined />}>
          <NavLink to="/about1">About1</NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<ReadOutlined />}>
          <NavLink to="/practice">Practices</NavLink>
        </Menu.Item>
        <Menu.Item key="5" icon={<ReadOutlined />}>
          <NavLink to="/userManager">userManager</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >Header</Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
  )
}
