import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, ChromeOutlined ,CodepenCircleOutlined,GithubOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react'
import request from "../http"


export default function Headers() {
    const [dataSource, setDataSource] = useState<any[]>(            //数据集合
      [{appName:'',indexUrl:''},
      {appName:'',indexUrl:''},
      {appName:'',indexUrl:''},
      {appName:'',indexUrl:''},
      {appName:'',indexUrl:''}]
      );         
    const [current,setcurrent]=useState<string>('')

    const loadDataSource = async (                                //将返回的列表对象数组数据转换为json格式提交给表格
        appParams: any,
      ) => {
                const result: any = await request.post('/api/getAppListByPager', {
                ...appParams,
                pageIndex:0,
                pageSize:5,
                });
                
                if (result.success) {
                const data = result.data.map(
                    (app: any) => ({
                    appName: app.appName,
                    indexUrl: app.indexUrl,
                    }),
                );
                setDataSource(data)
                }
            };
      useEffect(() => {                                             //执行向服务器请求数据，将返回的数据转换为列表对象数组
        loadDataSource(null).finally();
      }, []);

    return (
        
        <Menu onClick={ (e:any) => {
            setcurrent( e.key );
          }} selectedKeys={[current]} mode="horizontal">

            <Menu.Item key="mail" icon={<MailOutlined />}>
              <a href={dataSource[0].indexUrl}>
                {dataSource[0].appName}
              </a>
            </Menu.Item>

            <Menu.Item key="app" icon={<AppstoreOutlined />}>
              <a href={dataSource[1].indexUrl} target="_blank" rel="noopener noreferrer">
                {dataSource[1].appName}
              </a>
            </Menu.Item>

            <Menu.Item key="alipay" icon={<ChromeOutlined />}>
              <a href={dataSource[2].indexUrl} target="_blank" rel="noopener noreferrer">
                {dataSource[2].appName}
              </a>
            </Menu.Item>

            <Menu.Item key="alipay1" icon={<CodepenCircleOutlined />}>
              <a href={dataSource[3].indexUrl} target="_blank" rel="noopener noreferrer">
                {dataSource[3].appName}
              </a>
            </Menu.Item>

            <Menu.Item key="alipay2" icon={<GithubOutlined />}>
              <a href={dataSource[4].indexUrl} target="_blank" rel="noopener noreferrer">
                {dataSource[4].appName}
              </a>
            </Menu.Item>
      </Menu>
    )
}
