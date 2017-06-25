// jshint node: true
'use strict';

var gmeConfig = require('./config'),
    webgme = require('webgme'),
    path = require('path'),
    fs = require('fs'),
    rm_rf = require('rimraf'),
    gracefulFs = require('graceful-fs'),
    myServer;

process.chdir(__dirname);
webgme.addToRequireJsPaths(gmeConfig);

// Patch the 'fs' module to fix 'too many files open' error
gracefulFs.gracefulify(fs);


myServer = new webgme.standaloneServer(gmeConfig);
myServer.start(function (err) {
    if (err) {
        process.exit(1);
    }

    console.log('Deployment Automation now listening on port', gmeConfig.server.port);
});