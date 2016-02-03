/**
 * Custom Git related Grunt tasks.
 */

module.exports = function(grunt) {

  // Requirements.
  var absorb = require('absorb');

  /**
   * Clean out and clone fresh the git repos.
   */
  grunt.registerTask(
    "clone:repos",
    "Get a fresh copy of the git repositories used by this tool",
    ["clean:gitrepos", "gitclone:deployer", "gitclone:linkyclicky", "gitclone:behat3"]
  );


  /**
   * Clone the linky-clicky repo.
   */
  grunt.registerTask(
    "clone:linky-clicky",
    "Get a fresh copy of the linky-clicky behat repository",
    ["clean:linkyclicky", "gitclone:linkyclicky"]
  );


  /**
   * Clone the deployer repo.
   */
  grunt.registerTask(
    'clone:deployer',
    "Get a fresh copy of the stanford-jumpstart-deployer repository",
    ["clean:deployer", "gitclone:deployer"]
  );


  /**
   * Clone the deployer repo.
   */
  grunt.registerTask(
    'clone:drushpatched',
    "Get a fresh copy of the drush repo from sherakama",
    ["clean:drushpatched", "gitclone:drushpatched"]
  );

  /**
   * Pull the latest branch from the deployer.
   */
  grunt.registerTask(
    'pull:deployer',
    "Pull the latest deployer branch",
    ["shell:deployercheckout"]
  );

};
