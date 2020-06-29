import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';

const AccountProfile = props => {

  const onRedirectReferral = () => {
    alert('redirect !')
  }

  return (
    <PageHeaderWrapper>
      <Card title="User information" extra={<Button type='primary' onClick={onRedirectReferral}> Referral </Button> }>
        <h1 style={{ fontWeight: 'bold' }}> This is profile page ! </h1>
      </Card>
    </PageHeaderWrapper>
  )
}

export default AccountProfile;