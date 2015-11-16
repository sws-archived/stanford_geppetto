module.exports = function(grunt) {

  // Custom Dependencies.
  require('load-grunt-tasks')(grunt);

  // Custom Tasks.
  grunt.task.loadTasks('tasks');

  // Task Registry.
  // ---------------------------------------------------------------------------

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env
  };

  grunt.util._.extend(config, loadConfig('./tasks/options/'));
  grunt.initConfig(config);

  // Default task list.
  grunt.registerTask('default', ['availabletasks']);

  // Some supporting tasks.
  grunt.registerTask('clone-deployer', ["gitclone:deployer"]);
  grunt.registerTask('pull-deployer', ["shell:deployercheckout"]);

};

// FUNCTIONS
// ----------------------------------------------------------------------------.
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
