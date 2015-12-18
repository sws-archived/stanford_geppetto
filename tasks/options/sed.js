/**
 * Sed find and replace.
 */
module.exports = {
  "remove-conf-profile": {
    path: "<%= build.webserver_root %><%= build.dest %>/sites/default/settings.php",
    pattern: "\\$conf\\[\\'install_profile\\'\\].*",
    replacement: ""
  }
};
