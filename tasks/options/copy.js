/**
 * Copy File
 */
module.exports = {
  drush_alias_sites: {
    src: "resources/sites.aliases.drushrc.php",
    dest: process.env.HOME + "/.drush/sites.aliases.drushrc.php",
    options: {
      process: function(content, srcpath) {
        var grunt = require('grunt');
        var sunetid = grunt.config("sites.sunetid");
        return content.replace(/\[sunetid\]/gm, sunetid);
      }
    }
  },
  drush_alias_local: {
    src: "resources/local.aliases.drushrc.php",
    dest: process.env.HOME + "/.drush/local.aliases.drushrc.php",
    options: {
      process: function(content, srcpath) {
        var grunt = require('grunt');
        var webserver_root = grunt.config("build.webserver_root");
        return content.replace(/\[webserver_root\]/gm, webserver_root);
      }
    }
  }
};
