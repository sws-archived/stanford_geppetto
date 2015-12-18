/**
 *
 * Helper or utility functions.
 *
 *
 */
function Helpers(grunt) {

  /**
   * They types of products that are available.
   * @param  {[type]} answers [description]
   * @return {[type]}         [description]
   */
  this.getProductTypes = function() {
    return [
      { name:'JSV',     value: "jumpstart" },
      { name:'JSPlus',  value: "jumpstart-plus" },
      { name:'JSA',     value: "jumpstart-academic" },
      { name:'JSVPSA',  value: "jumpstart-vpsa" },
      { name:'JSE',     value: "jumpstart-engineering" },
    ];
  };


  /**
   * [getProductTypesDefault description]
   * @param  {[type]} grunt [description]
   * @return {[type]}       [description]
   */
  this.getProductTypesDefault = function(grunt) {
    var opt = grunt.option('build-product');
    if (typeof opt !== undefined || opt.length >= 1) {
      return opt;
    }
    return "jumpstart";
  };


  /**
   * The type of build to build.
   * @param  {[type]} answers [description]
   * @return {[type]}         [description]
   */
  this.getBuildTypes = function() {
    return [
      'development',
      'production'
    ];
  };


  /**
   * [getBuildTypesDefault description]
   * @param  {[type]} grunt [description]
   * @return {[type]}       [description]
   */
  this.getBuildTypesDefault = function(grunt) {
    var opt = grunt.option('build-type');
    if (typeof opt !== undefined || opt.length < 1) {
      return opt;
    }
    return "development";
  };


  /**
   * The environment that is being built on so we can make decisions later.
   * @param  {[type]} answers [description]
   * @return {[type]}         [description]
   */
  this.getEnvironmentTypes = function() {
    return [
      'local',
      'sites',
      'anchorage',
      'mamp',
    ];
  };


  /**
   * [getEnvironmentTypeDefault description]
   * @param  {[type]} grunt [description]
   * @return {[type]}       [description]
   */
  this.getEnvironmentTypesDefault = function(grunt) {
    var opt = grunt.option('build-environment');
    if (typeof opt !== undefined || opt.length >= 1) {
      return opt;
    }
    return "local";
  };


  /**
   * [getDBNameFromDestination description]
   * @param  {[type]} dest [description]
   * @return {[type]}      [description]
   */
  this.getDBNameFromDestination = function(dest) {
    var parts = dest.split("/");
    var last = parts.pop();
    var clean = last.replace(/([^a-z0-9]+)/gi, '_');
    return clean;
  };


  /**
   * A single function to get all of the possible command line parameters
   * needed for the custom tasks.
   *
   * CLI options are grouped by a key so they can be used to generate prompts.
   */
  this.getCLIOptions = function(grunt) {
    return {
      "system": {
        "drush":          grunt.option("system-drush"),
        "mysql":          grunt.option("system-mysql"),
        "php":            grunt.option("system-php"),
        "behat":          grunt.option("system-behat")
      },
      "buildinstall": {
        "product":        grunt.option("build-product"),
        "type":           grunt.option("build-type"),
        "environment":    grunt.option("build-environment"),
        "dest":           grunt.option("build-directory"),
        "branch":         grunt.option("build-git-branch"),
        "webserver_root": grunt.option("build-webserver-root"),
        "dbtype":         grunt.option("build-database-type"),
        "dbwhere":        grunt.option("build-database-host"),
        "dbuser":         grunt.option("build-database-user"),
        "dbpass":         grunt.option("build-database-pass"),
        "dbname":         grunt.option("build-database-name")
      },
      "build": {
        "product":        grunt.option("build-product"),
        "type":           grunt.option("build-type"),
        "environment":    grunt.option("build-environment"),
        "dest":           grunt.option("build-directory"),
        "branch":         grunt.option("build-git-branch"),
        "webserver_root": grunt.option("build-webserver-root"),
      },
      "install": {
        "product":        grunt.option("build-product"),
        "environment":    grunt.option("build-environment"),
        "dest":           grunt.option("build-directory"),
        "webserver_root": grunt.option("build-webserver-root"),
        "dbtype":         grunt.option("build-database-type"),
        "dbwhere":        grunt.option("build-database-host"),
        "dbuser":         grunt.option("build-database-user"),
        "dbpass":         grunt.option("build-database-pass"),
        "dbname":         grunt.option("build-database-name")
      },
      "upgrade": {
        "product":        grunt.option("build-product"),
        "type":           grunt.option("build-type"),
        "dest":           grunt.option("build-directory"),
        "webserver_root": grunt.option("build-webserver-root")
      },
      "sites": {
        "drush_alias":    grunt.option("sites-drush-alias"),
        "sunetid":        grunt.option("sites-sunetid"),
        "dest":           grunt.option("build-directory"),
        "dbname":         grunt.option("build-database-name"),
        "webserver_root": grunt.option("build-webserver-root")
      },
      "local": {
        "local_drush_alias": grunt.option("local-drush-alias"),
        "sites_drush_alias": grunt.option("sites-drush-alias")
      }
    };
  };

  /**
   * Delete all null (or undefined) properties from an object.
   * Set 'recurse' to true if you also want to delete properties in nested objects.
   */
  this.deleteNullProperties = function(test, recurse) {
    for (var i in test) {
      if (test[i] === null || typeof test[i] === "undefined") {
        delete test[i];
      }
      else if (recurse && typeof test[i] === 'object') {
        test[i] = this.deleteNullProperties(test[i], recurse);
      }
    }
    return test;
  };

}

// Send away!
module.exports = Helpers;
