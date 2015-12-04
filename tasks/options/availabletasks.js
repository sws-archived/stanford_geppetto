/**
 * Available tasks list
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
        'clone:repos',
        'pull:deployer',
        'shell',
        'sites:clone',
        'sites:drush-aliases',
        'local:drush-aliases'
      ],
      groups: {
        'Build and install tasks': [
          'build:make:install',
          'build:install',
          'build:make',
          'build:upgrade',
          'local:drush-aliases'
        ],
        'Git and repository management': [
          'clone:deployer',
          'clone:linky-clicky',
          'clone:repos',
          'pull:deployer',
        ],
        'Stanford sites tasks': [
          'sites:clone',
          'sites:drush-aliases'
        ]
      }
    }
  }
};
