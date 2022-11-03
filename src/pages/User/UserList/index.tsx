import { addRule} from '@/services/cookie-shop-admin/api';
import { listUser, removeUser, updateUser } from '@/services/cookie-shop-admin/user';

import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  EditableProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, Input, message,Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/updateUser';
import UpdateUser from './components/updateUser';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
async function handleAdd(fields: API.UserListItem) {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
}

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

const UserList: React.FC = () => {
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
  const [currentRow, setCurrentRow] = useState<API.UserListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserListItem[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<API.UserListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.UserListItem>[] = [
    {
      title: "用户名",
      dataIndex: 'username',
      tip: 'The rule name is the unique key',
      readonly: true,
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
    },
    {
      title: "真实姓名",
      dataIndex: 'name',
    },
    {
      title: "电话",
      dataIndex: 'phone',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,
      dataIndex: 'isvalidate',
      hideInForm: true,
      valueEnum: {
        1: {
          text: "有效",
          status: 'Processing',
        },
        0: {
          text: "无效",
          status: 'Error',
        },
      },
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
      <EditableProTable<API.UserListItem, API.PageParams>
        rowKey="id"
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={listUser}
        columns={columns}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            const success = await handleUpdate(data);
            if (success) {
              setCurrentRow(undefined);
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

export default UserList;