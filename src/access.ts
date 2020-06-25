import { AccountRole, SystemRole, Privilege } from './utils/constants';
import store from 'store'

export default function() {
  const currentUser = store.get('currentUser');
  const { permissions } = currentUser;

  const hasPermission = (userPermissions: string[], permissionNeedCheck: string): boolean => {
    return userPermissions.includes(permissionNeedCheck);
  } 
  
  return {
    readProduct: hasPermission(permissions, Privilege.CREATE_CLIENT) || false,
    payment: hasPermission(permissions, Privilege.READ_CLIENT) || false,
    readCustomer: hasPermission(permissions, Privilege.READ_ANY_PAYMENT) || false,
  };
}