import menuPages from './menus/pages.menu'

export default {
  // main navigation - side menu
  menu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-view-dashboard-outline', key: 'menu.dashboard', text: 'Machines', link: '/dashboard/analytics' },
      { icon: 'mdi-file-outline', key: 'menu.blank', text: 'Alarms', link: '/blank' },
      { icon: 'mdi-account-multiple', key: 'menu.userPages', text: 'User Access', link: '/users/list' },
      { icon: 'mdi-speedometer', key: 'menu.threshold', text: 'Threshold', regex: /^\/threshold/,
        items: [
          { icon: 'mdi-file-outline', key: 'menu.thresholdList', text: 'Thresholds', link: '/threshold/list' },
          { icon: 'mdi-file-outline', key: 'menu.thresholdAdd', text: 'Add Threshold', link: '/threshold/add' }
        ]
      }
    ]
  }
  // {
  //   text: 'Pages',
  //   key: 'menu.pages',
  //   items: menuPages
  // }
  ],

  // footer links
  footer: [{
    text: 'Copyright',
    key: 'menu.parent',
    href: 'https://aecinternet.com',
    target: '_blank'
  }]
}
