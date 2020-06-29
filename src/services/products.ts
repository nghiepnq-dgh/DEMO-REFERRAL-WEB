import { fetch, fetchAuth } from '@/utils/request';
import store from 'store';

const routes = {
  payment: 'order'
}

export function payment(data){

  const { id } = store.get('currentUser');
  const newData = {...data}
  
  newData.customerId = id

  return fetchAuth({
    url: routes.payment,
    method:'POST',
    data: newData
  })
}