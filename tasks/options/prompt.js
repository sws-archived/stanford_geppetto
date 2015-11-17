/**
 * Prompt tasks
 *
 */

var help = require("../util/helpers");
var grunt = require("grunt");
var helpers = new help(grunt);

// Config variable is outside of wrapper so it can have dynamic input.
var cf = {
  product: {
    options: {
      questions: [
        {
          config: 'build.product',
          type: 'list', // list, checkbox, confirm, input, password
          message: "Which product would you like to install?",
          default: helpers.getProductTypesDefault(grunt),
          choices: helpers.getProductTypes()
        }
      ]
    }
  },
  type: {
    options: {
      questions: [
        {
          config: 'build.type',
          type: 'list',
          message: "What type of build do you want?",
          default: helpers.getBuildTypesDefault(grunt),
          choices: helpers.getBuildTypes()
        }
      ]
    }
  },
  environment: {
    options: {
      questions: [
        {
          config: 'build.environment',
          type: 'list',
          message: "What environment are you building on?",
          default: helpers.getEnvironmentTypesDefault(grunt),
          choices: helpers.getEnvironmentTypes()
        }
      ]
    }
  },
  dest: {
    options: {
      questions: [
        {
          config: 'build.dest',
          type: 'input',
          message: "What is the site directory name?",
          default: grunt.config("build.dest")
        }
      ]
    }
  },
  branch: {
    options: {
      questions: [
        {
          config: 'build.branch',
          type: 'input',
          message: "What branch do you want to build with?",
          default: "7.x-4.x"
        }
      ]
    }
  },
  webserver_root: {
    options: {
      questions: [
        {
          config: 'build.webserver_root',
          type: 'input',
          message: "What is your webserver root directory?",
          default: "/var/www/"
        }
      ]
    }
  },
  dbuser: {
    options: {
      questions: [
        {
          config: 'build.dbuser',
          type: 'input',
          message: "What is the database user name?",
          default: "root"
        }
      ]
    }
  },
  dbpass: {
    options: {
      questions: [
        {
          config: 'build.dbpass',
          type: 'input',
          message: "What is the database user password?",
          default: "root"
        }
      ]
    }
  },
  dbname: {
    options: {
      questions: [
        {
          config: 'build.dbname',
          type: 'input',
          message: "What is the name of the database you are installing to?",
          default: "jumpstart"
        }
      ]
    }
  }
};

// Pass back the info to grunt...
module.exports = cf;
