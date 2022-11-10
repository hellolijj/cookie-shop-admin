import { Form, Select, Space, Image } from 'antd';
import type { FC } from 'react';
import { listOrders, payOrder } from '@/services/cookie-shop-admin/order';
import { addRule, removeRule, rule, updateRule } from '@/services/cookie-shop-admin/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
    ProTable,
    FooterToolbar,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';


const handlePayOrder = async (selectedRows) => {
    console.log(selectedRows)
    const hide = message.loading('正在付款');
    if (!selectedRows) return true;
    try {
        await payOrder({
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


const OrderList: React.FC = () => {
    /**
     * @en-US Pop-up window of new window
     * @zh-CN 新建窗口的弹窗
     *  */
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

    const [showDetail, setShowDetail] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.GoodListItem>();
    const [selectedRowsState, setSelectedRows] = useState<API.GoodListItem[]>([]);

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();

    const columns: ProColumns<API.GoodListItem>[] = [
        {
            title: "订单号",
            dataIndex: 'id',
        },
        {
            title: '商品名称',
            dataIndex: 'name',
            render: (dom, entity) => {
                return (
                    <a
                        onClick={() => {
                            setCurrentRow(entity);
                            setShowDetail(true);
                        }}
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
            title: '状态',
            dataIndex: 'status',
            valueEnum: {
                "0": {
                    text: '已取消',
                    status: 'Default',
                },
                "1": {
                    text: '已下单',
                    status: 'Processing',
                },
                "2": {
                    text: '已付款',
                    status: 'Success',
                },
            },
        },
    ];


    return (
        <div>

            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle="订单列表"
                actionRef={actionRef}
                rowKey="id"
                request={listOrders}
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
                        </span>
                        <span>{`商品数量: ${selectedRows.reduce(
                            (pre, item) => pre + item.count,
                            0,
                        )} `}</span>
                        <span>{`价格: ${selectedRows.reduce(
                            (pre, item) => pre + (item.count * item.price),
                            0,
                        )} 元`}
                           
                        </span>
                    </Space>
                )}
                tableAlertOptionRender={(selected, selectedRows, onCleanSelected ) => {
                    
                    return (
                        <Space size={16}>
                             <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                                取消
                            </a>
                            <Button type="primary" onClick={async () => {
                                console.log(selected)
                                if (selected) {
                                    await handlePayOrder(selected.selectedRows);
                                    setSelectedRows([]);
                                    actionRef.current?.reloadAndRest?.();
                                }
                            }}>付款</Button>
                            
                        </Space>
                    );
                }}
            />
        </div>
    );
};

export default OrderList;