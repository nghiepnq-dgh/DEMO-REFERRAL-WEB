import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Button, Input, Tag, Row, Col, notification } from 'antd';
const { Meta } = Card;
import { payment } from '@/services/products';

const Product = props => {
  const [form] = Form.useForm();
  const FormItem = Form.Item;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = async (values) => {
    if(values){
      const { success, ...data } = await payment(values);
      if(success){
        notification.success({
          message:'Payment success'
        })
      } else {
        notification.error({
          message: 'Payment failed'
        })
      }
    }
  }

  return (
    <PageHeaderWrapper>
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[16,16]} justify='center'>
            <Col span={13}>
              <FormItem>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="Product" src="mackbook.jpg" />}
                  >
                </Card>
              </FormItem>
            </Col>
            <Col span={13}>
              <FormItem>
                <Input style={{ width: 240, marginRight: 10 }} placeholder="Product name" />
              </FormItem>
            </Col>
            <Col span={13}>
              <FormItem name='price'>
                <Input style={{ width: 240, marginRight: 10 }} placeholder="Price" suffix={<Tag color="green">VND</Tag> } name="amount" />
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType='submit'> Payment </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>
  )
}

export default Product;