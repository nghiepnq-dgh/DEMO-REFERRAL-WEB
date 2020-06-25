import React, { useState, useEffect } from 'react';
import { Dispatch, connect, useIntl } from 'umi';
import { ConnectState } from '@/models/connect';
import classNames from 'classnames';
import { Form, Input, Button, Col, Row, Checkbox, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';

import styles from './index.less';
import { LockTwoTone, MailTwoTone } from '@ant-design/icons';
// import { getMe } from '@/services/users';
import FormSignUp from './signUp';

const FormItem = Form.Item;

interface LoginProps {
  dispatch: Dispatch;
  submitting?: boolean;
  className?: string;
  form?: FormInstance;
}

const Login: React.FC<LoginProps> = props => {
  const { className, submitting, form, dispatch } = props;
  const { formatMessage } = useIntl();
  const [ visibleSignUp, setVisibleSignUp ] = useState(false);
  const clsString = classNames(styles.submit);

  const handleFinish = (values: Store) => {
    dispatch({ type: 'user/login', payload: { ...values, grantType:'client_customer' } });
  };

  const onCancel = () => {
    setVisibleSignUp(false);
  }

  return (
    <div>
      <div className={styles.main}>
        <Modal
          visible={visibleSignUp}
          title="Sign up customer"
          footer={false}
          onCancel={onCancel}
        >
          <FormSignUp onCancel={onCancel} />
        </Modal>
        <div className={classNames(styles.login)}>
          <Row style={{ marginTop: 90, justifyContent: 'center' }}>
            <Col
              xs={{ span: 20 }}
              sm={{ span: 20 }}
              md={{ span: 20 }}
              lg={{ span: 20 }}
              xl={{ span: 20 }}
              xxl={{ span: 20 }}
            >
              <Form
                onFinish={handleFinish}
                form={form}
                initialValues={{ remember: true }}
              >
                <FormItem
                  name="userid"
                  style={{ marginBottom: 0 }}
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'login.requireEmail' }),
                    },
                  ]}
                >
                  <Input
                    className={styles.inputEmail}
                    placeholder="Email"
                    size="large"
                    prefix={
                      <MailTwoTone
                        twoToneColor="#bfbfbf"
                        className={styles.prefixIcon}
                      />
                    }
                  />
                </FormItem>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'login.requirePass' }),
                    },
                  ]}
                >
                  <Input.Password
                    className={styles.inputPassword}
                    placeholder={formatMessage({ id: 'login.password' })}
                    size="large"
                    prefix={
                      <LockTwoTone
                        twoToneColor="#bfbfbf"
                        className={styles.prefixIcon}
                      />
                    }
                  />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    className={clsString}
                    htmlType="submit"
                    type="primary"
                    size="large"
                    loading={submitting}
                  >
                    {formatMessage({ id: 'login.textLogin' })}
                  </Button>
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    style={{ marginTop: 10, fontSize: 15, fontWeight: 'bold' }}
                    type="primary"
                    size="large"
                    block
                    onClick={() => setVisibleSignUp(true)}
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
      <Row justify="center">
        <Col span={24} className={styles.powerBy}>
          Powered by Digitech Solutions
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ loading }: ConnectState) => ({
  submitting: loading.effects['user/login'],
}))(Login);
