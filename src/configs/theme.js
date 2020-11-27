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
    primary: '#092954', // darker accent color
    secondary: '#508FF0', //lighter color // 002855
    accent: '#003066', //almost same as primary
    error: '#ea344e',
    info: '#2196F3',
    success: '#06d6a0',
    warning: '#ffd166'
  }
}
