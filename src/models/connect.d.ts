import { MenuDataItem } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { ReferralModelState } from './referral';
import { CampaignState } from './campaign';
import { CustomersModelState } from './customers';
import { ClientSettingState } from './settingClient';

import { Settings } from '@ant-design/pro-layout';
import { AccountState } from './account';
import { ClientsModelState } from './clients';
import { RewardsModelState } from 'umi';
import { UserModelState } from 'umi';

export { GlobalModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    referral?: boolean;
    campaign?: boolean;
    customers?: boolean;
    account?: boolean;
    client?: boolean;
    clientSetting?: boolean;
    reward?:boolean;
    user?:boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: Settings;
  referral: ReferralModelState;
  campaign: CampaignState;
  customers: CustomersModelState;
  account: AccountState;
  client: ClientsModelState;
  clientSetting: ClientSettingState;
  reward: RewardsModelState;
  user:UserModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
