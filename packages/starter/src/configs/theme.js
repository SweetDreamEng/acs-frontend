export default {
  // global theme for the app
  globalTheme: 'light', // light | dark

  // side menu theme, use global theme or custom
  menuTheme: 'global', // global | light | dark

  // toolbar theme, use global theme or custom
  toolbarTheme: 'global', // global | light | dark

  // show toolbar detached from top
  isToolbarDetached: false,

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
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },

  //AEC Dark Blue - 002855
  //AEC Light Blue- 009add
  //AEC Dark grey - 292929

  // light theme colors
  //light: {
  //  background: '#ffffff',
  //  surface: '#f2f5f8', //background on screen behind chart
  //  primary: '#0096c7', // darker accent color
  //  secondary: '#a0b9c8', //lighter color
  //  accent: '#048ba8', //almost same as primary
  //  error: '#ef476f',
  //  info: '#2196F3',
  //  success: '#06d6a0',
  //  warning: '#ffd166'
  //}
  light: {
    background: '#ffffff',
    surface: '#f2f5f8', //background on screen behind chart
    primary: '009add', // darker accent color
    secondary: '#002855', //lighter color
    accent: '#003066', //almost same as primary
    error: '#ef476f',
    info: '#2196F3',
    success: '#06d6a0',
    warning: '#ffd166'
  }
}
