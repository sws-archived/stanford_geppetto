/**
 * Copy File
 */
module.exports = {
  drushaliases: {
    src: "resources/sites.aliases.drushrc.php",
    dest: process.env.HOME + "/.drush/sites.aliases.drushrc.php",
    options: {
      process: function(content, srcpath) {
        var grunt = require('grunt');
        var sunetid = grunt.config("sites.sunetid");
        return content.replace(/\[sunetid\]/gm, sunetid);
      }
    }
  }
};
