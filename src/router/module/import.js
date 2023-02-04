import Layout from '@/layout'
export default {
  path: '/import',
  name: 'import',
  component: Layout,
  hidden: true,
  children: [
    {
      path: 'import',
      component: () => import('@/views/import/index.vue'),
      meta: { title: '导入' }
    }
  ]
}
