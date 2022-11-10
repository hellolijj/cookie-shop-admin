// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取商品分类列表 GET /api/types */
export async function listGoodType(
    params: {
      // query
      /** 当前的页码 */
      current?: number;
      /** 页面的容量 */
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    return request<API.GoodTypeList>('/api/v1/type', {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    });
  }


/**更新用户信息 PUT /api/user */
export async function updateUser(body: API.GoodTypeItem, options?: { [key: string]: any }) {
    if (body == undefined || body.id == undefined) {
        return
    }
    return request<API.GoodTypeList >('/api/v1/type/'+body.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** 删除规则 DELETE /api/user */
export async function removeUser(body: API.UserListItem, options?: { [key: string]: any }) {
  if (!body.id) {
    return
  }
  return request<Record<string, any>>('/api/user/'+body.id, {
    method: 'DELETE',
    ...(options || {}),
  });
}
  
  

/** 获取用户列表 GET /api/good */
export async function listGood(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.GoodList>('/api/v1/good', {
    method: 'Get',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


