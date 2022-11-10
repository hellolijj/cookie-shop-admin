// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/**  GET /api/shoppingcar */
export async function getShoppingCar(
    params: {},
    options?: { [key: string]: any },
) {
  return request<API.GoodListItem>('/api/v1/shoppingcar', {
    method: 'Get',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** POST /api/shoppingcar/op */

export async function opShoppingCar(body: API.ShoppingCarOpParams, options?: { [key: string]: any }) {
  return request<API.GoodListItem>('/api/shoppingcar/op', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 购物车商品列表 GET /api/shoppingcar/goods */
export async function listShoppingCarGoods(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.GoodList>('/api/shoppingcar/goods', {
    method: 'Get',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
