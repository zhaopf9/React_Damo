import * as React from 'react';
import { Form, Input, Modal, Select, message } from 'antd';
import request from '@/http';

const { Option } = Select;

interface UserEditObject {
  isModalVisible: boolean,
  id?: number,
  userName?: string,
  userNo?: string,
  description?: string,
  sex?: any,
}

const UserEdit = (props: { editObject: UserEditObject; onClose: any }) => {
  const { editObject, onClose } = props;
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [formObject] = Form.useForm();

  const modelOnOk = async () => {
    const data = await formObject.validateFields();
    const result: any = await request.post('/api/addOrUpdateUser', {
      ...data,
      id: editObject.id,
    });
    if (result.success) {
      message.success('用户添加成功');
      if (onClose) {
        onClose();
      }
      setIsModalVisible(false);
    }
  };

  const modelOnCancel = () => {
    setIsModalVisible(false);
  };

  React.useEffect(() => {
    setIsModalVisible(editObject.isModalVisible);
    if (editObject.id !== null) {
      formObject.setFieldsValue({
        userNo: editObject.userNo,
        userName: editObject.userName,
        description: editObject.description,
        sex: editObject.sex ? editObject.sex.code : null,
      });
    }
  }, [editObject]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const flag = editObject.id !== null && editObject.id !== undefined;
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
            label="用户编号"
            name="userNo"
            rules={[
              { required: true, whitespace: true, message: '用户编号不能为空!' },
              { max: 30, message: '最大长度不能超过30!' },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input placeholder="请输入"/>
          </Form.Item>
          <Form.Item
            label="用户名称"
            name="userName"
            rules={[
              { required: true, whitespace: true, message: '用户名称不能为空!' },
              { max: 30, message: '最大长度不能超过30!' },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input placeholder="请输入"/>
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            rules={[
              { required: true, message: '性别不能为空!' },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Select>
              <Option value="">请选择</Option>
              <Option value="MALE">男性</Option>
              <Option value="FEMAL">女性</Option>
            </Select>
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

export { UserEdit, UserEditObject };
