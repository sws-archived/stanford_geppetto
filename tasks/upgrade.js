/**
 *
 */
module.exports = function(grunt) {

  /**
   * Sort out what configuration we have and prompt for the rest.
   */
  grunt.registerTask("prompt-build-upgrade", "Sort out what configuration we have and prompt for the rest", function() {

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
    var keys = Object.keys(options.upgrade);

    // Clean out null values and merge the two together.
    helpers.deleteNullProperties(options, true);
    var combined = {
      "build": absorb(options.upgrade, defaults.build, true, true)
    };

    // Prompt for anything we dont have.
    for (var i in keys) {
      // Set something.
      grunt.config("build." + keys[i], combined.build[keys[i]]);
      // Prompt if nothing.
      if (typeof combined.build[keys[i]] == "undefined") {
        grunt.task.run("prompt:" + keys[i]);
      }
    }
  });

};
