/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,title 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
      {
        name: 'register',
        path: '/user/register',
        component: './User/Register',
      },
    ],
  },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
      {
        name: '用户列表',
        icon: 'user',
        path: '/admin/userlist',
        component: './User/UserList',
      },
      {
        name: '商品类别',
        icon: 'table',
        path: '/admin/goodtype',
        component: './Good/Type',
      },
      {
        name: '商品列表',
        icon: 'shop',
        path: '/admin/goodlist',
        component: './Good/List',
      },
    ],
  },
  {
    name: '商品分类',
    icon: 'shop',
    path: '/good',
    routes: [
      {
        path: '/good/shop',
        name: '全部系列',
        component: './Good/Shop',
      },
      {
        path: '/good/shop/1',
        name: '经典法式',
        component: './Good/Shop',
      },
      {
        path: '/good/shop/2',
        name: '精品慕斯',
        component: './Good/Shop',
      },
      {
        path: '/good/shop/3',
        name: '奶油戚风',
        component: './Good/Shop',
      },
      {
        path: '/good/shop/4',
        name: '情人系列',
        component: './Good/Shop',
      },
      {
        path: '/good/shop/4',
        name: '情人系列',
        component: './Good/Shop',
      },
      {
        path: '/good/shop/5',
        name: '儿童系列',
        component: './Good/Shop',
      },
      {
        path: '/good/shop/6',
        name: '女神系列',
        component: './Good/Shop',
      },
      {
        path: '/good/shop/7',
        name: '男士系列',
        component: './Good/Shop',
      },
      {
        path: '/good/shop/8',
        name: '长辈系列',
        component: './Good/Shop',
      },
      {
        path: '/good/shop/9',
        name: '高级定制',
        component: './Good/Shop',
      },
    ],
  },
  {
    name: '热销',
    icon: 'shop',
    path: '/good/hot',
    component: './Good/Shop',
  },
  {
    name: '新品',
    icon: 'shop',
    path: '/good/new',
    component: './Good/Shop',
  },
  {
    path: '/good/detail',
    component: './Good/Detail',
  },
  {
    // name: '购物车',
    // icon: 'shoppingcar',
    path: '/shoppingcar',
    component: './Good/Car',
  },
  {
    name: '订单',
    icon: 'shopping',
    path: '/order',
    component: './Order/List',
  },
  {
    path: '/',
    redirect: '/good/hot',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
