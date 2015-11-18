/**
 * Custom Grunt Tasks.
 */

module.exports = function(grunt) {

  // Requirements.
  var absorb = require('absorb');

  /**
   * Clean out and clone fresh the git repos.
   */
  grunt.registerTask(
    "clone-repos",
    "Get a fresh copy of the git repositories used by this tool",
    ["clean:gitrepos", "gitclone:deployer", "gitclone:linkyclicky"]
  );


  /**
   * Clone the linky-clicky repo.
   */
  grunt.registerTask(
    "clone-linky-clicky",
    "Get a fresh copy of the linky-clicky behat repository",
    ["clean:linkyclicky", "gitclone:linkyclicky"]
  );


  /**
   * Clone the deployer repo.
   */
  grunt.registerTask(
    'clone-deployer',
    "Get a fresh copy of the stanford-jumpstart-deployer repository",
    ["clean:deployer", "gitclone:deployer"]
  );


  /**
   * Pull the latest branch from the deployer.
   */
  grunt.registerTask(
    'pull-deployer',
    "Pull the latest deployer branch",
    ["shell:deployercheckout"]
  );


  /**
   * Build and install a Drupal website.
   */
  grunt.registerTask('build-make-install', 'Build and install a Drupal site.', function() {
    grunt.task.run("config-gather");
    grunt.task.run("prompt-build-install");
    grunt.task.run("config-alter-build-install");
    grunt.task.run("build-make");
    grunt.task.run("drush:install");
    grunt.task.run("finish-installation");
  });


  /**
   * Drush make task
   */
  grunt.registerTask('build-make',
    "Drush make a site file structure.",
    [
      "shell:deployercheckout",
      "chmod:cleanbuild",
      "force:clean:build",
      "drush:deploy",
      "build-make-environment",
      "notify:buildmake"
    ]
  );


  /**
   * Drush make environment
   */
  grunt.registerTask('build-make-environment', "Deploy (drush make) environment specific resources.", function() {


    // Check for existance of environment file.
    var buildType = grunt.config("build.type");
    var buildEnvironment = grunt.config("build.environment");
    var path = grunt.template.process("stanford-jumpstart-deployer/make/<%= build.type %>/<%= build.environment %>.make", {data:{build:{type:buildType,environment:buildEnvironment}}});
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
   * Build and install a Drupal website.
   */
  grunt.registerTask('finish-installation', 'Finish up with some helper functions.', function() {

    var env = grunt.config("build.environment");

    // If the environment is local lets set the admin username and pass.
    if (env == "local") {
      grunt.task.run("drush:adminadmin");
      grunt.task.run("drush:loginuli");
    }

  });


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


  /**
   * Alter config after it has been gathered and prompted for.
   */
  grunt.registerTask("config-alter-build-install", "Adjust the prompted settings for the build-install", function() {
    var product = grunt.config("build.product");
    var product_name = product.replace("-", "_");
    grunt.config("build.product_name", "stanford_sites_" + product_name);
  });


  /**
   * Sort out what configuration we have and prompt for the rest.
   */
  grunt.registerTask("prompt-build-install", "Sort out what configuration we have and prompt for the rest", function() {

    // Load up util.
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
      // Set something.
      grunt.config("build." + keys[i], combined.build[keys[i]]);
      // Prompt if nothing.
      if (typeof combined.build[keys[i]] == "undefined") {
        grunt.task.run("prompt:" + keys[i]);
      }
    }
  });

};
