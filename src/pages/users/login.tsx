import React, { useState, useEffect } from 'react';
import { Dispatch, connect, useIntl } from 'umi';
import { ConnectState } from '@/models/connect';
import classNames from 'classnames';
import { Form, Input, Button, Col, Row, Checkbox } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';

import styles from './index.less';
import { LockTwoTone, MailTwoTone } from '@ant-design/icons';
// import { getMe } from '@/services/users';

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
  const clsString = classNames(styles.submit);

  const handleFinish = (values: Store) => {
    dispatch({ type: 'user/login', payload: { ...values } });
  };

  return (
    <div>
      <div className={styles.main}>
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
                  name="email"
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
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}
                >
                  <FormItem className={styles.forgotPass}>
                    <p>
                      <Checkbox
                        style={{ border: 'none', outline: 'none' }}
                        name="remember"
                      />{' '}
                      {formatMessage({ id: 'login.remember' })}
                    </p>
                  </FormItem>
                  <FormItem className={styles.rememberMe}>
                    <Button
                      type="link"
                      onClick={() => alert('You must do it !')}
                    >
                      {formatMessage({ id: 'login.forgotPass' })}
                    </Button>
                  </FormItem>
                </div>
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
