import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { signUp } from '@/services/users';
import TextArea from 'antd/lib/input/TextArea';
import {
  UserOutlined,
  MailOutlined,
  EnvironmentOutlined,
  BarcodeOutlined,
  AppstoreAddOutlined,
  UnlockOutlined,
} from '@ant-design/icons';

const SignUp = props => {
  const [form] = Form.useForm();
  const FormItem = Form.Item;
  const { onCancel } = props;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = async values => {
    if (values) {
      const { success } = await signUp(values);
      if (success) {
        notification.success({
          message: 'Sign up customer success !',
        });
        onCancel();
      } else {
        notification.error({
          message: 'Sign up customer failed !',
        });
        onCancel();
      }
    }
  };

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <FormItem
        label="Fulll name"
        name="name"
        rules={[{ required: true, message: 'Full name is required' }]}
      >
        <Input prefix={<UserOutlined />} />
      </FormItem>
      <FormItem
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Email is required !' },
          { type: 'email', message: 'Email is not validated !' },
        ]}
      >
        <Input prefix={<MailOutlined />} />
      </FormItem>
      <FormItem
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Password is required' }]}
      >
        <Input type="password" minLength={8} prefix={<UnlockOutlined />} />
      </FormItem>
      <FormItem
        label="Identity"
        name="identity"
        rules={[{ required: true, message: 'Identity is required' }]}
      >
        <Input prefix={<BarcodeOutlined />} />
      </FormItem>
      <FormItem label="InviterCode" name="inviterId">
        <Input prefix={<AppstoreAddOutlined />} />
      </FormItem>
      <FormItem label="Address" name="address">
        <TextArea rows={3} />
      </FormItem>
      <FormItem {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {' '}
          Sign up{' '}
        </Button>
      </FormItem>
    </Form>
  );
};

export default SignUp;
