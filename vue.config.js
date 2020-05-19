module.exports = {
    chainWebpack: config => {
      config
        .plugin('html')
        .tap(args => {
          args[0].title = '企业办公设备管理系统';
          return args
        })
    }
  }