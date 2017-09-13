/**
 * Shell executable tasks.
 */
module.exports = {
  options: {
    stderr: false,
    execOptions: { "maxBuffer": 30720000 }
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
  },
  "check-sites1": {
    command: "ssh <%= sites.sunetid %>@sites1.stanford.edu exit"
  },
  "check-sites2": {
    command: "ssh <%= sites.sunetid %>@sites2.stanford.edu exit"
  }
};
