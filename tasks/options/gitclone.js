/**
 * Git Clone
 */
module.exports = {
  deployer: {
    options: {
      repository: "git@github.com:SU-SWS/stanford-jumpstart-deployer.git",
      branch: "7.x-4.x",
      directory: "stanford-jumpstart-deployer"
    }
  },
  linkyclicky: {
    options: {
      repository: "git@github.com:SU-SWS/linky_clicky.git",
      branch: "behat3",
      directory: "linky_clicky"
    }
  }
};
