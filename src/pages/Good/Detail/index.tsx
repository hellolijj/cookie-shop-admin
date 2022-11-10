import { Button, Col, Typography, Row, Descriptions, Image, message } from 'antd';
import { GridContent, PageContainer, } from '@ant-design/pro-layout';

import React, { useState } from 'react';
import styles from '../Shop/style.less';
import { listGood } from '@/services/cookie-shop-admin/good';
import { useModel, useRequest } from '@umijs/max';
import { typeIdToName } from '@/services/cookie-shop-admin/utils';

const { Paragraph, Title } = Typography;

const GoodDetail: React.FC = () => {

    const car = useModel('shoppingcar');

    const { data, loading, run } = useRequest((values: any) => {
        let params=new URLSearchParams(window.location.search)
        const id = params.get('id')
        if (!id) {
            message.error('参数错误')
            return
        }

        return listGood({
            "query": "id:"+id,
        });
    });


    const [visible, setVisible] = useState(false);

    let info = null
    if (data?.length > 0) {
        info = data[0]
    }

    const goodInfo = info && (
        <GridContent>
            <Row gutter={24}>
                <Col lg={12} md={24}>
                    <Image
                        preview={{ visible: false }}
                        src={info.cover}
                        onClick={() => setVisible(true)}
                    />
                    <div style={{ display: 'none' }}>
                        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                            <Image src={info.cover} />
                        </Image.PreviewGroup>
                    </div>

                </Col>
                <Col lg={12} md={24}>
                    <Typography>
                        <Title level={4}>{info.name}</Title>
                        <Paragraph ellipsis={{ rows: 2 }}>
                            介绍:{info.intro}
                        </Paragraph>
                        <Paragraph ellipsis={{ rows: 2 }}>
                        价格:{info.price}
                        </Paragraph>
                        <Paragraph ellipsis={{ rows: 2 }}>
                        库存:{info.stock}
                        </Paragraph>
                        <Paragraph ellipsis={{ rows: 2 }}>
                            分类:{typeIdToName(info.typeId)}
                        </Paragraph>
                        
                        
                        <Button size="small" type='primary' onClick={async ()=> {                  
                            await car.add({"goodId": info.id})
                            message.info("加入购物车成功")
                            }} >加入购物车</Button>
                    </Typography>
                </Col>
            </Row>
        </GridContent>
      );

    return goodInfo;
};


export default GoodDetail;