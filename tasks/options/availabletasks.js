/**
 * Available tasks list.
 */
module.exports = {
  availabletasks: {
    options: {
      filter: 'include',
      tasks: [
        'build:make:install',
        'build:install',
        'build:make',
        'build:upgrade',
        'clone:linky-clicky',
        'clone:deployer',
        'clone:drushpatched',
        'clone:repos',
        'pull:deployer',
        'shell',
        'sites:clone',
        'sites:drush-aliases',
        'sites:sync-up',
        'local:drush-aliases',
        'build:upgrade:sites'
      ],
      groups: {
        'Local build and install tasks': [
          'build:make:install',
          'build:install',
          'build:make',
          'build:upgrade',
          'local:drush-aliases'
        ],
        'Git and repository management': [
          'clone:deployer',
          'clone:linky-clicky',
          'clone:drushpatched',
          'clone:repos',
          'pull:deployer',
        ],
        'Stanford Sites tasks': [
          'sites:clone',
          'sites:sync-up',
          'sites:drush-aliases',
          'build:upgrade:sites'
        ]
      }
    }
  }
};
