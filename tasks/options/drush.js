/**
 * Drush tasks.
 */
module.exports = {
  builditdanno: {
    args: [
      'make',
      "stanford-jumpstart-deployer/make/<%= build.type %>/<%= build.product %>.make",
      "<%= build.webserver_root %><%= build.dest %>",
      "--working-copy",
      "-y",
      "-v",
      "--no-cache",
      "--ignore-checksums",
      "--prepare-install",
      "--concurrency=4"
    ]
  },
  makeitlive: {
    args: [
      'si',
      "<%= build.product_name %>",
      "--root=<%= build.webserver_root %><%= build.dest %>",
      "--db-url=<%= build.dbtype %>://<%= build.dbuser %>:<%= build.dbpass %>@<%= build.dbwhere %>/<%= build.dbname %>",
      "-y"
    ]
  },
  adminadmin: {
    args: [
      'upwd',
      'admin',
      '--password=admin',
      "--root=<%= build.webserver_root %><%= build.dest %>"
    ]
  },
  loginuli: {
    args: [
      'uli',
      "--root=<%= build.webserver_root %><%= build.dest %>"
    ]
  }
};
