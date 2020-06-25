import { fetch, fetchAuth } from '@/utils/request';
import store from 'store';

const routes = {
  payment: 'v2/payment-order'
}

export function payment(data){

  const { id } = store.get('currentUser');
  const newData = {...data}
  
  newData.customerId = id
  newData.currency = 'vnd'
  newData.paymentMethod = 'bank-contact'

  return fetchAuth({
    url: routes.payment,
    method:'POST',
    data: newData
  })
}