import { fetch, fetchAuth } from '@/utils/request';

const routes = {
 login: 'v2/auth/token',
 getMe: 'v2/auth/profile'
}

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export function login(data){
  return fetch({
    url: routes.login,
    method:'POST',
    data
  })
}

export function getMe(){
  return fetchAuth({
    url: routes.getMe,
    method:'GET'
  })
}
