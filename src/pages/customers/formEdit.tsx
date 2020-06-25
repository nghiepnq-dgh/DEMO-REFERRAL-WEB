import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Row, Col, Select, Tag, notification } from 'antd';
import dayjs from 'dayjs';
import TextArea from 'antd/lib/input/TextArea';
import { connect, useIntl } from 'umi';
import { ConnectState } from '@/models/connect';
import { MailOutlined } from '@ant-design/icons';
import { format } from 'prettier';
const { Option } = Select;
import { UserItem } from '@/models/users';
import { updateCustomer, getDetailCustomer } from '@/services/customers';

interface CreateCustomerProps {
  currentUser: UserItem;
  onCancel: () => void;
  idCustomer: number;
}

const EditCustomer: React.FC<CreateCustomerProps> = props => {
  const [form] = Form.useForm();
  const FormItem = Form.Item;
  const { formatMessage } = useIntl();
  const { onCancel, currentUser, idCustomer } = props;
  const [ detailCustomer, setDetailCustomer ] = useState({});

  const fetchDetailCustomer = async () => {
    const { success, ...data } = await getDetailCustomer(idCustomer);
    if(success){
      setDetailCustomer({...data});
    }
  }

  useEffect(() => {
    fetchDetailCustomer();
  },[idCustomer]);

  useEffect(() => {
    form.setFieldsValue({ ...detailCustomer });
    // return () => {
    //   setDetailCustomer(detailCustomer);
    // };
  }, [detailCustomer]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = async (values) => {
    console.log("=>: onFinish -> values", values)
    if(values){
      const { success, ...result } = await updateCustomer(idCustomer, values);
      console.log("=>: onFinish -> result", result)
      console.log("=>: onFinish -> success", success)
      if(success){
        notification.success({
          message:'Edit customer success'
        })
        form.resetFields();
        onCancel();
      } else {
        notification.error({
          message: 'Edit customer failed'
        })
        form.resetFields();
        onCancel();
      }
    }
  }

  return (
    <Form form={form} {...layout} onFinish={onFinish}>
      <FormItem
        label={formatMessage({ id:'customer.customerName' })}
        name="name"
        rules={[{ required: true, message: formatMessage({ id:'customer.reqCustomerName' }) }]}
      >
        <Input />
      </FormItem>
      <FormItem
        label="Phone"
        name="phone"
      >
        <Input />
      </FormItem>
      <FormItem
        label="Email"
        name="email"
        rules={[
          { required: true, message: formatMessage({ id:'common.reqEmail' }) },
          { type: 'email', message: formatMessage({ id:'common.valEmail' }) },
        ]}
      >
        <Input prefix={<MailOutlined />} />
      </FormItem>
      <FormItem label={formatMessage({ id:'customer.note' })} name="note">
        <TextArea rows={3} />
      </FormItem>
      <FormItem {...tailLayout}>
        <Button type="primary" htmlType='submit'> {formatMessage({ id:'common.edit' })} </Button>
      </FormItem>
    </Form>
  );
};

export default connect(( { user }:ConnectState ) => ({
  currentUser: user.currentUser
}))(EditCustomer);