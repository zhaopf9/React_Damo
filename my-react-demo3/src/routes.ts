type Route = {
  /**
   * Any valid URL path
   */
  path?: string,
  /**
   * A React component to render only when the location matches.
   */
  component?: (string | (() => any)),
  wrappers?: string[],
  /**
   * navigate to a new location
   */
  redirect?: string,
  /**
   * When true, the active class/style will only be applied if the location is matched exactly.
   */
  exact?: boolean,
  routes?: Route[],
  title?: string,
  name?: string,
  key?: string
}
const routes: Route[] =[
    { path: '/', 
    component: '@/layouts/index',
      routes: [
                  { path: '/',
                    component: '@/pages/index' 
                  },
                  { 
                    path: '/about', 
                    component: '@/pages/about/index' },
                  { 
                    path: '/about1',
                     component: '@/pages/about1/index'
                  },
                  { 
                    path: '/practice', 
                    component: '@/pages/practice/index' ,
                      routes:[
                        { 
                          path: '/test_1', 
                          component: '@/pages/practice/Test_1/index'
                      },
                        { 
                          path: '/test_2',
                          component: '@/pages/practice/Test_2/index' 
                        },
                      ]
                  },
                  { 
                    path: '/userManager', 
                    component: '@/pages/userManager/index' ,
                  },
             ]
    },
]
// const WEB_NAME = '统一认证系统';
// const routes: Route[] = [
//   {
//     title: `${WEB_NAME}-文件未找到`,
//     path: '/404',
//     component: '@/pages/404',
//     name: '404',
//     key: '404',
//   },
//   {
//     title: `${WEB_NAME}-系统简介`,
//     path: '/about',
//     component: '@/pages/about',
//     name: '关于我们',
//     key: 'about',
//   },
//   {
//     path: '/',
//     component: '@/layouts/index2',
//     wrappers: ['@/pages/pageInterceptor'],
//     routes: [
//       {
//         title: `${WEB_NAME}-首页`,
//         path: '/',
//         component: '@/pages/index',
//         name: '首页',
//         key: 'index',
//       },
//       {
//         title: `${WEB_NAME}-用户管理`,
//         path: '/userManager',
//         component: '@/pages/userManager',
//         name: '用户管理',
//         key: 'userManager',
//       },
//       {
//         title: `${WEB_NAME}-服务器异常`,
//         path: '/500',
//         component: '@/pages/500',
//         name: '500',
//         key: '500',
//       },
//     ],
//   },
// ];
export default routes;
