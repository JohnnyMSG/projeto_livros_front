const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://projeto-livros-back.onrender.com/',
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': '' }
  }
];

module.exports = PROXY_CONFIG;
