import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // navTheme: 'light',
  // // 拂晓蓝
  // colorPrimary: '#1890ff',
  // layout: 'mix',
  // contentWidth: 'Fluid',
  // fixedHeader: false,
  // fixSiderbar: true,
  // colorWeak: false,
  "title": '蛋糕商城',
  // pwa: false,
  // logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  // iconfontUrl: '',

  
  "navTheme": "light",
  "colorPrimary": "#ff7100",
  "layout": "top",
  "contentWidth": "Fixed",
  "fixedHeader": true,
  "fixSiderbar": true,
  "pwa": false,
  "logo": "/logo.png",
  "splitMenus": false
  
};

export default Settings;
