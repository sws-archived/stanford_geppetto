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
    command: "./scripts/sites-scp-backup.sh <%= sites.sunetid %> <%= process.env.USER %> <%= build.webserver_root %> <%= build.dbuser %> <%= build.dbpass %> <%= build.dbname %> <%= build.dest %>"
  }
};
