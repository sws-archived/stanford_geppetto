/**
 * Custom Config / CLI Grunt Tasks.
 */

module.exports = function(grunt) {

  /**
   * Get defaults from the configure.json file and command line. Store them for
   * later.
   */
  grunt.registerTask("config-gather", "Load configure.json and gather CLI options", function() {

    // Load up util.
    var help = require("./util/helpers");
    var helpers = new help(grunt);

    // The first place we gather config is the config file.
    var defaults = grunt.file.readJSON('configure.json');
    grunt.config("defaults", defaults);

    // Next we gather from passed in options. These are of one order more
    // importance than the configure.json file.
    var options = helpers.getCLIOptions(grunt);
    grunt.config("cliopts", options);

  });

};
