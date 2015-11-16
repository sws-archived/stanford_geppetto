/**
 * Shell executable tasks.
 */
module.exports = {
  options: {
    stderr: false,
    execOptions: { "maxBuffer": NaN }
  },
  sayhello: {
    command: "echo 'hello'"
  },
  deployercheckout: {
    command: "sh scripts/deployercheckout.sh <%= build.branch %>"
  },
  drushmake: {
    command: "sh scripts/drush-make.sh stanford-jumpstart-deployer/make/<%= build.type %>/<%= build.product %>.make <%= build.webserver_root %><%= build.dest %>"
  }
};
