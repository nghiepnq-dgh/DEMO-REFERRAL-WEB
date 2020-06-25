import React from 'react';
import { ROLE_CLIENTS } from '@/utils/constants';
import { Tag } from 'antd';
import { useIntl } from 'umi';

interface StatusProps {
  role?: number;
}

const RoleComponent: React.FC<StatusProps> = props => {
  const { role } = props;
  const { formatMessage } = useIntl();
  if (!role) return null;

  switch (role) {
    case 0:
      return (
        <Tag style={{ margin: 0 }} color="#339966">
          {formatMessage({ id: `common.role.${ROLE_CLIENTS[0]}` })}
        </Tag>
      );
    case 1:
      return (
        <Tag style={{ margin: 0 }} color="#00ccff">
          {formatMessage({ id: `common.role.${ROLE_CLIENTS[1]}` })}
        </Tag>
      );
    case 2:
      return (
        <Tag style={{ margin: 0 }} color="#3366cc">
          {formatMessage({ id: `common.role.${ROLE_CLIENTS[2]}` })}
        </Tag>
      );
    case 3:
      return (
        <Tag style={{ margin: 0 }} color="#009933">
          {formatMessage({ id: `common.role.${ROLE_CLIENTS[3]}` })}
        </Tag>
      );
    default:
      return null;
  }
};

export default RoleComponent;
