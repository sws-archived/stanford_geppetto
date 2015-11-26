module.exports = function(grunt) {

  // Custom Dependencies.
  require('load-grunt-tasks')(grunt);

  // Measures the time each task takes.
  require('time-grunt')(grunt);

  // Custom Tasks.
  grunt.task.loadTasks('tasks');

  // Task Registry.
  // --------------------------------------------------------------------------.

  // Tee up the package info.
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env
  };

  // Combine all the task options.
  grunt.util._.extend(config, loadConfig('./tasks/options/'));
  grunt.initConfig(config);

  // Always gather the config.
  grunt.task.run("config-gather");
  // And set any environment aliases.
  grunt.task.run("shell:alias-system-env");

  // Default task.
  grunt.registerTask('default', ['availabletasks']);

  // All other tasks should be registered in their own tasks. Please do not
  // register tasks here.

};


// ----------------------------------------------------------------------------.
// Helper Functions
// ----------------------------------------------------------------------------.

/**
 * Require each of your configuration files and concatenate them into a
 * single object.
 */
function loadConfig(path) {
  var glob = require('glob');
  var object = {};
  var key;

  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    object[key] = require(path + option);
  });

  return object;
}
