// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: 'EPGS',
    icon: 'folder-o',
    children: [
      {
        title: 'ERDS',
        icon: 'folder-o',
        children: [
          { path: '/epgs/erds/ris', title: 'RIS' }
        ]
      },
    ]
  },
  // {
  //   title: '页面',
  //   icon: 'folder-o',
  //   children: [
  //     { path: '/page1', title: '页面 1' },
  //     { path: '/page2', title: '页面 2' },
  //     { path: '/page3', title: '页面 3' },
  //   ]
  // },
]
