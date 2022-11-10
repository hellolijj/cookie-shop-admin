import { useState, useCallback } from 'react'
import { useRequest } from '@umijs/max';
import {getShoppingCar, opShoppingCar } from '../services/cookie-shop-admin/shoppingcar'


export default () => {

  const [count, setCount] = useState(0)

  const { data, error, loading } = useRequest(() => {
    return getShoppingCar()
  });
  
  if (count == 0 && data && data[0]) {
    setCount((pre) => { return data[0].total })
  }
  
  // 增加数量
  const add = useCallback((val) => {
    opShoppingCar({"op": "add", "goodId": val.id, "num": 1})
    setCount((pre) => { return pre + 1 })
  }, [])

  // 减少数量
  const sub = useCallback((val) => {
    opShoppingCar({"op": "sub", "goodId": val.id, "num": 1})
    setCount((pre) => { return pre - 1 })
  }, [])

  return {
    count,
    add,
    sub
  }
}