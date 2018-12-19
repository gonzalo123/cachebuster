'use strict';

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

module.exports = function(grunt) {
  var name = 'cacheBuster';
  var info = 'generates Cache buster files';

  var cacheBuster = function() {
    var config = grunt.config.get(name);
    var data, t, src, dest, dir, prop;

    data = grunt.file.readJSON(config.src + '/sap-ui-cachebuster-info.json');
    for (prop in data) {
      if (data.hasOwnProperty(prop)) {
        t = data[prop];
        src = config.src + '/' + prop;
        dest = config.src + '/~' + t + '~/' + prop;
        grunt.verbose.writeln(
            name + ': ' + chalk.cyan(path.basename(src)) + ' to ' +
            chalk.cyan(dest) + '.');
        dir = path.dirname(dest);
        grunt.file.mkdir(dir);
        fs.copyFileSync(src, dest);
      }
    }
  };

  grunt.registerMultiTask(name, info, cacheBuster);
};
