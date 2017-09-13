'use strict';

var config = require('./config.webgme'),
    validateConfig = require('webgme/config/validator');

// Add/overwrite any additional settings here
// config.server.port = 8080;
// config.mongo.uri = 'mongodb://127.0.0.1:27017/webgme_my_app';

// User Registration
config.authentication.enable = true
config.authentication.allowGuests = true
config.authentication.allowUserRegistration = true
config.authentication.guestAccount = 'guest'

// Seeds
config.seedProjects.enable = true;
config.seedProjects.defaultProject = 'CloudCAMP';
config.seedProjects.basePaths.push("./src/seeds");

// Add/overwrite any additional settings here
config.server.port = 8888;
// config.mongo.uri = 'mongodb://127.0.0.1:27017/webgme_my_app';
config.authentication.allowUserRegistration = true
config.authentication.enable = true
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

// RequireJS paths
config.requirejsPaths.cloudcamp = "./src/common/"

validateConfig(config);
module.exports = config;
