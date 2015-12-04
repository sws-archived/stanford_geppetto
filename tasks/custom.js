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
  grunt.registerTask('build:make:install', 'Build and install a Drupal site.', function() {
    grunt.task.run("prompt-build-install");
    grunt.task.run("config:alter-build-install");
    grunt.task.run("build:make:build");
    grunt.task.run("drush:install");
    grunt.task.run("finish-installation");
  });

  /**
   * Build a Drupal website from drush.
   */
  grunt.registerTask('build:make', 'Deploy Drupal site files.', function() {
    grunt.task.run("prompt-build");
    grunt.task.run("config:alter-build-install");
    grunt.task.run("build:make:build");
  });

  /**
   * Install a Drupal site from an installation profile.
   */
  grunt.registerTask('build:install', 'Install a Drupal site installation profile.', function() {
    grunt.task.run("prompt-drush-install");
    grunt.task.run("config:alter-build-install");
    grunt.task.run("drush:install");
    grunt.task.run("finish-installation");
  });

  /**
   * Upgrade a Drupal installation in place.
   */
  grunt.registerTask('build:upgrade', 'Update a Drupal sites files and run updates.', function() {
    grunt.task.run("prompt-build-upgrade");
    grunt.task.run("config:alter-build-install");
    grunt.task.run("drush:upgrade");
    grunt.task.run("drush:updb");
  });

  /**
   * Get a copy of a site from sites.
   */
  grunt.registerTask('sites:clone', 'Get a copy of a site from sites.', function() {
    grunt.task.run("prompt-sites-clone");
    grunt.task.run("chmod:cleansitesclone");
    grunt.task.run("clean:sitesclone");
    grunt.task.run("drush:sitesard");
    grunt.task.run("sites:scp:arr");
  });

  /**
   * Create the sites drush alias file.
   */
  grunt.registerTask('sites:drush-aliases', 'Generate a drush alias file for the sites environment.', function() {
    grunt.task.run("prompt-sites-drush-aliases");
    grunt.task.run("copy:drush_alias_sites");
  });

  /**
   * Create the sites drush alias file.
   */
  grunt.registerTask('local:drush-aliases', 'Generate a drush alias file for your environment.', function() {
    grunt.task.run("prompt-local-drush-aliases");
    grunt.task.run("copy:drush_alias_local");
  });

};
