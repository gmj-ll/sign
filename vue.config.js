module.exports = {
  publicPath: "/dist",
  configureWebpack: {
    performance: {
      hints: false
    }
  }
};


// module.exports = {
//   devServer: {
//     proxy: {
//       '/socket.io': {
//         target: 'http://139.196.85.119:3000/',
//         ws: true,
//         changeOrigin: true
//       },
//       'sockjs-node': {
//         target: 'http://139.196.85.119:3000',
//         ws: false,
//         changeOrigin: true
//       },
//     }

//   }
// }