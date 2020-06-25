import React, { useEffect, useState } from 'react';
import { Card, PageHeader, Col, Row, Descriptions, Avatar, Divider, Button, Tag } from 'antd';
import { useParams, history, useIntl } from 'umi';
import TypeComponent from '@/components/TypeComponent';
import { FileImageOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, GlobalOutlined, WarningOutlined, ContainerOutlined, UserOutlined } from '@ant-design/icons';
import { CustomersItem } from '@/models/customers';
import { getDetailCustomer } from '@/services/customers';

interface CustomerDetailProps {
  defaultCustomer: CustomersItem;
}

const DetailCustomer: React.FC<CustomerDetailProps> = props => {
  const { defaultCustomer } = props;
  const { id } = useParams();
  const [ idCustomer, setIdCustomer ] = useState(id);
  const [ customer, setCustomer ] = useState({});
  const { client } = customer;
  const { formatMessage } = useIntl();

  const fetch = async () => {
    const {success, ...data} = await getDetailCustomer(idCustomer);
    if(success){
      setCustomer(data);
    }
  }

  // const fetchListReferral = async () => {
  //   const {success, ...data} = await getDetailCustomer(idCustomer);
  //   if(success){
  //     setCustomer(data);
  //   }
  // }

  useEffect(() => {
    fetch();
  },[idCustomer]);

  useEffect(() => {
    setIdCustomer(id);
  },[id]);

  return (
    <Card>
      <PageHeader
        className="site-page-header-responsive"
        title={formatMessage({ id:'customer.customerInfor' })}
        onBack={() => history.goBack()}
      >
        <Row gutter={[16,16]}>
          <Col span={12}>
            <Row gutter={[16,16]}>
              <Col span={24}>
                <Card>
                  <Descriptions colon={false} column={4}>
                    <Descriptions.Item span={4}>
                      <div style={{ display:'flex', flexDirection:'row' }}>
                        <h3 style={{ paddingRight: 20 }}>{formatMessage({ id:'customer.customer' })}</h3>
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item span={1}><Avatar size={128} shape='square' src="/customer.png" /></Descriptions.Item>
                    <Descriptions.Item span={3}>
                      <h3> {customer && customer.name || ''}</h3>
                      <p>Code: <Tag color='blue'> {customer && customer.id || '--'} </Tag> </p>
                      <p>Client customer code: <Tag color='blue'> {customer && customer.clientCustomerId || '--'} </Tag> </p>
                    </Descriptions.Item>
                  </Descriptions>
                  <Divider orientation='left'> {formatMessage({ id:'customer.contactInfo' })} </Divider>
                  <Descriptions colon={false} column={4}>
                    <Descriptions.Item span={4}>
                      <p><Button style={{ marginRight: 10 }} shape='circle-outline'><MailOutlined /></Button> {customer ? customer.email:  <Tag icon={<WarningOutlined />}>{formatMessage({ id:'common.content.empty' })}</Tag>} </p>
                    </Descriptions.Item>
                    <Descriptions.Item span={4}>
                      <p><Button style={{ marginRight: 10 }} shape='circle-outline'><PhoneOutlined /></Button> {customer ? customer.phone:  <Tag icon={<WarningOutlined />}>{formatMessage({ id:'common.content.empty' })}</Tag> }</p>
                    </Descriptions.Item>
                    <Descriptions.Item span={4}>
                      <p> <i style={{ color: '#737373', fontWeight: 500 }}>Note:</i> {customer ? customer.note : <Tag icon={<WarningOutlined />}>{formatMessage({ id:'common.content.empty' })}</Tag> }</p>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col> 
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={[16,16]}>
              <Col span={24}>
                <Card>
                  <Descriptions colon={false} column={4}>
                    <Descriptions.Item span={4}>
                      <div style={{ display:'flex', flexDirection:'row' }}>
                        <h3 style={{ paddingRight: 20 }}>Client</h3>
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item span={1}><Avatar size={128} shape='square' src="/client.png" /></Descriptions.Item>
                    <Descriptions.Item span={3}>
                      <h3> {client && client.name || ''}</h3>
                      <p>Code: <Tag color='#2db7f5'> {client && client.id || '--'} </Tag> </p>
                      <p>Tax code: {client && client.taxCode || '--'} </p>
                      <p>Contact person: {client && client.contactPerson || '--'} </p>
                    </Descriptions.Item>
                  </Descriptions>
                  <Divider orientation='left'> {formatMessage({ id:'customer.contactInfo' })} </Divider>
                  <Descriptions colon={false} column={4}>
                    <Descriptions.Item span={4}>
                      <p><Button style={{ marginRight: 10 }} shape='circle-outline'><MailOutlined /></Button> {client ? client.companyEmail:  <Tag icon={<WarningOutlined />}>{formatMessage({ id:'common.content.empty' })}</Tag>} </p>
                    </Descriptions.Item>
                    <Descriptions.Item span={4}>
                      <p><Button style={{ marginRight: 10 }} shape='circle-outline'><PhoneOutlined /></Button> {client ? client.phone:  <Tag icon={<WarningOutlined />}>{formatMessage({ id:'common.content.empty' })}</Tag> }</p>
                    </Descriptions.Item>
                    <Descriptions.Item span={4}>
                      <p><Button style={{ marginRight: 10 }} shape='circle-outline'><GlobalOutlined /></Button> {client ? client.website:  <Tag icon={<WarningOutlined />}>{formatMessage({ id:'common.content.empty' })}</Tag> }</p>
                    </Descriptions.Item>
                    <Descriptions.Item span={4}>
                      <p><Button style={{ marginRight: 10 }} shape='circle-outline'><EnvironmentOutlined /></Button> {client ? client.address:  <Tag icon={<WarningOutlined />}>{formatMessage({ id:'common.content.empty' })}</Tag> }</p>
                    </Descriptions.Item>
                    <Descriptions.Item span={4}>
                      <p> <i style={{ color: '#737373', fontWeight: 500 }}>Max customer:</i> {client ? client.maxCustomerThreshold : <Tag icon={<WarningOutlined />}>{formatMessage({ id:'common.content.empty' })}</Tag> }</p>
                    </Descriptions.Item>
                    <Descriptions.Item span={4}>
                      <p> <i style={{ color: '#737373', fontWeight: 500 }}>Description:</i> {client ? client.description : <Tag icon={<WarningOutlined />}>{formatMessage({ id:'common.content.empty' })}</Tag> }</p>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col> 
            </Row>
          </Col>
        </Row>
      </PageHeader>
    </Card>
  )
}

export default DetailCustomer;