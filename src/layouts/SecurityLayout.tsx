import React, { useState, useEffect } from 'react';
import {
  Redirect,
  connect,
  ConnectProps,
  useLocation,
  history,
  Dispatch,
} from 'umi';
import { UserItem } from '@/models/users';
import { stringify } from 'querystring';
import { PageLoading } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: UserItem;
  accessToken?: string;
  children: any;
  dispatch: Dispatch;
}

const SecurityLayout: React.FC<SecurityLayoutProps> = props => {

  const { children, loading, accessToken, dispatch, currentUser } = props;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    if (dispatch) {
      dispatch({ type: 'user/getMe' });
    }
  }, []);

  const location = useLocation();

  const queryString = stringify({
    redirect: window.location.href,
  });

  const isLogin = currentUser && currentUser.id && accessToken;

  if ((!isLogin && loading) || !isReady) {
    return <PageLoading />;
  }

  if (!isLogin && location.pathname !== '/login') {
    return <Redirect to={`/login`} />;
  }

  return children;
};

export default connect(({ user, loading }: ConnectState) => ({
  accessToken: user.accessToken,
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
