import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, Modal, Row, Col, Input, Radio, Tag } from 'antd';
import { connect, Dispatch, CustomersItem, history, useIntl } from 'umi';
import { ConnectState } from '@/models/connect';
import RoleComponent from '@/components/RoleComponent';
import debounce from 'lodash/debounce';
import {
  PhoneOutlined,
  MailOutlined,
  EyeOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import FormCreate from './formCreate';
import FormEdit from './formEdit';

class Params {
  limit: number = 10;
  page: number = 1;
  name?: string;
  clientCustomerId?:string;
  email?:string;
  id?:string;
  active?:boolean;
}

interface CustomersProp {
  loading: boolean;
  dispatch: Dispatch;
  data: CustomersItem[];
  total: number;
}

const CustomersPage: React.FC<CustomersProp> = props => {

  const { loading, data, dispatch, total } = props;
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [ idCustomer, setIdCustomer ] = useState(0);
  const [ params, setParams ] = useState(new Params());
  const { formatMessage } = useIntl();

  const fetch = async () => {
    dispatch({ type: 'customers/getListCustomers', payload: params });
  };

  useEffect(() => {
    fetch();
  }, [params]);

  const onCancel = () => {
    setVisibleAdd(false);
    setVisibleEdit(false);
  };

  const showTotal = (total: number) => {
    return formatMessage({ id: 'customer.totalItem' }, { total: total });
  };

  const onTableChange = (page: number) => {
    const newParams = { ...params };
    if (params.page !== page) {
      newParams.page = page;
    }

    setParams(newParams);
  };

  const onShowSizeChange = (current: number, size: number) => {
    return setParams({
      ...params,
      limit: size,
    });
  };

  let onChangeName = (name) => {
    setParams({
      ...params,
      name
    })
  }

  onChangeName = debounce(onChangeName, 600);

  let onChangeClientCustomerID = (clientCustomerId) => {
    setParams({
      ...params,
      clientCustomerId
    })
  }

  onChangeClientCustomerID = debounce(onChangeClientCustomerID, 600);

  let onChangeEmail = (email) => {
    setParams({
      ...params,
      email
    })
  }

  onChangeEmail = debounce(onChangeEmail, 600);

  let onChangecode = (id) => {
     setParams({
      ...params,
      id
    })
  }

  onChangecode = debounce(onChangecode, 600);

  let onChangeActive = (active) => {
    setParams({
      ...params,
      active
    })
  }

  onChangeActive = debounce(onChangeActive, 600);

  const handleEditCustomer = (id) => () => {
    setVisibleEdit(true);
    setIdCustomer(id);
  }

  const columns: ColumnProps<CustomersItem>[] = [
    {
      title: formatMessage({ id:'customer.index' }),
      key: 'index',
      render: (v, t, i) => i + 1,
    },
    {
      title: formatMessage({ id:'customer.customer' }),
      align:'center',
      key: 'name',
      render: value => (
        <Button type="link" onClick={() => history.push(`/customers/${value.id}`)}>
          {value && value.name || ''}
        </Button>
      ),
    },
    {
      title: formatMessage({ id:'customer.contact' }),
      key: 'phone',
      render: value => {
        return (
          <>
            <p>
              <PhoneOutlined /> {value.phone || ''}
            </p>
            <p>
              <MailOutlined /> {value.email || ''}
            </p>
          </>
        );
      },
    },
    {
      title: 'Customer Client ID',
      dataIndex: 'clientCustomerId',
      key: 'clientCustomerId',
      render: value => value ? <Tag color='geekblue'>#{value}</Tag> : <Tag>No code</Tag>
    },
    {
      title: 'Customer ID',
      dataIndex: 'id',
      key: 'id',
      render: value => value ? <Tag color='blue'>#{value}</Tag> : <Tag>No code</Tag>
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: formatMessage({ id:'common.action' }),
      align: 'center',
      key: 'action',
      render: value => {
        return (
          <div >
            <Button
              onClick={handleEditCustomer(value.id)}
              style={{ marginRight: 10 }}
            >
              <EditOutlined /> {formatMessage({ id:'common.edit' })}
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <PageHeaderWrapper>
      <Card extra={
        <div style={{ width: 1300 }}>
          <Row gutter={16}>
            <Col span={5}>
              <Input.Search onChange={e => onChangeName(e.target.value)} placeholder={formatMessage({ id:'customer.customerName' })} name="name" allowClear />
            </Col>
            <Col span={5}>
              <Input.Search onChange={e => onChangeClientCustomerID(e.target.value)} placeholder={formatMessage({ id:'customer.clientCustomerID' })} name="clientCustomerId" allowClear />
            </Col>
            <Col span={4}>
              <Input.Search onChange={e => onChangecode(e.target.value)} placeholder={formatMessage({ id:'customer.code' })} name="id" allowClear />
            </Col>
            <Col span={4}>
              <Input.Search onChange={e => onChangeEmail(e.target.value)} placeholder="Email" name="email" prefix={<MailOutlined />} allowClear />
            </Col>
            <Col span={6}>
              <Radio.Group defaultValue="" buttonStyle="solid" name="active" onChange={e => onChangeActive(e.target.value)}>
                <Radio.Button value=""> {formatMessage({ id:'common.all' })} </Radio.Button>
                <Radio.Button value="true"> {formatMessage({ id:'common.active' })} </Radio.Button>
                <Radio.Button value="false"> {formatMessage({ id:'common.deactive' })} </Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        </div>
      }>
        <Button block type="dashed" onClick={() => setVisibleAdd(true)}>
          {' '}
          <PlusOutlined /> {formatMessage({ id:'common.add' })}
        </Button>
        <Table 
          scroll={{ x: 1024 }}
          columns={columns} 
          dataSource={data} 
          loading={loading}
          pagination={{
            showSizeChanger: true,
            current: params.page,
            pageSize: params.limit,
            total: total,
            showTotal: showTotal,
            onChange: onTableChange,
            onShowSizeChange: onShowSizeChange,
          }}
          />
      </Card>
      <Modal
        title={formatMessage({ id:'customer.createCustomer' })}
        visible={visibleAdd}
        footer={null}
        onCancel={onCancel}
        width={600}
      >
        <FormCreate onCancel={onCancel} />
      </Modal>
      <Modal
        title={formatMessage({ id:'customer.editCustomer' })}
        visible={visibleEdit}
        footer={null}
        onCancel={onCancel}
        width={600}
      >
        <FormEdit onCancel={onCancel} idCustomer={idCustomer} />
      </Modal>
    </PageHeaderWrapper>
  );
};

export default connect(({ customers, loading }: ConnectState) => ({
  data: customers.listCustomers,
  loading: loading.effects['customers/getListCustomers'],
  total: customers.total
}))(CustomersPage);
