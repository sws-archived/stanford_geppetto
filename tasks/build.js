/**
 * Build / Make drush related tasks.
 */
module.exports = function(grunt) {

  /**
   * Drush make task
   */
  grunt.registerTask('build:make:build',
    "Drush make a site file structure.",
    [
      "shell:deployercheckout",
      "chmod:cleanbuild",
      "force:clean:build",
      "drush:deploy",
      "build:make:environment",
      "notify:buildmake"
    ]
  );

  /**
   * Drush make environment
   */
  grunt.registerTask('build:make:environment', "Deploy (drush make) environment specific resources.", function() {

    // Check for existance of environment file.
    var buildType = grunt.config("build.type");
    var buildEnvironment = grunt.config("build.environment");
    var path = grunt.template.process("stanford-jumpstart-deployer/<%= build.type %>/environment/<%= build.environment %>.make", {data:{build:{type:buildType,environment:buildEnvironment}}});
    var isFile = grunt.file.exists(path);

    // If no file let the user know and carry on.
    if (isFile === false) {
      grunt.log.error("WARNING: No environment drush make file found in build-make-environment task.");
      grunt.log.error("Envrionment path not found: " + path);
      return;
    }

    // Build the file!
    grunt.task.run("drush:environment");
    grunt.task.run("force:notify:buildenvironment");

  });


  /**
   * Alter config after it has been gathered and prompted for.
   */
  grunt.registerTask("config:alter-build-install", "Adjust the prompted settings for the build:install", function() {

    var product = grunt.config("build.product");
    var product_name = product.replace("-", "_");

    // For Jumpstart Products only.
    if (product_name.search("jumpstart")) {
      grunt.config("build.product_name", "stanford_sites_" + product_name);
    }
    else {
       grunt.config("build.product_name", "stanford_" + product_name);
    }

  });


  /**
   * Sort out what configuration we have and prompt for just building .make files and no installation.
   */
  grunt.registerTask("prompt-build", "Sort out what configuration we have and prompt for the rest.", function() {

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
    var keys = Object.keys(options.build);

    // Clean out null values and merge the two together.
    helpers.deleteNullProperties(options, true);
    var combined = {
      "build": absorb(options.build, defaults.build, true, true)
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
   * Sort out what configuration we have and prompt for the rest.
   */
  grunt.registerTask("prompt-build-install", "Sort out what configuration we have and prompt for the rest", function() {

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
    var keys = Object.keys(options.buildinstall);

    // Clean out null values and merge the two together.
    helpers.deleteNullProperties(options, true);
    var combined = {
      "build": absorb(options.buildinstall, defaults.build, true, true)
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

  /**
   * Set the base url in settings.php
   * Assuming everything is in sites/default for now.
   * @todo, work with multiple sites folders.
   */
  grunt.registerTask("build:settings:baseurl", "Set the base url in settings.php", function() {

    var base = grunt.option("baseurl");

    // Allow mods.
    grunt.task.run("force:chmod:settingsphp");

    var rreplace = require("replace");
    var settings_path = grunt.config("build.webserver_root") + grunt.config("build.dest") + "/sites/default/settings.php";

    // First clear out any defined options.
    rreplace({
      regex: "\\\$base_url \= \'https\:\/\/.*",
      replacement: "",
      paths: [settings_path]
    });

    if (typeof base !== "string") {
      grunt.log.debug("WARNING: No base url provided. settings.php left alone.");
      return;
    }

    // Then take over the base path one.
    rreplace({
      regex: "\# \\\$base_url \= \'http\:\/\/www\.example\.com\'\;",
      replacement: "$base_url = '" + base + "';",
      paths: [settings_path]
    });

  });

};
