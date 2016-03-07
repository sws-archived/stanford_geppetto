/**
 * Custom Grunt tasks.
 *
 * These are the meaty functions. The ones that should be called.
 *
 */

module.exports = function(grunt) {

  /**
   * Build and install a Drupal website.
   * ---------------------------------------------------------------------------
   */
  grunt.registerTask('build:make:install', 'Build and install a Drupal site.', function() {
    grunt.task.run("prompt-build-install");
    grunt.task.run("config:alter-build-install");
    grunt.task.run("validate-local-environment");
    grunt.task.run("build:make:build");
    grunt.task.run("build:settings:baseurl");
    grunt.task.run("drush:install");
    grunt.task.run("finish-installation");
  });

  /**
   * Build a Drupal website from drush.
   * ---------------------------------------------------------------------------
   */
  grunt.registerTask('build:make', 'Deploy Drupal site files.', function() {
    grunt.task.run("prompt-build");
    grunt.task.run("config:alter-build-install");
    grunt.task.run("build:make:build");
    grunt.task.run("build:settings:baseurl");
  });

  /**
   * Install a Drupal site from an installation profile.
   * ---------------------------------------------------------------------------
   */
  grunt.registerTask('build:install', 'Install a Drupal site installation profile.', function() {
    grunt.task.run("prompt-drush-install");
    grunt.task.run("config:alter-build-install");
    grunt.task.run("validate-local-environment");
    grunt.task.run("drush:install");
    grunt.task.run("finish-installation");
  });

  /**
   * Upgrade a Drupal installation in place.
   * ---------------------------------------------------------------------------
   */
  grunt.registerTask('build:upgrade', 'Update a Drupal sites files and run updates.', function() {
    grunt.task.run("prompt-build-upgrade");
    grunt.task.run("config:alter-build-install");
    grunt.task.run("shell:deployercheckout");

    // Todo: Remove once using the 5.x branch of everything.
    if (grunt.option("legacy") == true) {
      grunt.task.run("drush:upgrade-legacy");
    }
    else {
      grunt.task.run("drush:upgrade");
    }

    grunt.task.run("drush:updb");

    // If revert is set.
    if (grunt.option("features-revert-all") == true) {
      grunt.task.run("drush:features-revert-all");
    }

  });

  /**
   * Upgrade a Stanford sites site on your local.
   * ---------------------------------------------------------------------------
   */
  grunt.registerTask('build:upgrade:sites', 'Update a Stanford Sites site.', function() {
    grunt.task.run("prompt-build-upgrade");
    grunt.task.run("config:alter-build-install");
    grunt.task.run("shell:deployercheckout");

    // Todo: Remove once using the 5.x branch of everything.
    if (grunt.option("legacy") == true) {
      grunt.task.run("drush:upgrade-legacy-sites");
    }
    else {
      grunt.task.run("drush:upgrade-sites");
    }

    // Let Drupal know about the new stuff by rebuilding registry.
    grunt.task.run("drush:rr");

    // Remove the installation profile variable on settings.php.
    grunt.task.run("sed:remove-conf-profile");

    // Run the updates.
    grunt.task.run("drush:updb");

    // If revert is set.
    if (grunt.option("features-revert-all") == true) {
      grunt.task.run("drush:features-revert-all");
    }

  });

  /**
   * Get a copy of a site from sites.
   * ---------------------------------------------------------------------------
   */
  grunt.registerTask('sites:clone', 'Get a copy of a site from sites.', function() {
    grunt.task.run("prompt-sites-clone");
    grunt.task.run("validate-local-environment");
    grunt.task.run("chmod:cleansitesclone");
    grunt.task.run("clean:sitesclone");
    grunt.task.run("drush:sitesard");
    grunt.task.run("shell:scp-arr-backup");
    grunt.task.run("sed:remove-conf-profile");
    grunt.task.run("build:settings:baseurl");
    grunt.task.run("finish-installation");
  });

  /**
   * Sync a local site to the stanford sites environment.
   * ---------------------------------------------------------------------------
   */
  grunt.registerTask('sites:sync-up', 'Syncronize a local site to the Stanford sites environment.', function() {

    // Prompt for the drush aliases variables.
    grunt.task.run("prompt-local-to-sites");

    // Create a local site archive.
    grunt.task.run("drush:localard");

    // Move the archive to the sites environment.
    grunt.task.run("sites:scp:ard");

    // Unpack the archive somewhere on AFS.
    // Back up the existing site on sites.
    // Sync the files using a non-dupe script.
    // Restore the database with new dump.
    // Clear all caches and registry.

    grunt.task.run("shell:sites-sync-to-sites");

  });


  /**
   * Create the sites drush alias file.
   * ---------------------------------------------------------------------------
   */
  grunt.registerTask('sites:drush-aliases', 'Generate a drush alias file for the sites environment.', function() {
    grunt.task.run("prompt-sites-drush-aliases");
    grunt.task.run("copy:drush_alias_sites");
  });

  /**
   * Create the local drush alias file.
   * ---------------------------------------------------------------------------
   */
  grunt.registerTask('local:drush-aliases', 'Generate a drush alias file for your environment.', function() {
    // Get the needed info.
    grunt.task.run("prompt-local-drush-aliases");
    // Create a local alias file.
    grunt.task.run("copy:drush_alias_local");
  });

};
