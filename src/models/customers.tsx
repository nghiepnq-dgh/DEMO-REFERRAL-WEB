import { Effect, Reducer } from 'umi';
import { getListCustomers, getListRewardOfCustomer, getListReferralOfCustomer } from '@/services/customers';

export interface InviterItem {
  id: string;
  name: string;
  clientCustomerId: string;
  email: string;
  phone: string;
  note: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InviteeItem {
  id: string;
  name: string;
  clientCustomerId: string;
  email: string;
  phone: string;
  note: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignItem {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  rewardInviteeType: string;
  rewardInviterType: string;
  rewardInviterAmount: number;
  rewardInviteeAmount: number;
  active: string;
  description: string;
}

export interface ReferralItem {
  id: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  inviter: InviterItem;
  invitee: InviteeItem;
  campaign: CampaignItem;
}

export interface RewardsItem {
  referralId:number;
  status:string;
  amount:number;
  currency:string;
  description:string;
  orderPaymentId:number;
}

export interface CustomersItem {
  id: number;
  name: string;
  clientCustomerId: string;
  email: string;
  phone: string;
  note: string;
  active: boolean;
}

export interface CustomersModelState {
  listCustomers: CustomersItem[];
  listReferral?: ReferralItem[];
  listReward?: RewardsItem[];
  total:0;
}

export interface CustomersModelType {
  namespace: string;
  state: CustomersModelState;
  effects: {
    getListCustomers: Effect;
    getListReferral: Effect;
    getListReward:Effect;
  };
  reducers: {
    setListCustomers: Reducer<CustomersModelState>;
    setListReferral: Reducer<CustomersModelState>;
    setListReward: Reducer<CustomersModelState>;
    setTotal:Reducer<CustomersModelState>;
  };
}

const CustomersModel: CustomersModelType = {
  namespace: 'customers',
  state: {
    listCustomers: [],
    total:0
  },
  effects: {
    *getListCustomers({ payload }, { call, put }) {
      const { success, ...data } = yield call(getListCustomers, payload);
      if (success) {
        yield put({
          type: 'setListCustomers',
          payload: data.items || [],
        });
        yield put({
          type:'setTotal',
          payload: data.toal || 0
        })
      }
    },
    *getListReferral({ payload }, { call, put }) {
      const { success, ...data } = yield call(getListReferralOfCustomer, payload);
      if (success) {
        yield put({
          type: 'setListReferral',
          payload: data.items || [],
        });
        yield put({
          type:'setTotal',
          payload: data.toal || 0
        })
      }
    },
    *getListReward({ payload }, { call, put }) {
      const { success, ...data } = yield call(getListRewardOfCustomer, payload);
      if (success) {
        yield put({
          type: 'setListReward',
          payload: data.items || [],
        });
        yield put({
          type:'setTotal',
          payload: data.toal || 0
        })
      }
    },
  },
  reducers: {
    setListCustomers(state, { payload }) {
      return {
        total:0,
        ...state,
        listCustomers: payload,
      };
    },
    setListReferral(state, { payload }) {
      return {
        listCustomers:[],
        total:0,
        ...state,
        listReferral: payload,
      };
    },
    setListReward(state, { payload }) {
      return {
        listCustomers:[],
        total:0,
        ...state,
        listReward: payload,
      };
    },
    setTotal(state, { payload }) {
      return {
        listCustomers:[],
        ...state,
        total: payload
      }
    }
  },
};

export default CustomersModel;
