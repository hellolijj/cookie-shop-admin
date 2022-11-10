import { Space, Image } from 'antd';
import { listShoppingCarGoods } from '@/services/cookie-shop-admin/shoppingcar';
import {createOrder} from '@/services/cookie-shop-admin/order'
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
    ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import { useModel } from '@umijs/max';


const handleCreateOrder = async (selectedRows: API.GoodListItem[]) => {
    const hide = message.loading('正在下单');
    if (!selectedRows) return true;
    try {
        await createOrder({
            data: selectedRows,
        });
        hide();
        message.success('Deleted successfully and will refresh soon');
        return true;
    } catch (error) {
        hide();
        message.error('Delete failed, please try again');
        return false;
    }
};

const ShoppingCar: React.FC = () => {
    const car = useModel('shoppingcar');
    const actionRef = useRef<ActionType>();
    const [selectedRowsState, setSelectedRows] = useState<API.GoodListItem[]>([]);

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();

    const handleOpShoppingCar = async (params) => {
        if(!params) return true;
        const hide = message.loading("正在处理购物车");
        console.log(params)
        try {
            if (params.op == "add") {
                await car.add(params)
            }
            if (params.op == "sub") {
                await car.sub(params)
            }
            hide();
            message.success('购物车操作成功');
            return true;
        } catch (error) {
            hide();
            message.error('购物车操作失败');
            return false;
        }
    }

    const columns: ProColumns<API.GoodListItem>[] = [
        {
            title: "商品id",
            dataIndex: "id",
            // order: <tr></tr>
            // sort: true,
            hideInTable: true,
        },
        {
            title: '商品名称',
            dataIndex: 'name',
            render: (dom, entity) => {
                return (
                    <a
                    >
                        {dom}
                    </a>
                );
            },
            hideInSearch: true,
        },
        {
            title: '图片',
            dataIndex: 'cover',
            render(dom, entity, index, action, schema) {
                return <Image
                    height={100}
                    src={dom}
                />
            },
            hideInSearch: true,
        },
        {
            title: '商品描述',
            dataIndex: 'intro',
            valueType: 'textarea',
            hideInSearch: true,
        },
        {
            title: '价格',
            dataIndex: 'price',
            hideInForm: true,
            hideInSearch: true,
        },
        {
            title: '数量',
            dataIndex: 'count',
            sorter: true,
            hideInForm: true,
            hideInSearch: true,
        },
        {
            title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <Button size="small" type="primary" onClick={async () => {
                    await handleOpShoppingCar({"op":"add", "id": record.id, "num": 1});
                    setSelectedRows([]);
                    actionRef.current?.reloadAndRest?.();
                }}>增加</Button>
                ,
                <Button size="small"  type="primary" onClick={async () => {
                    if (record.count == 0) {
                        message.error("购物车数量不可以再减少")
                        return
                    }
                    await handleOpShoppingCar({"op":"sub", "id": record.id, "num": 1});
                    setSelectedRows([]);
                    actionRef.current?.reloadAndRest?.();
                }}>减少</Button>
            ],
        },
    ];


    return (
        <div>

            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle="购物车列表"
                actionRef={actionRef}
                rowKey="id"
                request={listShoppingCarGoods}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    },
                }}
                search={false}
                tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
                    <Space size={24}>
                        <span>
                            已选 {selectedRowKeys.length} 项
                            <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                                取消选择
                            </a>
                        </span>
                        <span>{`商品数量: ${selectedRows.reduce(
                            (pre, item) => pre + item.count,
                            0,
                        )} `}</span>
                        <span>{`价格: ${selectedRows.reduce(
                            (pre, item) => pre + (item.count * item.price),
                            0,
                        )} 元`}</span>
                    </Space>
                )}
                tableAlertOptionRender={() => {
                    return (
                        <Space size={16}>
                            <Button type="primary" onClick={async () => {
                                await handleCreateOrder(selectedRowsState);
                                setSelectedRows([]);
                                actionRef.current?.reloadAndRest?.();
                            }}>下单</Button>
                        </Space>
                    );
                }}
            />
        </div>
    );
};

export default ShoppingCar;