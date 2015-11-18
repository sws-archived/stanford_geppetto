#[Stanford Geppetto](https://github.com/SU-SWS/stanford_geppetto)
##### Version: 7.0.0

[sherakama](https://github.com/sherakama)

A grunt task runner for building SWS Drupal sites and other misc tasks.

Installation
---

Install Node.js.

`brew install node`

For more information:
* https://nodejs.org/en/
* http://blog.teamtreehouse.com/install-node-js-npm-mac

Install Grunt CLI

`npm install -g grunt-cli`

Clone this repository somewhere. You can choose. It really doesn't matter.

`git clone git@github.com:SU-SWS/stanford_geppetto.git`

Open up your terminal (shell) and navigate to this directory.

`cd stanford_geppetto`

Download the dependencies with npm.

`npm install`

Copy _example.configure.json_ to configure.json

`cp example.configure.json configure.json`

Open up and edit `configure.json` with your configuration otions:

```
Psuedo Code for configure.json

{
  "build": {
    "webserver_root": "/path/to/your/webserver/", // eg: /Applications/MAMP/htdocs/
    "environment": "local", // Can be local, anchorage, sites, or mamp
    "dbtype": "mysql", // Probably always this unless you use pgsql
    "dbwhere": "127.0.0.1", // The location of the database
    "dbuser": "root", // (optional) If omitted scripts will prompt for this.
    "dbpass": "root", // (optional) If omitted scripts will prompt for this
    "branch": "7.x-4.x" // The stanford-jumpstart-deployer branch/tag/hash to build from
  }
}

```

Commands
---

`grunt build`

### options

* `--buildType`
** local, sites, or anchorage



Configuration
---

Nothing special needed.

Troubleshooting
---

If you are experiencing issues with this module try reverting the feature first. If you are still experiencing issues try posting an issue on the GitHub issues page.

Contribution / Collaboration
---

You are welcome to contribute functionality, bug fixes, or documentation to this module. If you would like to suggest a fix or new functionality you may add a new issue to the GitHub issue queue or you may fork this repository and submit a pull request. For more help please see [GitHub's article on fork, branch, and pull requests](https://help.github.com/articles/using-pull-requests)

TODO
---

* Run behat tests with suites on deploy
* Environment logic
* Refactor in to a more maintainable format
* Drush site alias integration
* Remote build and sync (sites?)
* Environment software location config (php, drush, behat, etc)
* Clone from remote (sites and anchorage)
