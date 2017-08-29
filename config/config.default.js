'use strict';

var config = require('./config.webgme'),
    validateConfig = require('webgme/config/validator');

// Add/overwrite any additional settings here
// config.server.port = 8080;
// config.mongo.uri = 'mongodb://127.0.0.1:27017/webgme_my_app';

// Add/overwrite any additional settings here
config.server.port = 8888;
// config.mongo.uri = 'mongodb://127.0.0.1:27017/webgme_my_app';
config.authentication.allowUserRegistration = true
//config.authentication.enable = true
config.authentication.allowGuests = true

// Plugins
config.plugin.allowServerExecution = true;
// Custom constraints
config.core.enableCustomConstraints = true;
// WebHooks
config.webhooks.enable = true;
// UI
//config.visualization.layout.default = 'SidebarLayout';
config.executor.enable = true;
config.executor.clearOldDataAtStartUp = true;
config.visualization.svgDirs = ['./icons'];

validateConfig(config);
module.exports = config;
