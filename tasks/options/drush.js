/**
 * Drush tasks.
 */
module.exports = {
  deploy: {
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
  upgrade: {
    args: [
      'make',
      "stanford-jumpstart-deployer/make/<%= build.type %>/<%= build.product %>.make",
      "<%= build.webserver_root %><%= build.dest %>",
      "--working-copy",
      "-y",
      "-v",
      "--no-cache",
      "--ignore-checksums",
      "--no-core",
      "--concurrency=4"
    ]
  },
  updb: {
    args: [
      'updb',
      "-y",
      "--root=<%= build.webserver_root %><%= build.dest %>"
    ]
  },
  environment: {
    args: [
      'make',
      "stanford-jumpstart-deployer/make/<%= build.type %>/<%= build.environment %>.make",
      "<%= build.webserver_root %><%= build.dest %>",
      "--working-copy",
      "-y",
      "-v",
      "--no-cache",
      "--ignore-checksums",
      "--no-core",
      "--concurrency=4"
    ]
  },
  install: {
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
