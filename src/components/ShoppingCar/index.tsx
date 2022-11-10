import { useModel, useRequest } from '@umijs/max';  
import styles from '../NoticeIcon/index.less';
import ShoppingCarIcon from './ShoppingCarIcon';


const ShoppingCarIconView: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const car = useModel('shoppingcar');
  

  return (
    <ShoppingCarIcon
      className={styles.action}
      count={car && car.count}
      loading={false}
    />
  );
};

export default ShoppingCarIconView;
