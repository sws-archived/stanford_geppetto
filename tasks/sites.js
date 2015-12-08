/**
 * Stanford sites related grunt tasks.
 */
module.exports = function(grunt) {

  /**
   * Sort out what configuration we have and prompt for the rest.
   */
  grunt.registerTask("prompt-sites-clone", "Sort out what configuration we have and prompt for the rest.", function() {

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
      "sites": absorb(options.sites, defaults.sites, true, true)
    };

    // Steal some settings from build...
    if (typeof combined.sites["webserver_root"] == "undefined") {
      if (typeof defaults.build.webserver_root !== "undefined") {
        combined.sites["webserver_root"] = defaults.build.webserver_root;
        grunt.config("sites.webserver_root", defaults.build.webserver_root);
      }
    }

    // Prompt for anything we dont have.
    for (var i in keys) {
      // Prompt if nothing.
      if (typeof combined.sites[keys[i]] == "undefined") {
        grunt.task.run("prompt:" + keys[i]);
      }
    }

  });

  /**
   * Sort out what configuration we have and prompt for the rest.
   */
  grunt.registerTask("prompt-sites-drush-aliases", "Sort out what configuration we have and prompt for the rest.", function() {

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
      "sites": absorb(options.sites, defaults.sites, true, true)
    };

    // Only need the sunet id for this one.
    if (typeof combined.sites["sunetid"] == "undefined") {
      grunt.task.run("prompt:sunetid");
    }

  });

  /**
   * Grab the drush ard file from the server.
   */
  grunt.registerTask("sites:scp:arr", "get file", function() {
    scp.get({
      file: '/afs/ir/group/webservices/backups/' + process.env.USER + '-copy.tar.gz',
      user: '<%= sites.sunetid %>',
      host: 'sites1.stanford.edu',
      path: '<%= sites.webserver_root %>' + process.env.USER + '-copy.tar.gz'
    });
  });

};
