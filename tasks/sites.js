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
   * Sort out what configuration we have and prompt for the rest.
   */
  grunt.registerTask("prompt-local-to-sites", "Sort out what configuration we have and prompt for the rest.", function() {

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
    var keys = Object.keys(options.sync);

    // Clean out null values and merge the two together.
    helpers.deleteNullProperties(options, true);
    var combined = {
      "sync": absorb(options.sync, defaults.sync, true, true)
    };

    if (defaults.sites) {
      if (defaults.sites['sunetid'] && typeof combined.sync['sunetid'] == "undefined") {
        combined.sync['sunetid'] = defaults.sites['sunetid'];
        grunt.config("sync.sunetid", defaults.sites['sunetid']);
      }
    }

    // Prompt for anything we dont have.
    for (var i in keys) {
      // Prompt if nothing.
      if (typeof combined.sync[keys[i]] == "undefined") {
        grunt.task.run("prompt:" + keys[i]);
      }
    }

  });

  /**
   * Grab the drush ard file from the server.
   */
  grunt.registerTask("sites:scp:arr", "get file", function() {

    grunt.log.subhead("Downloading site archive file.");
    var msg = setInterval(function(){ grunt.log.writeln("Download in progress..."); }, 3000);
    // This proces may take some time.
    var done = this.async();

    var scp = require("scp");
    scp.get({
      file: '/afs/ir/group/webservices/backups/' + process.env.USER + '-copy.tar.gz',
      user: '<%= sites.sunetid %>',
      host: 'sites2.stanford.edu',
      path: '<%= sites.webserver_root %>' + process.env.USER + '-copy.tar.gz'
    },
    function (err, stdout, stderr) {
      if (err !== null) {
        grunt.log.error("Failed downloading site archive.");
        grunt.log.error(err);
        clearInterval(msg);
        done(false);
      }
      else {
        clearInterval(msg);
        done();
      }
    });

  });

  /**
   * Push the drush ard file to the server.
   */
  grunt.registerTask("sites:scp:ard", "put file", function() {

    grunt.log.subhead("Uploading site archive. Please be patient this could take a few mintues.");
    var msg = setInterval(function(){ grunt.log.writeln("Upload in progress..."); }, 3000);

    // This proces may take some time.
    var done = this.async();

    var sunet = grunt.config("sites.sunetid");
    var fp = process.env.TMPDIR + "sites-deploy.tar.gz";

    if (! grunt.file.exists(fp)) {
      grunt.log.error("Cannot upload an archive file that does not exist.");
      clearInterval(msg);
      done(false);
      return;
    }

    var scp = require("scp");
    scp.send({
      file: fp,
      user: sunet,
      host: 'sites2.stanford.edu',
      path: '/afs/ir/group/webservices/backups/' + sunet + '-sync.tar.gz'
    }, function (err, stdout, stderr) {
      if (err !== null) {
        grunt.log.error("Failed uploading site archive.");
        grunt.log.error(err);
        clearInterval(msg);
        done(false);
      }
      else {
        clearInterval(msg);
        done();
      }
    });

  });

/**
   * Validate the sites environment before running  tasks is usefull so that you
   * don't make the user wait several minutes before something goes kaboom.
   *
   */
  grunt.registerTask("validate-sites-environment", "Run some tests to ensure the sites environment is ready to have tasks performed on it.", function () {

    // Check for alias files
    // Check for connection to sites2.stanford.edu
    // Check for sunet id
    //

  });

};
