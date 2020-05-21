module.exports = {
    chainWebpack: config => {
      config
        .plugin('html')
        .tap(args => {
          args[0].title = '企业办公设备管理系统';
          return args;
        })
    },
     // 以下是pwa配置
     pwa: {
      iconPaths: {
        favicon32     : 'faviconfs.png',
        favicon16     : 'faviconfs.png',
        appleTouchIcon: 'faviconfs.png',
        maskIcon      : 'faviconfs.png',
        msTileImage   : 'faviconfs.png'
      }
    }
  }