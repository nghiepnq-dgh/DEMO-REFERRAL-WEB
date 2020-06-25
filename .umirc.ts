import { defineConfig } from 'umi';
import { routes } from './config/routes';
import defaultSettings from './config/defaultSetting';

export default defineConfig({
  title: defaultSettings.title,
  // hash: true,
  history: { type: 'browser' },
  locale: {
    antd: true,
    default: 'vi-VN',
    baseNavigator: true,
    baseSeparator: '-',
    title: true,
  },
  dva: {
    // hmr: true,
    // skipModelValidate:true
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  analytics: {
    ga: 'UX_ANSNSN',
  },
  antd: {},
  ignoreMomentLocale: true,
  targets: {
    ie: 9,
  },
  pwa: false,
  theme: {
    '@primary-color': defaultSettings.primaryColor,
    '@font-size-base': '14px',
    '@link-color': defaultSettings.primaryColor,
    // '@layout-sider-background': '#121212',
    // 'layout-body-background': '#f0f2f5',
  },
  routes,
  define: {
    REACT_APP_ENV: process.env.REACT_APP_ENV || false,
  },
  favicon: '/digitech-smart.png',
});
