import { listUser, removeUser, updateUser } from '@/services/cookie-shop-admin/user';
import { listGoodType } from '@/services/cookie-shop-admin/good';

import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  EditableProTable,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { message,Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';


/**
 * @en-US Update node
 * @zh-CN 修改用户信息
 *
 * @param fields
 */
const handleUpdate = async (fields: API.UserListItem) => {
  const hide = message.loading('修改中');
  try {
    await updateUser({
      id: fields.id,
      name: fields.name,
      phone: fields.phone,
      isvalidate: fields.isvalidate,
    });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (row: API.UserListItem) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeUser(row);
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const GoodType: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.GoodTypeItem>[] = [
    {
      title: "id",
      dataIndex: 'id',
      readonly: true,
      hideInSearch: true,
    },
    {
      title: "分类名",
      dataIndex: 'name',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <Popconfirm title="确定删除这条记录吗？" okText="确定" cancelText="取消" 
        onConfirm={ () => { handleRemove(record) }}>
          <a key="delete">
          删除
        </a>
      </Popconfirm>
      ],
    },
  ];

  return (
    <PageContainer>
      <EditableProTable<API.GoodTypeItem, API.PageParams>
        rowKey="id"
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        request={listGoodType}
        columns={columns}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            const success = await handleUpdate(data);
            if (success) {
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          },
          onChange: setEditableRowKeys
        }}
      />
    </PageContainer>
  );
};

export default GoodType;