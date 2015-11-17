/**
 * Notifications
 *
 */
module.exports = {
  alldone: {
    options: {
      title: 'Build complete',
      message: 'Your build of <%= build.product %> at <%= build.dest %> has finished.'
    }
  },
  makemeasandwich: {
    options: {
      title: 'sudo make me a sandwich',
      message: 'Your sandwich has been made.'
    }
  },
};
