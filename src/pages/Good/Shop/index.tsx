import { Card, List, Image, Button, Typography, message } from 'antd';
import type { FC } from 'react';
import { listGood } from '@/services/cookie-shop-admin/good';
import {typeIdToName} from '@/services/cookie-shop-admin/utils'

import styles from './style.less';
import { useModel, useRequest } from '@umijs/max';

const { Paragraph } = Typography;
import {
  PageContainer,
  
} from '@ant-design/pro-components';
import { constant } from 'lodash';


const GoodShop: FC = () => {
  const car = useModel('shoppingcar');
  
  const { data, loading } = useRequest((values: any) => {
    const url = new URL(window.location.href)
    const typeId = url.pathname.split('/')[3]
    if (typeId) {
      return listGood({
        query: "typeId:"+typeId,
      });
    }

    return listGood({});
  });

  const genTitle = () => {
    const url = new URL(window.location.href)
    const typeId = url.pathname.split('/')[3]
    var title = "商品分类："
    if (typeId) {
      return title + typeIdToName(typeId)
    }

    const key = url.pathname.split('/')[2]
    if (key == "new") {
      return title + "新品"
    }
    if (key == "show") {
      return title + "全部系列"
    }
    if (key == "hot") {
      return title + "热销"
    }
  }

  const list = data;

  const cardList = list && (
    <List<API.GoodListItem>
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card className={styles.card} hoverable cover={<Image alt={item.title} src={item.cover}/>}>
            <Card.Meta
              description={
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  <a href={"/good/detail?id="+item.id}>{item.name}</a>
                  {/*商品描述，此处不展示 */}
                {/* {item.intro} */}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{item.price}</span>
              <div className={styles.avatarList}>
                <Button size="small" type='primary' onClick={async ()=> {                  
                  await car.add(item)
                  message.info("加入购物车成功")
                }} >加入购物车</Button>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
  return (
    

<div className={styles.coverCardList}>
{/* <PageContainer> */}
      <Card bordered={false} title={genTitle()}> 
      </Card>
      <div className={styles.cardList}>{cardList}</div>
      {/* </PageContainer> */}
    </div>
    
    
  );
};

export default GoodShop;
