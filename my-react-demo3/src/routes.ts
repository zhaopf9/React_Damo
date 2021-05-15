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
                  {
                    path: '/404',
                    component: '@/pages/404',
                    name: '404',
                    key: '404',
                  },
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
                  { 
                    path: '/appManager', 
                    component: '@/pages/appManager/index' ,
                    
                  },
                  {
                    path: '/500',
                    component: '@/pages/500',
                    name: '500',
                    key: '500',
                  },
             ]

    },
]
export default routes;
