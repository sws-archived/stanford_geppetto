/**
 * Custom Grunt Tasks.
 */

module.exports = function(grunt) {

  // Requirements.
  var absorb = require('absorb');


  /**
   * Build and install a Drupal website.
   */
  grunt.registerTask('build-install', 'Build and install a Drupal site.', function() {
    grunt.task.run("gather-config");
    grunt.task.run("drush-makey");

    // grunt.task.run("drush-install");
  });

  grunt.registerTask("echo-stuff", "echo stuff", function() {
    console.log(grunt.config("build.product"));
  });

  /**
   * Get defaults and figure out what we still need to propt for.
   * @param  {[type]}   [description]
   * @return {[type]}   [description]
   */
  grunt.registerTask("gather-config", "Load configure.json and prompt for the rest", function() {

    // The first place we gather config is the config file.
    var defaults = grunt.file.readJSON('configure.json');
    grunt.config("defaults", defaults);

    // Next we gather from passed in options. These are of one order more
    // importance than the configure.json file.
    var options = getCLIOptions(grunt);
    grunt.config("cliopts", options);

    // Store these for later.
    var keys = Object.keys(options.build);

    // Clean out null values and merge the two together.
    deleteNullProperties(options, true);
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

/**
 * [getRequiredPromptSettings description]
 * @param  {[type]} grunt [description]
 * @return {[type]}       [description]
 */
function getCLIOptions(grunt) {
  return {
    "build": {
      "product":        grunt.option("buildProduct"),
      "type":           grunt.option("buildType"),
      "environment":    grunt.option("buildEnvironment"),
      "dest":           grunt.option("directory"),
      "branch":         grunt.option("gitCheckout"),
      "webserver_root": grunt.option("webserverRoot"),
      "dbtype":         grunt.option("dbType"),
      "dbwhere":        grunt.option("dbWhere"),
      "dbuser":         grunt.option("dbUser"),
      "dbpass":         grunt.option("dbPass"),
      "dbname":         grunt.option("dbName")
    }
  };
}

/**
 * Delete all null (or undefined) properties from an object.
 * Set 'recurse' to true if you also want to delete properties in nested objects.
 */
function deleteNullProperties(test, recurse) {
  for (var i in test) {
    if (test[i] === null || typeof test[i] === "undefined") {
      delete test[i];
    }
    else if (recurse && typeof test[i] === 'object') {
      test[i] = deleteNullProperties(test[i], recurse);
    }
  }
  return test;
}
