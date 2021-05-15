import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  define: {
    'process.env.envType': 'dev',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  base: '/',
  publicPath: '/',
  inlineLimit: 10,
  history: { type: 'hash', options: { hashType: 'hashbang' } },
  routes,
  fastRefresh: {},
  proxy: {
    '/service': {
      target: 'http://127.0.0.1:9877/',
      changeOrigin: true,
      pathRewrite: { '^/service': '' },
    },
  },
});
