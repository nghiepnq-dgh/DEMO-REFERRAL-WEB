import { AccountRole, SystemRole, Privilege } from './utils/constants';
import store from 'store'

export default function() {
  const currentUser = store.get('currentUser');
  const { role } = currentUser;
  
  return {
    readProduct: role === 'CUSTOMER' || false,
    payment: role === 'CUSTOMER' || false,
    readCustomer: role === 'CLIENT' || false,
  };
}