export default {
  // main navigation - side menu
  menu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-view-dashboard-outline', text: 'ACS Machines', link: '/acs-machines' },
      { icon: 'mdi-near-me', text: 'Alarms', link: '/acs-machines/alarms' },
      { icon: 'mdi-swap-horizontal', text: 'Customer Assign', link: '/customer-assign' },
      { icon: 'mdi-city', text: 'Companies', link: '/customers/list' },
      { icon: 'mdi-account-multiple', text: 'Users', link: '/acs-admin/users' },
      { icon: 'mdi-file-outline', key: 'menu.utilityHelp', text: 'FAQs / Help', link: '/utility/help' }
    ]
  }],

  superAdminMenu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-view-dashboard-outline', text: 'App Settings', link: '/app-settings/customize-application' },
      { icon: 'mdi-devices', text: 'Configurations', link: '/app-settings/configurations' },
      { icon: 'mdi-file-outline', key: 'menu.utilityHelp', text: 'FAQs / Help', link: '/utility/help' }
    ]
  }],

  acsViewerMenu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-view-dashboard-outline', text: 'ACS Machines', link: '/acs-machines' },
      { icon: 'mdi-city', text: 'Companies', link: '/customers/list' },
      { icon: 'mdi-account-multiple', text: 'Users', link: '/acs-admin/users' },
      { icon: 'mdi-file-outline', key: 'menu.utilityHelp', text: 'FAQs / Help', link: '/utility/help' }
    ]
  }],

  customerMenu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-view-dashboard-outline', text: 'Machines', link: '/dashboard/analytics' },
      { icon: 'mdi-near-me', text: 'Alarms', link: '/customers/alarms' },
      { icon: 'mdi-account-multiple', text: 'User Access', link: '/users' },
      { icon: 'mdi-swap-horizontal', text: 'Machine Mapping', link: '/machine-mapping' },
      { icon: 'mdi-shuffle-variant', text: 'Administration', link: '/locations-zones' },
      { icon: 'mdi-file-outline', key: 'menu.utilityHelp', text: 'FAQs / Help', link: '/utility/help' }
    ]
  }],
  customerOperatorMenu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-view-dashboard-outline', text: 'Machines', link: '/dashboard/analytics' },
      { icon: 'mdi-account-multiple', text: 'User Access', link: '/users' },
      { icon: 'mdi-speedometer', text: 'Threshold', regex: /^\/threshold/,
        items: [
          { text: 'Thresholds', link: '/threshold/list' },
          { text: 'Add Threshold', link: '/threshold/add' }
        ]
      },
      { icon: 'mdi-swap-horizontal', text: 'Machine Mapping', link: '/machine-mapping' },
      { icon: 'mdi-file-outline', key: 'menu.utilityHelp', text: 'FAQs / Help', link: '/utility/help' }
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
