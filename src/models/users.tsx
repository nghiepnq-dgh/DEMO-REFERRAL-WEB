import { Effect, Reducer, history, formatMessage } from 'umi';
import { getStateFromStore, getPageQuery } from '@/utils/utils';
import store from 'store';
import { login, getMe } from '@/services/users';
import { notification } from 'antd';
import { stringify } from 'querystring';

export interface LoginParams {
  userid: string;
  password: string;
  grantType: string;
}

export interface UserItem {
  id: number,
  fullName: string;
  password: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

export interface UserModelState {
  accessToken?: string;
  currentUser?: UserItem;
}

interface UserModelType {
  namespace: string,
  state: UserModelState,
  effects: {
    login: Effect;
    logout: Effect;
    getMe: Effect;
  },
  reducers: {
    setAccessToken: Reducer<UserModelState>;
    saveCurrentUser: Reducer<UserModelState>;
  }
} 

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    accessToken: getStateFromStore('accessToken'),
    currentUser: getStateFromStore('currentUser')
  },
  effects: {
    *login({ payload },{ call, put }) {
      const { success, ...result  } = yield call(login, payload);
      if(success) {
        yield put({
          type: 'setAccessToken',
          payload: result.accessToken,
        });

        notification.success({
          message: formatMessage({ id: 'login.success' }),
        });

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }
    },
    *getMe({ payload },{ call, put }){
      const oldUser = store.get('currentUser');

      const { success, ...userInfo } = yield call(getMe);
      if (success) {
        yield put({
          type: 'saveCurrentUser',
          payload: userInfo,
        });
      }
      
      if (oldUser && oldUser.id !== userInfo.id) {
        window.location.reload();
      }
    },
    logout() {
      const { redirect } = getPageQuery();
      if (window.location.pathname !== '/login') {
        store.set('accessToken', null);
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: redirect || window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    setAccessToken(state, { payload }): UserModelState {
      store.set('accessToken', payload);
      return {
        ...state,
        accessToken: payload
      }
    },
    saveCurrentUser(state, { payload }): UserModelState {
      store.set('currentUser', payload);
      return {
        ...state,
        currentUser: payload
      }
    }
  }
}

export default UserModel;