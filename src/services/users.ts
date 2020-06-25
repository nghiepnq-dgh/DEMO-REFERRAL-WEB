import { fetch, fetchAuth } from '@/utils/request';

const routes = {
 getMe: 'me',
 signUp:'signup',
 signIn:'signin',
 seedUser: 'seed_user'
}

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export function getMe(){
  return fetchAuth({
    url: routes.getMe,
    method:'POST'
  })
}

export function signIn(data){
  return fetch({
    url: routes.signIn,
    method:'POST',
    data
  })
}

export function signUp(data){

  const newData = { ...data }

  newData.address = "";
  newData.role = 'CUSTOMER';

  return fetch({
    url: routes.signUp,
    method:'POST',
    data: newData
  })
}

export function seed_user(){
  return fetch({
    url:routes.seedUser,
    method:'POST'
  })
}
