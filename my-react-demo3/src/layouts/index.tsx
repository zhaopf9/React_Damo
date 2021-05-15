import  './index.less';
import React, { useState } from 'react'
import { ReadOutlined, HomeOutlined ,AppstoreOutlined,UserOutlined} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import Headers from './header'

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export default function Index(Props:any) {

    const [collapsed,setcollapsed]=useState(false)  //控制菜单缩进
    const [menuSelectKey,steMenuSelectKey]=useState('1')
    const doRenderNavigation = () => {
      if (menuSelectKey === '1') {
        return (<>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
        </>);
      } else if (menuSelectKey === '2') {
        return (<>
          <Breadcrumb.Item>About</Breadcrumb.Item>
        </>);
      }else if (menuSelectKey === '3') {
        return (<>
          <Breadcrumb.Item>About1</Breadcrumb.Item>
        </>);
      }else if (menuSelectKey === '4') {
        return (<>
          <Breadcrumb.Item>Praction</Breadcrumb.Item>
        </>);
      }else if (menuSelectKey === '5') {
        return (<>
           <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          <Breadcrumb.Item>用户列表</Breadcrumb.Item>
        </>);
      }
      return (<>
        <Breadcrumb.Item>应用管理</Breadcrumb.Item>
        <Breadcrumb.Item>应用列表</Breadcrumb.Item>
      </>);
    };
    

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={()=>{
          setcollapsed(!collapsed)
          }}>
          <div style={{height:66,margin:10}}>
            <h1>
              <a id="logo">
                <img style={{height:66}} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
                Ant Design
              </a>
            </h1>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />} onClick={()=>{steMenuSelectKey('1')}} >
              <NavLink to="/">首页</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<ReadOutlined />} onClick={()=>{steMenuSelectKey('2')}}>
              <NavLink to="/about">About</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<ReadOutlined />} onClick={()=>{steMenuSelectKey('3')}}>
              <NavLink to="/about1">About1</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<ReadOutlined />} onClick={()=>{steMenuSelectKey('4')}}>
              <NavLink to="/practice">Practice</NavLink>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="用户管理">
              <Menu.Item key="5" onClick={()=>{steMenuSelectKey('5')}}>
                <NavLink to="/userManager">用户列表</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="应用管理">
              <Menu.Item key="6" onClick={()=>{steMenuSelectKey('6')}}>
                <NavLink to="/appManager">应用列表</NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Headers  />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            {doRenderNavigation()}
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {Props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }