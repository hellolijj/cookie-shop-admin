// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function createOrder(body: API.GoodListItem, options?: { [key: string]: any }) {
    return request<API.GoodListItem>('/api/order/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

export async function listOrders(
    params: {},
    options?: { [key: string]: any },
) {
    return request<API.GoodListItem>('/api/v1/orders', {
        method: 'Get',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

export async function payOrder(body: API.GoodListItem, options?: { [key: string]: any }) {
    return request<API.GoodListItem>('/api/order/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

