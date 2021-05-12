import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  //配置路由
  routes: [
    { path: '/', component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/about', component: '@/pages/about/index' },
        { path: '/about1', component: '@/pages/about1/index' },
        { path: '/practice', component: '@/pages/practice/index' ,
        routes:[
          { path: '/test_1', component: '@/pages/practice/Test_1/index' },
          { path: '/test_2', component: '@/pages/practice/Test_2/index' },
        ]
      },
      ]
    },
  ],
});