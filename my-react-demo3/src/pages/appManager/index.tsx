import *as React from 'react'
import { Button, Input, Table, Form, Select, message } from 'antd';
import request from '../../http';
import {AppEdit,AppEditObject} from './appEdit'



export default function index() {

    const [formObject] = Form.useForm();
    const [dataSource, setDataSource] = React.useState<any[]>([]);          //数据集合
    const [pagination, setPagination] = React.useState({                    //分页器
        current: 1,
        total: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '50', '200', '500'],
      });                                                                   

      const [currentEditObject, setCurrentEditObject] = React.useState<AppEditObject>({           //新增
        isModalVisible: false,
      });

      const loadDataSource = async (                                //将返回的列表对象数组数据转换为json格式提交给表格
        appParams: any,
        pageValue: any,
        pageSizeValue: any,
      ) => {
        const result: any = await request.post('/api/getAppListByPager', {
          ...appParams,
          pageIndex: pageValue - 1,
          pageSize: pageSizeValue,
        });
        
        if (result.success) {
          const data = result.data.map(
            (app: any) => ({
              key: `app_${app.id}`,
              id: app.id,
              appName: app.appName,
              appNo: app.appNo,
              description: app.description,
              indexUrl: app.indexUrl,
              createTime: app.createTime,
              updateTime: app.updateTime,
            }),
          );
          const newPageObject = {
            ...pagination,
            current: pageValue,
            pageSize: pageSizeValue,
            total: result.totalCount,
          };
          setPagination(newPageObject);
          setDataSource(data);
        }
      };

      React.useEffect(() => {                                               //执行向服务器请求数据，将返回的数据转换为列表对象数组
        loadDataSource(null, 1, pagination.pageSize).finally();
      }, []);

      const appEditOnClose = async () => {                               //修改或新建应用后跟新列表
        await loadDataSource(formObject.getFieldsValue(), pagination.current, pagination.pageSize);
      };

      const pageOnChange = async (page: any) => {                   //分页、排序、筛选变化时触发
        await loadDataSource(formObject.getFieldsValue(), page.current, page.pageSize);
      };

      const deleteOnClick = async (app: any) => {                  //删除应用
        const result: any = await request.get('/api/removeAppById?id=' + app.id);
        if (result.success) {
          message.success('用户删除成功');
          await loadDataSource(formObject.getFieldsValue(), pagination.current, pagination.pageSize);     //刷新数据
        }
      };

      const searchOnClick = async () => {                             //查询
        await loadDataSource(formObject.getFieldsValue(), 1, pagination.pageSize);
      };
    return (
      <div>
        <div>
           <div>
            <Form
                layout='inline'
                form={formObject}
            >
                <Form.Item label="应用编号" name="appNo">
                <Input placeholder="请输入用户编号..."/>
                </Form.Item>
                <Form.Item label="应用名称" name="appName">
                <Input placeholder="请输入应用名称..."/>
                </Form.Item>
                <Form.Item label="首页地址" name="indexUrl">
                <Input placeholder="请输入应用首页名称..."/>
                </Form.Item>
                <Form.Item label="描述" name="description">
                <Input placeholder="请输入描述..."/>
                </Form.Item>
                <Form.Item>
                <Button type="primary" onClick={searchOnClick}>查询</Button>
                </Form.Item>
            </Form>
            </div>
            <div>
                <Button style={{ marginBottom: '10px' }} type="primary" onClick={() => {
                      setCurrentEditObject({
                      isModalVisible: true,
                    });
                  }}>新增</Button>
                <Table
                    columns={[
                    {
                        title: '序号',
                        dataIndex: 'id',
                        key: 'id',
                        width: 50,
                    },
                    {
                        title: '应用编号',
                        dataIndex: 'appNo',
                        key: 'appNo',
                        width: 100,
                    },
                    {
                        title: '应用名称',
                        dataIndex: 'appName',
                        key: 'appName',
                        width: 100,
                    },
                    {
                        title: '首页地址',
                        dataIndex: 'indexUrl',
                        key: 'indexUrl',
                        width: 150,
                        align: 'center',
                    },
                    {
                        title: '描述',
                        dataIndex: 'description',
                        key: 'description',
                        width: 100,
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        width: 100,
                    },
                    {
                        title: '更新时间',
                        dataIndex: 'updateTime',
                        key: 'updateTime',
                        width: 100,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 100,
                        render: (row: any) => (
                        <>
                            <Button type="link" onClick={() => {
                              setCurrentEditObject({
                                ...row,
                                isModalVisible: true,
                              });
                            }}>
                                编辑
                            </Button>
                            <Button type="link" onClick={()=>{
                              deleteOnClick(row).finally();
                            }}>
                                删除
                            </Button>
                        </>
                        ),
                    },
                    ]}
                    dataSource={dataSource}
                    pagination={pagination}
                    onChange={pageOnChange}

                />
            </div>
            <AppEdit editObject={currentEditObject} onClose={appEditOnClose}></AppEdit>
        </div>
      </div>
    )
}
