import * as React from 'react';
import styles from './index.less';
import { Button, Input, Table, Form, Select, message } from 'antd';
import request from '../../http';
import { UserEdit, UserEditObject } from './userEdit';

const { Option } = Select;

export default () => {
  const [dataSource, setDataSource] = React.useState<any[]>([]);        //数据集合
  const [pagination, setPagination] = React.useState({                  //分页器
    current: 1,
    total: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '50', '200', '500'],
  });
  const [currentEditObject, setCurrentEditObject] = React.useState<UserEditObject>({           //新增
    isModalVisible: false,
  });


  const [formObject] = Form.useForm();

  const loadDataSource = async (                                              //将返回的列表对象数组数据转换为json格式提交给表格
    userParams: any,
    pageValue: any,
    pageSizeValue: any,
  ) => {
    const result: any = await request.post('/api/getUserListByPager', {
      ...userParams,
      pageIndex: pageValue - 1,
      pageSize: pageSizeValue,
    });
    if (result.success) {
      const data = result.data.map(
        (user: any) => ({
          key: `user_${user.id}`,
          id: user.id,
          userName: user.userName,
          userNo: user.userNo,
          description: user.description,
          sex: user.sex,
          createTime: user.createTime,
          updateTime: user.updateTime,
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
  
  const searchOnClick = async () => {
    await loadDataSource(formObject.getFieldsValue(), 1, pagination.pageSize);
  };

  React.useEffect(() => {
    loadDataSource(null, 1, pagination.pageSize).finally();
  }, []);


  const pageOnChange = async (page: any) => {                       //分页、排序、筛选变化时触发
    await loadDataSource(formObject.getFieldsValue(), page.current, page.pageSize);
  };

  const userEditOnClose = async () => {                               //修改或新建用户后跟新列表
    await loadDataSource(formObject.getFieldsValue(), pagination.current, pagination.pageSize);
  };

  const deleteOnClick = async (user: any) => {                    //删除用户
    const result: any = await request.get('/api/removeUserById?id=' + user.id);
    if (result.success) {
      message.success('用户删除成功');
      await loadDataSource(formObject.getFieldsValue(), pagination.current, pagination.pageSize);
    }
  };

  return (
    <div className="pageMain">
      <div className="pageContent">
        <div className={styles.searchForm}>
          <Form
            layout='inline'
            form={formObject}
          >
            <Form.Item label="用户编号" name="userNo">
              <Input placeholder="请输入用户编号..."/>
            </Form.Item>
            <Form.Item label="用户名称" name="userName">
              <Input placeholder="请输入用户名称..."/>
            </Form.Item>
            <Form.Item label="性别" name="sex" initialValue="">
              <Select>
                <Option value="">请选择...</Option>
                <Option value="MALE">男性</Option>
                <Option value="FEMAL">女性</Option>
              </Select>
            </Form.Item>
            <Form.Item label="描述" name="description">
              <Input placeholder="请输入描述..."/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={searchOnClick}>查询</Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.mainTable}>
          <Button style={{ marginBottom: '10px' }} type="primary" onClick={() => {
            setCurrentEditObject({
              isModalVisible: true,
            });
          }}>
            新增
          </Button>
          <Table
            columns={[
              {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                width: 50,
              },
              {
                title: '用户编号',
                dataIndex: 'userNo',
                key: 'userNo',
                width: 100,
              },
              {
                title: '用户名称',
                dataIndex: 'userName',
                key: 'userName',
                width: 100,
              },
              {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                width: 50,
                align: 'center',
                render: sex => (sex.message),
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
                    <Button type="link" onClick={() => {
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
            tableLayout="fixed"
            bordered
          />
        </div>
        <UserEdit editObject={currentEditObject} onClose={userEditOnClose}></UserEdit>
      </div>
    </div>
  );
}
