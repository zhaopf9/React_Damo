import * as React from 'react';
import { Form, Input, Modal, Select, message } from 'antd';
import request from '@/http';

interface AppEditObject {                     //定义app修改时需要的数据及类型接口
  isModalVisible: boolean,
  id?: number,
  appName?: string,
  appNo?: string,
  description?: string,
  indexUrl?: string,
}

const  AppEdit = (props: { editObject: AppEditObject; onClose: any }) => {
  const { editObject, onClose } = props;
  const [isModalVisible, setIsModalVisible] = React.useState(false);   //默认隐藏Modal
  const [formObject] = Form.useForm();

  const modelOnOk = async () => {                           //点击确认添加或修改应用
    const data = await formObject.validateFields();
    console.log(data)
    if(flag)
    {
      console.log(editObject.id)
      const result: any = await request.post('/api/addOrUpdateApp?appid='+editObject.id, {
        ...data,
      });
      if (result.success) {
        message.success('应用修改成功');
        if (onClose) {
          onClose();
        }
        setIsModalVisible(false);
      }
    }
    else
    {
      const result: any = await request.post('/api/addOrUpdateApp', {
        ...data,
        id: editObject.id,
      });
      if (result.success) {
        message.success('应用添加成功');
        if (onClose) {
          onClose();
        }
        setIsModalVisible(false);
      }
    }
  };

  const modelOnCancel = () => {           //点击取消隐藏Modal
    setIsModalVisible(false);
  };

  React.useEffect(() => {
    setIsModalVisible(editObject.isModalVisible);
    if (editObject.id !== null) {                     
      formObject.setFieldsValue({
        appNo: editObject.appNo,
        appName: editObject.appName,
        description: editObject.description,
        indexUrl: editObject.indexUrl,
      });
    }
  }, [editObject]);

  const layout = {        //Form样式
    labelCol: { span: 8 },
    wrapperCol: { span: 12, offset: 0 },
  };

  const flag = editObject.id !== null && editObject.id !== undefined;//判断为修改还是添加

  return (
    <>
      <Modal
        width={600}
        title={flag ? '编辑' : '新增'}
        visible={isModalVisible}
        onCancel={modelOnCancel}
        onOk={modelOnOk}
        maskClosable={false}
        destroyOnClose
        okText="确认"
        cancelText="取消"
      >
        <Form {...layout} name="editForm" form={formObject} preserve={false}>
          <Form.Item
            label="应用编号"
            name="appNo"
            rules={[
              { required: true, whitespace: true, message: '应用编号不能为空!' },
              { max: 30, message: '最大长度不能超过30!' },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input placeholder="请输入"/>
          </Form.Item>
          <Form.Item
            label="应用名称"
            name="appName"
            rules={[
              { required: true, whitespace: true, message: '应用名称不能为空!' },
              { max: 30, message: '最大长度不能超过30!' },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input placeholder="请输入"/>
          </Form.Item>
          <Form.Item
            label="首页地址"
            name="indexUrl"
            rules={[
              { required: true, message: '首页地址不能为空!' },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input placeholder="请输入"/>
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
            rules={[
              { required: true, whitespace: true, message: '描述不能为空!' },
              { max: 30, message: '最大长度不能超过30!' },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input placeholder="请输入"/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export { AppEdit,  AppEditObject };
