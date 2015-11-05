module.exports = function(grunt) {

  // Requires...
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-prompt');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-git-deploy');


  // Config.
  grunt.initConfig({
    availabletasks: {
      tasks: {}
    },
    // -------------------------------------------------------------------------
    prompt: {
      all: {
        options: {
          questions: [
            {
              config: 'build.product',
              type: 'list', // list, checkbox, confirm, input, password
              message: "Which product would you like to install?",
              default: 'JSA',
              choices: getProductTypesArray()
            },
            {
              config: 'build.type',
              type: 'list',
              message: "What type of build do you want?",
              default: 'dev',
              choices: getBuildTypes()
            },
            {
              config: 'build.environment',
              type: 'list',
              message: "What environment are you building on?",
              default: 'local',
              choices: getEnvironmentTypes()
            },
            {
              config: 'build.dest',
              type: 'input',
              message: "Where do you want to build?",
              default: getDefaultBuildPlaces(grunt.config("build.environment"))
            }
          ]
        }
      }
    },
    // ------------------------------------------------------------------------.
    notify: {
      alldone: {
        options: {
          title: 'Build complete',
          message: 'Your build of JSV at place has finished'
        }
      }
    },
    // ------------------------------------------------------------------------.
    gitclone: {
      deployer: {
        options: {
          repository: "git@github.com:SU-SWS/stanford-jumpstart-deployer.git",
          branch: "7.x-4.x",
          directory: "stanford-jumpstart-deployer"
        }
      }
    },
    // ------------------------------------------------------------------------.
    shell: {
      options: {
        stderr: false
      },
      sayhello: {
        command: "echo 'hello'"
      },
      deployercheckout: {
        command: "sh scripts/deployercheckout.sh"
      }

    }
  });

  // Task(s).
  grunt.registerTask('default', ['availabletasks']);
  grunt.registerTask('build', ['prompt:all', "gitpull:deployer", "notify"]);
  grunt.registerTask('clone-deployer', ["gitclone:deployer"]);
  grunt.registerTask('pull-deployer', ["gitcheckout:deployer"]);
  // grunt.registerTask('build-jsv', ['prompt:products']);
  // grunt.registerTask('build-jsa', ['prompt:products']);
  // grunt.registerTask('build-jsv-prod', ['prompt:products']);
  // grunt.registerTask('build-jsa-prod', ['prompt:products']);

};


// FUNCTIONS
// ----------------------------------------------------------------------------.


/**
 * They types of products that are available.
 * @param  {[type]} answers [description]
 * @return {[type]}         [description]
 */
function getProductTypesArray() {
  return [
    'JSV',
    'JSA',
    'JSPlus',
    'JSE',
    'JSVPSA',
    'Pinocchio'
  ];
}

/**
 * The type of build to build.
 * @param  {[type]} answers [description]
 * @return {[type]}         [description]
 */
function getBuildTypes() {
  return [
    'dev',
    'prod'
  ];
}

/**
 * The environment that is being built on so we can make decisions later.
 * @param  {[type]} answers [description]
 * @return {[type]}         [description]
 */
function getEnvironmentTypes() {
  return [
    'local',
    'sites',
    'anchorage'
  ];
}

/**
 * Return the default build places
 * @param  {[type]} grunt [description]
 * @return {[type]}       [description]
 */
function getDefaultBuildPlaces(environment) {
  var places = {
    'local': '/httpdocs/jsvmake.su.dev',
    'sites': '/var/www/ds_',
    'anchorage': '/var/www'
  };
  return places.environment;
}
