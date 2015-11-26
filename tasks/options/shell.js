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
  "alias-system-env": {
    command: "./scripts/systemalias.sh <%= system.drush %> <%= system.mysql %> <%= system.php %> <%= system.behat %>"
  }
};
