export default {
  // global theme for the app
  globalTheme: 'light', // light | dark

  // side menu theme, use global theme or custom
  menuTheme: 'global', // global | light | dark

  // toolbar theme, use global theme or custom
  toolbarTheme: 'global', // global | light | dark

  // show toolbar detached from top
  isToolbarDetached: true,

  // wrap pages content with a max-width
  isContentBoxed: false,

  // application is right to left
  isRTL: false,

  // dark theme colors
  dark: {
    background: '#05090c',
    surface: '#111b27',
    primary: '#0096c7',
    secondary: '#829099',
    accent: '#82B1FF',
    error: '#ea344e',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  light: {
    background: '#ffffff',
    surface: '#f2f5f8', //background on screen behind chart
    surface2: '#bac8d2',
    primary: '#092954', // darker accent color
    secondary: '#508FF0', //lighter color // 002855
    accent: '#003066', //almost same as primary
    error: '#ea344e',
    info: '#2196F3',
    success: '#06d6a0',
    warning: '#ffd166',
    // custom colors
    'acs-online': '#06d6a0',
    'acs-offline': '#eeeeee',
    'acs-machine-running': '#00e396',
    'acs-machine-not-running': '#ff4560',
    'acs-system-steady': '#00e396',
    'acs-system-not-stedy': '#ff4560',
    'acs-stable': '#06d6a0',
    'acs-stable-waiting': '#ff4560',
    'acs-unstable': '#ff4560',
    'acs-hopper-disabled': '#eeeeee',
    'acs-hopper-setback': '#008ffb',
    'acs-hopper-autotune': '#feb019',
    'acs-hopper-alarmed': '#ff4560',
    'acs-hopper-enabled': '#00e396',
    'acs-checkin': '#00e396',
    'acs-not-checkin': '#ff4560',
    'acs-plc-link': '#00e396',
    'acs-plc-not-link': '#ff4560'
  }
}
