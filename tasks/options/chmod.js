/**
 * Change mode config
 */
module.exports = {
  options: {
    mode: '775'
  },
  cleanbuild: {
    // Target-specific file/dir lists and/or options go here.
    src: [
      '<%= build.webserver_root %><%= build.dest %>/**/*settings.php',
      "<%= build.webserver_root %><%= build.dest %>/**/files",
      "<%= build.webserver_root %><%= build.dest %>/**/private",
      "<%= build.webserver_root %><%= build.dest %>/**/default"
    ]
  },
  cleansitesclone: {
    // Target-specific file/dir lists and/or options go here.
    src: [
      '<%= sites.webserver_root %><%= sites.dest %>/**/*settings.php',
      "<%= sites.webserver_root %><%= sites.dest %>/**/files",
      "<%= sites.webserver_root %><%= sites.dest %>/**/private",
      "<%= sites.webserver_root %><%= sites.dest %>/**/default"
    ]
  }
};
