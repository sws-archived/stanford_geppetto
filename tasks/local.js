/**
 * Stanford sites related grunt tasks.
 */
module.exports = function(grunt) {

  /**
   * Sort out what configuration we have and prompt for the rest.
   */
  grunt.registerTask("prompt-local-drush-aliases", "Sort out what configuration we have and prompt for the rest.", function() {

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
    var keys = Object.keys(options.sites);

    // Clean out null values and merge the two together.
    helpers.deleteNullProperties(options, true);
    var combined = {
      "build": absorb(options.build, defaults.build, true, true)
    };

    // Only need the webserver_root for this one.
    if (typeof combined.build["webserver_root"] == "undefined") {
      grunt.task.run("prompt:webserver_root");
    }

  });

  /**
   * Validate the local environment before running  tasks is usefull so that you
   * don't make the user wait several minutes before something goes kaboom.
   *
   */
  grunt.registerTask("validate-local-environment", "Run some tests to ensure the local environment is ready to have tasks performed on it.", function () {

    // Check connection to database is available and either the database exists
    // or user has permissions to create one.

    // @Todo: Don't assume mysql...
    grunt.task.run("shell:create-mysql-database");

    // Check that local directory exists and/or is writable.
    var fullpath = grunt.config("build.webserver_root") + grunt.config("build.dest");
    if (grunt.file.isDir(fullpath)) {
      grunt.task.run("chmod:build_dest");
    }
    // If the directory does not exist, check to see that the root directory is writable.
    else {
      grunt.task.run("chmod:webserver_root");
    }

    // Check that /tmp can be written to.
    //


  });

};
