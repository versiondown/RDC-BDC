// 菜单 侧边栏
export default [
  { path: '/index', title: 'Hola', icon: 'home' },
  {
    title: 'RSS',
    icon: 'folder-o',
    children: [
      {
        title: 'BMS',
        icon: 'folder-o',
        path: '/rss/bms',
      },
    ]
  },
  // {
  //   title: '页面',
  //   icon: 'folder-o',
  //   children: [
  //     { path: '/page1', title: '页面 1' },
  //     { path: '/page2', title: '页面 2' },
  //     { path: '/page3', title: '页面 3' }
  //   ]
  // },
]
