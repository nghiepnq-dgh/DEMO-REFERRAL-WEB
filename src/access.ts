import { AccountRole, SystemRole, Privilege } from './utils/constants';
import store from 'store'

export default function() {

  const currentUser = store.get('currentUser');
  
  return {
    // fix: check currentUser
    readProduct: currentUser && currentUser.role === 'CUSTOMER' || false,
    payment: currentUser && currentUser.role === 'CUSTOMER' || false,
    readCustomer: currentUser && currentUser.role === 'CLIENT' || false,
  };
}