import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'Detail/:id',
      component: () => import('@/views/employees/Detail'),
      meta: { title: '员工详情', icon: 'people' },
      hidden: true
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/components/print'),
      meta: { title: '打印', icon: 'people' },
      hidden: true
    }
  ]
}
