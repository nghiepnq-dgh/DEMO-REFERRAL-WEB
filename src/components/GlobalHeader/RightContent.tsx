import React, { useEffect, useState } from 'react';
import { ConnectProps } from 'umi';
import styles from './index.less';
import Avatar from './AvatarDropdown';

import SelectLang from '../SelectLang';
import { ssoCustomer } from '@/services/users';
export type SiderTheme = 'light' | 'dark';
import store from 'store';
import { notification, Button } from 'antd';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  theme?: SiderTheme;
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme } = props;
  const [url, setUrl] = useState('');
  console.log("=>: url", url)
  let className = styles.right;
  let classButtom = styles.referral;
  if (theme === 'dark') {
    className = `${styles.dark}`;
  }

  useEffect(() => {
    handleGotoReferral();
  }, []);

  const handleGotoReferral = async () => {
    const { id } = store.get('currentUser');
    const result = await ssoCustomer(id);
    if (result.success) {
      setUrl(result.url);
    } else {
      notification.error({
        message: 'Go to Referral Have Error',
      });
    }
  };
  return (
    <div className={className}>
      <Button type='primary' className={classButtom}>
        <a href={url} target="_blank">
          Go to referral
        </a>
      </Button>
      <Avatar />
      <SelectLang className={styles.action} />
    </div>
  );
};

export default GlobalHeaderRight;
