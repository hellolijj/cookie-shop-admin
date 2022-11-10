import { FilterOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { SelectLang, useModel } from '@umijs/max';
import { Space } from 'antd';
import React from 'react';
import HeaderSearch from '../HeaderSearch';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import NoticeIconView from '../NoticeIcon'
import ShoppingCarIconView from '../ShoppingCar'

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'realDark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue=""
        options={[
          { label: <a href="/good/shop/1">经典法式</a>, value: '' },
          { label: <a href="/good/shop/2">精品慕斯</a>, value: '' },
          { label: <a href="/good/shop/3">奶油戚风</a>, value: '' },
          { label: <a href="/good/shop/4">情人系列</a>, value: '' },
        ]}
        // onSearch={value => {
        //   console.log('input', value);
        // }}
      />
      <ShoppingCarIconView />
      <Avatar />
      <SelectLang className={styles.action} />
    </Space>
  );
};
export default GlobalHeaderRight;
