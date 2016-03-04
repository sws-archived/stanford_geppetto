/**
 * Prompt tasks
 *
 */
var grunt = require("grunt");
var help = require("../util/helpers");
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
          default: grunt.config("build.dest"),
          validate: function(value) {
            return (value.length >= 1);
          }
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
          default: "7.x-5.x",
          validate: function(value) {
            return (value.length >= 1);
          }
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
          default: "/var/www/",
          validate: function(value) {
            return (value.length >= 1);
          }
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
          default: "root",
          validate: function(value) {
            return (value.length >= 1);
          }
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
          default: "root",
          validate: function(value) {
            return (value.length >= 1);
          }
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
          default: "jumpstart",
          validate: function(value) {
            var regex = new RegExp(/^([a-zA-Z0-9_]+)$/);
            var valid = regex.test(value);
            if (valid === true) { return true; }
            value = null;
            return "Database names can only contain letters, numbers and underscores (_)";
          }
        }
      ]
    }
  },
  frevert: {
    options: {
      questions: [
        {
          config: 'update.frevert',
          type: 'confirm',
          message: "Would you like to revert all the features?",
        }
      ]
    }
  },
  drush_alias: {
    options: {
      questions: [
        {
          config: 'sites.drush_alias',
          type: 'input',
          message: "What is your drush alias for the site you want to clone? eg: @sse.ds_jumpstart",
          default: "@sse.ds_sws-build-jsv",
          validate: function(value) {
            var regex = new RegExp(/^@[a-z0-9-_.]/i);
            var valid = regex.test(value);
            if (valid === true) { return true; }
            value = null;
            return "please provide a valid alias name staring with @";
          }
        }
      ]
    }
  },
  local_drush_alias: {
    options: {
      questions: [
        {
          config: 'local.local_drush_alias',
          type: 'input',
          message: "What is your drush alias for the site you want to clone FROM? eg: @jumpstart.dev",
          default: "@jumpstart.dev",
          validate: function(value) {
            var regex = new RegExp(/^@[a-z0-9-_.]/i);
            var valid = regex.test(value);
            if (valid === true) { return true; }
            value = null;
            return "please provide a valid alias name staring with @";
          }
        }
      ]
    }
  },
  sites_drush_alias: {
    options: {
      questions: [
        {
          config: 'local.sites_drush_alias',
          type: 'input',
          message: "What is your drush alias for the site you want to clone TO? eg: @sse.ds_jumpstart",
          default: "@sse.ds_sws-build-jsv",
          validate: function(value) {
            var regex = new RegExp(/^@[a-z0-9-_.]/i);
            var valid = regex.test(value);
            if (valid === true) { return true; }
            value = null;
            return "please provide a valid alias name staring with @";
          }
        }
      ]
    }
  },
  sunetid: {
    options: {
      questions: [
        {
          config: 'sites.sunetid',
          type: 'input',
          message: "What is your sunetid",
          validate: function(value) {
            if (value.length <= 0) { return false; }
            var regex = new RegExp(/^[a-z0-9-_.]/i);
            var valid = regex.test(value);
            if (valid === true) { return true; }
            value = null;
            return "please provide a valid sunet id";
          }
        }
      ]
    }
  }
};

// Pass back the info to grunt...
module.exports = cf;
