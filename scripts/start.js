'use strict';
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { choosePort, createCompiler, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');
const createDevServerConfig = require('../config/webpackDevServer.config');

const useYarn = fs.existsSync(paths.yarnLockFile);

const PROTOCOL = 'http';
const DEFAULT_PORT = 3000;
const HOST = '0.0.0.0';


choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port == null) {
      throw new Error('Port is null');
    }
    
    const appName = require(paths.packageJson).name;
    const urls = prepareUrls(PROTOCOL, HOST, port);
    const compiler = createCompiler(webpack, config, appName, urls, useYarn);
   
    const serverConfig = createDevServerConfig(
      urls.lanUrlForConfig
    );
    
    const devServer = new WebpackDevServer(compiler, serverConfig);
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      console.log(chalk.cyan('Starting the development server...\n'));
      openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
