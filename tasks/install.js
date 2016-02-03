/**
 * Drupal Installation related custom grunt tasks.
 */
module.exports = function(grunt) {


  /**
   * Sort out what configuration we have and prompt for the rest.
   */
  grunt.registerTask("prompt-drush-install", "Sort out what configuration we have and prompt for the rest", function() {

    // Load up util.
    // Requirements.
    var absorb = require('absorb');
    var help = require("./util/helpers");
    var helpers = new help(grunt);

    // Get the stored defualts from the configure.json file.
    var defaults = grunt.config("defaults");

    // Get the stored cli opts.
    var options = grunt.config("cliopts");

    // Store these for later.
    var keys = Object.keys(options.install);

    // Clean out null values and merge the two together.
    helpers.deleteNullProperties(options, true);
    var combined = {
      "build": absorb(options.install, defaults.build, true, true)
    };

    // Prompt for anything we dont have.
    for (var i in keys) {
      // Prompt if nothing.
      if (typeof combined.build[keys[i]] == "undefined") {
        grunt.task.run("prompt:" + keys[i]);
      }
    }

  });


  /**
   * After an installation has completed.
   */
  grunt.registerTask('finish-installation', 'Finish up with some helper functions.', function() {

    var env = grunt.config("build.environment");

    // If the environment is local lets set the admin username and pass.
    if (env == "local") {
      grunt.task.run("drush:adminadmin");
    }

    // Always run this.
    grunt.task.run("drush:loginuli");

  });

};
