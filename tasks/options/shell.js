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
    command: "sh scripts/deployercheckout.sh <%= build.branch %>"
  }
};
