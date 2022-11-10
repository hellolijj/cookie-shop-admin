import { ShoppingCartOutlined  } from '@ant-design/icons';
import { Badge } from 'antd';
import classNames from 'classnames';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React from 'react';
import styles from '../NoticeIcon/index.less';
import type { NoticeIconTabProps } from '../NoticeIcon/NoticeList';
import { history } from 'umi';

export type NoticeIconProps = {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  style?: React.CSSProperties;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  children?: React.ReactElement<NoticeIconTabProps>[];
};

const ShoppingCarIcon: React.FC<NoticeIconProps> & {
  
} = (props) => {
  const { className, count, bell } = props;
  const [visible, setVisible] = useMergedState<boolean>(false, {
    value: props.popupVisible,
    onChange: props.onPopupVisibleChange,
  });
  const noticeButtonClass = classNames(className, styles.noticeButton);
  const NoticeBellIcon = bell || <ShoppingCartOutlined className={styles.icon} />;
  const trigger = (
    <span className={classNames(noticeButtonClass, { opened: visible })} onClick={()=>{
      history.push(`/shoppingcar`);
    }}>
      <Badge count={count} style={{ boxShadow: 'none' }} className={styles.badge}>
        {NoticeBellIcon}
      </Badge>
    </span>
  );

  return trigger;
};

export default ShoppingCarIcon;
