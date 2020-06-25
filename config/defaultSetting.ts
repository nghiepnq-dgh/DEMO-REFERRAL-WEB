import { Settings } from '@ant-design/pro-layout';
export type ContentWidth = 'Fluid' | 'Fixed';

export default {
  title: 'Simulate CMS Customer',
  navTheme: 'dark',
  primaryColor: '#0070B8',
  layout: 'sidemenu',
  fixSiderbar: false,
  fixedHeader: true,
  contentWidth: 'Fluid',
  menu: {
    locale: true,
  },
  iconfontUrl: '',
  colorWeak: false,
  collapsed: true,
} as Settings;
