/**
 * Notifications
 *
 */
module.exports = {
  alldone: {
    options: {
      title: 'Full build complete',
      message: 'Your build of <%= build.product %> at <%= build.dest %> has finished.'
    }
  },
  buildmake: {
    options: {
      title: 'Product build complete',
      message: 'Your build of <%= build.product %> at <%= build.dest %> has finished.'
    }
  },
  buildenvironment: {
    options: {
      title: 'Environment build complete',
      message: 'Environment build <%= build.environment %> at <%= build.dest %> has finished.'
    }
  },
  makemeasandwich: {
    options: {
      title: 'Sudo make me a sandwich',
      message: 'Your sandwich has been made.'
    }
  },
};
