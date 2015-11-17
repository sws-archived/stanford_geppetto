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
      { name:'JSV', value: "jumpstart" },
      { name:'JSPlus', value: "jumpstart-plus" },
      { name:'JSA', value: "jumpstart-academic" },
      { name:'JSVPSA', value: "jumpstart-vpsa" },
      { name:'JSE', value: "jumpstart-engineering" },
    ];
  };


  /**
   * [getProductTypesDefault description]
   * @param  {[type]} grunt [description]
   * @return {[type]}       [description]
   */
  this.getProductTypesDefault = function(grunt) {
    var opt = grunt.option('buildProduct');
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
    var opt = grunt.option('buildType');
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
    var opt = grunt.option('buildEnvironment');
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

}

module.exports = Helpers;
