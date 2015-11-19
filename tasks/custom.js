/**
 * Custom Grunt tasks.
 *
 * These are the meaty functions. The ones that should be called.
 *
 */

module.exports = function(grunt) {

  /**
   * Build and install a Drupal website.
   */
  grunt.registerTask('build-make-install', 'Build and install a Drupal site.', function() {
    grunt.task.run("prompt-build-install");
    grunt.task.run("config-alter-build-install");
    grunt.task.run("build-make-build");
    grunt.task.run("drush:install");
    grunt.task.run("finish-installation");
  });

  /**
   * Build a Drupal website from drush.
   */
  grunt.registerTask('build-make', 'Deploy Drupal site files.', function() {
    grunt.task.run("prompt-build");
    grunt.task.run("config-alter-build-install");
    grunt.task.run("build-make-build");
  });

  /**
   * Install a Drupal site from an installation profile.
   */
  grunt.registerTask('build-install', 'Install a Drupal site installation profile.', function() {
    grunt.task.run("prompt-drush-install");
    grunt.task.run("config-alter-build-install");
    grunt.task.run("drush:install");
    grunt.task.run("finish-installation");
  });

  /**
   * Install a Drupal site from an installation profile.
   */
  grunt.registerTask('build-upgrade', 'Update a Drupal sites files and run updates.', function() {
    grunt.task.run("prompt-build-upgrade");
    grunt.task.run("config-alter-build-install");
    grunt.task.run("drush:upgrade");
    grunt.task.run("drush:updb");
  });

};
