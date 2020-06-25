import React from 'react';
import { UserStatus } from '@/utils/constants';
import { Tag } from 'antd';
import { useIntl } from 'umi';

interface StatusProps {
  status?: number;
}

const StatusComponent: React.FC<StatusProps> = props => {
  const { status } = props;
  const { formatMessage } = useIntl();
  if (!status) return null;

  switch (status) {
    case 0:
      return (
        <Tag style={{ margin: 0 }} color="green">
          {formatMessage({ id: `common.status.${UserStatus[status]}` })}
        </Tag>
      );
    case 1:
      return (
        <Tag style={{ margin: 0 }} color="#2db7f5">
          {formatMessage({ id: `common.status.${UserStatus[status]}` })}
        </Tag>
      );
    case 2:
      return (
        <Tag style={{ margin: 0 }} color="red">
          {formatMessage({ id: `common.status.${UserStatus[status]}` })}
        </Tag>
      );
    default:
      return null;
  }
};

export default StatusComponent;
