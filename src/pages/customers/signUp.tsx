import React from 'react';
import { Form, Input, Button, notification } from 'antd';

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

  const onFinish = async (values) => {
    alert('Sign up')
    // if(values){
    //   const { success, ...result } = await createCustomer(values);
    //   if(success){
    //     notification.success({
    //       message:'Sign up customer success'
    //     })
    //     onCancel();
    //   } else {
    //     notification.error({
    //       message: 'Sign up customer failed'
    //     })
    //     onCancel();
    //   }
    // }
  }

  return (
    <Form form={form} onFinish={onFinish} {...layout}>
      <FormItem label="Email" name="email">
        <Input />
      </FormItem>
      <FormItem label="Password" name="password">
        <Input type='password' />
      </FormItem>
      <FormItem label="Phone" name="phone">
        <Input />
      </FormItem>
      <FormItem {...tailLayout}>
        <Button type='primary' htmlType='submit'> Sign up </Button>
      </FormItem>
    </Form>
  )
}

export default SignUp;