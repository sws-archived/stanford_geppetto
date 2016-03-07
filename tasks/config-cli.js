/**
 * Custom Config / CLI Grunt Tasks.
 */

module.exports = function(grunt) {

  /**
   * Get defaults from the configure.json file and command line. Store them for
   * later.
   */
  grunt.registerTask("config:gather", "Load configure.json and gather CLI options", function() {

    // Load up util.
    var help = require("./util/helpers");
    var helpers = new help(grunt);

    // Some system related items that should be available.
    var system = {
      "drush": "drush",
      "mysql": "mysql",
      "php": "php"
    };

    var syskeys = Object.keys(system);
    syskeys.forEach(function(key) {
      grunt.config("system." + key, system[key]);
    });

    // The first place we gather config is the config file.
    var defaults = grunt.file.readJSON('configure.json');
    grunt.config("defaults", defaults);

    // Next we gather from passed in options. These are of one order more
    // importance than the configure.json file.
    var options = helpers.getCLIOptions(grunt);
    grunt.config("cliopts", options);

    // Set the defaults first.
    var defaultgroups = Object.keys(defaults);
    defaultgroups.forEach(function(groupname) {
      var keys = Object.keys(defaults[groupname]);
      keys.forEach(function(key) {
        if (typeof defaults[groupname][key] !== "undefined") {
          grunt.config(groupname + "." + key, defaults[groupname][key]);
        }
      });
    });

    // Then set the CLI options.
    var cligroups = Object.keys(options);
    cligroups.forEach(function(groupname) {
      var keys = Object.keys(options[groupname]);
      keys.forEach(function(key) {
        if (typeof options[groupname][key] !== "undefined") {
          grunt.config(groupname + "." + key, options[groupname][key]);
        }
      });
    });

  });

  /**
   * Tweaks the system path for environment specific variables that are passed
   * in or set in configure.json.
   */
  grunt.registerTask("config:sys-path", "Modify the system path for this execution.", function() {
    var system = grunt.config("system");
    var keys = Object.keys(system);

    keys.forEach(function(key){
      var value = system[key];
      var broken = value.split("/");
      if (broken.length > 1) {
        broken.pop();
        value = broken.join("/");
        process.env.PATH = value + ":" + process.env.PATH;
      }
    });

  });

};
