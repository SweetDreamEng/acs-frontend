export default {
  // main navigation - side menu
  menu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-view-dashboard-outline', key: 'menu.ACSMachines', text: 'ACS Machines', link: '/acs-machines' },
      { icon: 'mdi-swap-horizontal', key: 'Customer Assign', text: 'Customer Assign', link: '/customer-assign' },
      { icon: 'mdi-city', key: 'Companies', text: 'Companies', link: '/customers/list' },
      { icon: 'mdi-account-multiple', key: 'Users', text: 'Users', link: '/acs-admin/users/list' }
    ]
  }],

  customerMenu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-view-dashboard-outline', key: 'menu.dashboard', text: 'Machines', link: '/dashboard/analytics' },
      { icon: 'mdi-account-multiple', key: 'menu.userPages', text: 'User Access', link: '/users/list' },
      { icon: 'mdi-speedometer', key: 'menu.threshold', text: 'Threshold', regex: /^\/threshold/,
        items: [
          { key: 'menu.thresholdList', text: 'Thresholds', link: '/threshold/list' },
          { key: 'menu.thresholdAdd', text: 'Add Threshold', link: '/threshold/add' }
        ]
      },
      { icon: 'mdi-swap-horizontal', key: 'menu.machineMapping', text: 'Machine Mapping', link: '/machine-mapping' },
      { icon: 'mdi-account-multiple', key: 'menu.divisionZonesPage', text: 'Division/Zones', link: '/locations-zones' }
    ]
  }],

  // footer links
  footer: [{
    text: 'Copyright',
    key: 'menu.parent',
    href: 'https://aecinternet.com',
    target: '_blank'
  }]
}
