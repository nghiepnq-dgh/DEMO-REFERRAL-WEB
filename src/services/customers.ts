import request from 'umi-request';
import { fetch, fetchAuth } from '@/utils/request';
import store from 'store';

const routes = {
  listCustomer: 'v2/customer',
  createCustomer: 'v2/customer',
  updateCustomer: id => `v2/customer/${id}`,
  getDetailCustomer: id => `v2/customer/${id}`,
  getListReferralOfCustomer: id => `v2/customer/${id}/referral`,
  getListRewardOfCustomer: id => `v2/customer/${id}/reward`,
};

export function getListCustomers(params) {
  return fetchAuth({
    url: routes.listCustomer,
    method:'GET',
    params: {
      ...params
    }
  })
}

export function getDetailCustomer(id) {
  return fetchAuth({
    url: routes.getDetailCustomer(id),
    method:'GET'
  })
}

export function getListReferralOfCustomer(id) {
  return fetchAuth({
    url: routes.getListReferralOfCustomer(id),
    method:'GET'
  })
}

export function getListRewardOfCustomer(id) {
  return fetchAuth({
    url: routes.getListRewardOfCustomer(id),
    method:'GET'
  })
}

export function createCustomer(data) {

  const currentUser = store.get('currentUser');
  
  const newData = { ...data };
  newData.clientCustomerId = currentUser && currentUser.id || '';
  newData.active = true
  if(newData && newData.inviterId === undefined){
    newData.inviterId = ''
  }
  if(newData && newData.phone === undefined){
    newData.phone = ''
  }
  if(newData && newData.note === undefined){
    newData.note = ''
  }
  
  return fetchAuth({
    url: routes.createCustomer,
    method:'POST',
    data: newData
  })
}

export function updateCustomer(id, data) {
  const currentUser = store.get('currentUser');
  const newData = { ...data };
  newData.clientCustomerId = currentUser && currentUser.id || '';
  newData.active = true
  if(newData && newData.phone === undefined){
    newData.phone = ''
  }
  if(newData && newData.note === undefined){
    newData.note = ''
  }
  return fetchAuth({
    url: routes.updateCustomer(id),
    method:'PUT',
    data
  })
}
