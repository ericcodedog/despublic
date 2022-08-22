// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      icon: 'dashboard',
      routes: [
        {
          path: '/dashboard',
          redirect: '/dashboard/analysis',
        },
        {
          name: 'analysis',
          icon: 'smile',
          path: '/dashboard/analysis',
          component: './dashboard/analysis',
        },
        {
          name: 'eshop',
          icon: 'smile',
          path: '/dashboard/eshop',
          component: './dashboard/eshop',
        },
        {
          name: 'stream',
          icon: 'smile',
          path: '/dashboard/stream',
          component: './dashboard/stream',
        },
        {
          name: 'ads',
          icon: 'smile',
          path: '/dashboard/ads',
          component: './dashboard/ads',
        },
        {
          name: 'overview',
          icon: 'smile',
          path: '/dashboard/overview',
          component: './dashboard/overview',
        },
        {
          name: 'monitor',
          icon: 'smile',
          path: '/dashboard/monitor',
          component: './dashboard/monitor',
        },
        {
          name: 'workplace',
          icon: 'smile',
          path: '/dashboard/workplace',
          component: './dashboard/workplace',
        },
      ],
    },
    {
      path: '/function1',
      icon: 'form',
      name: 'function 1',
      routes: [
        {
          path: '/function1/customer',
          icon: 'smile',
          name: 'customer',//basic-form
          component: './function1/customer',
          routes:[
                {
                  name: 'models',
                  icon: 'smile',
                  path: '/function1/customer/card-list',
                  component: './function1/customer/card-list',
                },
                /*{
                  name: 'work-flow',
                  icon: 'smile',
                  path: '/function1/customer/flow',
                  component: './function1/customer/flow',
                },*/
                {
                  name: 'Data management',
                  icon: 'smile',
                  path: '/function1/customer/table-list',
                  component: './function1/customer/table-list',
                },
                {
                  name: 'RFM',
                  icon: 'smile',
                  path: '/function1/customer/RFM',//
                  component: './function1/customer/RFM',
                  routes:[
                    {
                      name: 'RFMselect',
                      icon: 'smile',
                      path: '/function1/customer/RFM/step-form',
                      component: './function1/customer/RFM/step-form',
                    },
                    {
                      name: 'RFMresult',
                      icon: 'smile',
                      path: '/function1/customer/RFM/RFMresult',
                      component: './function1/customer/RFM/RFMresult',
                    },
                  ]
                },
            /*{
              path: '/function1/customer',
              redirect: '/function1/customer/step-form',
            },
            {
              name: 'RFMselect',
              icon: 'smile',
              path: '/function1/customer/step-form',//
              component: './function1/customer/step-form',
            },
            {
              name: 'RFMresult',
              icon: 'smile',
              path: '/function1/customer/RFMresult',//
              component: './function1/customer/RFMresult',
            },
            {
              name: 'advanced-RFMresult',
              icon: 'smile',
              path: '/function1/customer/table-list',
              component: './function1/customer/table-list',
            },*/
          ]
        },
        {
          path: '/function1/group',
          icon: 'smile',
          name: 'group',//basic-form
          component: './function1/group/table-list',
          routes:[
            
            {
              name: 'Data management',
              icon: 'smile',
              path: '/function1/group/table-list',
              component: './function1/group/table-list',
            },
          ]
        },
        {
          path: '/function1/order',
          name: 'order',//basic-form
          component: './function1/order/table-list',
          routes:[
            {
              name: 'Data management',
              icon: 'smile',
              path: '/function1/order/table-list',
              component: './function1/order/table-list',
            },
          ]
        },
        {
          path: '/function1/product',
          name: 'product',//basic-form
          component: './function1/product/SKU',
          routes:[
            {
              name: 'SKU',
              icon: 'smile',
              path: '/function1/product/SKU',
              component: './function1/product/SKU',
            },
            {
              name: 'SPU',
              icon: 'smile',
              path: '/function1/product/SPU',
              component: './function1/product/SPU',
            },
          ]
        },
      ],
    },
    {
      path: '/function2',
      icon: 'form',
      name: 'function 2',
      routes: [
        {
          path: '/function2/campaign',
          name: 'campaign',//basic-form
          component: './function2/campaign',
          routes:[
            {
              name: 'table',
              icon: 'smile',
              path: '/function2/campaign/table-list',
              component: './function2/campaign/table-list',
            },
            {
              name: 'card',
              icon: 'smile',
              path: '/function2/campaign/card-list',
              component: './function2/campaign/card-list',
            },
          ]
        },
        {
          path: '/function2/advertisement',
          name: 'advertisement',//basic-form
          component: './function2/advertisement',
          routes:[
            {
              name: 'table',
              icon: 'smile',
              path: '/function2/advertisement/table-list',
              component: './function2/advertisement/table-list',
            },
            {
              name: 'card',
              icon: 'smile',
              path: '/function2/advertisement/card-list',
              component: './function2/advertisement/card-list',
            },
          ]
        },
      ],
    },
    /*{
      path: '/list',
      icon: 'table',
      name: 'Customer Profile',
      routes: [
        {
          path: '/list/search',
          name: 'segment',
          component: './list/search',
          routes: [
            {
              path: '/list/search',
              redirect: '/list/search/articles',
            },
            {
              name: 'articles',
              icon: 'smile',
              path: '/list/search/articles',
              component: './list/search/articles',
            },
            {
              name: 'projects',
              icon: 'smile',
              path: '/list/search/projects',
              component: './list/search/projects',
            },
            {
              name: 'applications',
              icon: 'smile',
              path: '/list/search/applications',
              component: './list/search/applications',
            },
          ],
        },
        {
          path: '/list',
          redirect: '/list/table-list',
        },
        {
          name: 'models',
          icon: 'smile',
          path: '/list/card-list',
          component: './list/card-list',
        },
        {
          name: 'work-flow',
          icon: 'smile',
          path: '/list/flow',
          component: './list/flow',
        },
        {
          name: 'Data management',
          icon: 'smile',
          path: '/list/table-list',
          component: './list/table-list',
        },
      ],
    },*/
    /*{
      path: '/profile',
      name: 'profile',
      icon: 'profile',
      routes: [
        {
          path: '/profile',
          redirect: '/profile/basic',
        },
        {
          name: 'basic',
          icon: 'smile',
          path: '/profile/basic',
          component: './profile/basic',
        },
        {
          name: 'advanced',
          icon: 'smile',
          path: '/profile/advanced',
          component: './profile/advanced',
        },
      ],
    },*/
    /*{
      name: 'result',
      icon: 'CheckCircleOutlined',
      path: '/result',
      routes: [
        {
          path: '/result',
          redirect: '/result/success',
        },
        {
          name: 'success',
          icon: 'smile',
          path: '/result/success',
          component: './result/success',
        },
        {
          name: 'fail',
          icon: 'smile',
          path: '/result/fail',
          component: './result/fail',
        },
      ],
    },*/
    /*{
      name: 'exception',
      icon: 'warning',
      path: '/exception',
      routes: [
        {
          path: '/exception',
          redirect: '/exception/403',
        },
        {
          name: '403',
          icon: 'smile',
          path: '/exception/403',
          component: './exception/403',
        },
        {
          name: '404',
          icon: 'smile',
          path: '/exception/404',
          component: './exception/404',
        },
        {
          name: '500',
          icon: 'smile',
          path: '/exception/500',
          component: './exception/500',
        },
      ],
    },*/
    {
      name: 'system function',
      icon: 'user',
      path: '/system-function',
      routes: [
        {
          name: 'account',
          icon: 'smile',
          path: '/system-function/account',
          component: './system-function/account',
          routes:[
            /*{
              path: '/system-function/account',
              redirect: '/system-function/account/center',
            },*/
            {
              name: 'center',
              icon: 'smile',
              path: '/system-function/account/center',
              component: './system-function/account/center',
            },
            {
              name: 'settings',
              icon: 'smile',
              path: '/system-function/account/settings',
              component: './system-function/account/settings',
            },
          ]
        },
        {
          name: 'team',
          icon: 'smile',
          path: '/system-function/team',
          component: './system-function/team',
          routes:[
            {
              name: 'center',
              icon: 'smile',
              path: '/system-function/team/center',
              component: './system-function/team/center',
            },
            {
              name: 'settings',
              icon: 'smile',
              path: '/system-function/team/settings',
              component: './system-function/team/settings',
            },
          ]
        },
      ],
    },
    /*{
      name: 'account',
      icon: 'user',
      path: '/account',
      routes: [
        {
          path: '/account',
          redirect: '/account/center',
        },
        {
          name: 'center',
          icon: 'smile',
          path: '/account/center',
          component: './account/center',
        },
        {
          name: 'settings',
          icon: 'smile',
          path: '/account/settings',
          component: './account/settings',
        },
      ],
    },*/
    /*{
      name: 'editor',
      icon: 'highlight',
      path: '/editor',
      routes: [
        {
          path: '/editor',
          redirect: '/editor/flow',
        },
        {
          name: 'flow',
          icon: 'smile',
          path: '/editor/flow',
          component: './editor/flow',
        },
        {
          name: 'mind',
          icon: 'smile',
          path: '/editor/mind',
          component: './editor/mind',
        },
        {
          name: 'koni',
          icon: 'smile',
          path: '/editor/koni',
          component: './editor/koni',
        },
      ],
    },*/
    {
      path: '/',
      redirect: '/dashboard/analysis',
    },
    {
      component: '404',
    },
  ],
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
