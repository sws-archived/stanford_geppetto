/**
 * Shell executable tasks.
 */
module.exports = {
  options: {
    stderr: false,
    execOptions: { "maxBuffer": NaN }
  },
  sayelo: {
    command: "echo 'hello'"
  },
  deployercheckout: {
    command: "./scripts/deployercheckout.sh <%= build.branch %>"
  },
  "check-system-env": {
    command: "./scripts/systemenv.sh"
  },
  "scp-arr-backup": {
    command: "./scripts/sites-scp-backup.sh <%= sites.sunetid %> " + process.env.USER + " <%= build.webserver_root %> <%= build.dbuser %> <%= build.dbpass %> <%= build.dbname %> <%= build.dbwhere %> <%= build.dest %> " + process.env.TMPDIR
  },
  "sites-sync-to-sites": {
    command: "SUNET=<%= sync.sunetid %> SHORTNAME=<%= local.sites_drush_alias %> ./scripts/sites-sync-to-sites.sh"
  },
  "create-mysql-database": {
    command: "mysql -u<%= build.dbuser %> -p<%= build.dbpass %> -e \"CREATE DATABASE IF NOT EXISTS <%= build.dbname %>\""
  }
};
