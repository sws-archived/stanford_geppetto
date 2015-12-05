#[Stanford Geppetto](https://github.com/SU-SWS/stanford_geppetto)
##### Version: 7.0.0

[sherakama](https://github.com/sherakama)

A grunt task runner for building SWS Drupal sites and other misc tasks.

Installation
----

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
Psuedo Code for configure.json. Do not use this as real configuration.

{
  "system" (optional): 
	# This whole section is optional and only required if your $PATH settings are not set. If you are
	using MAMP, AMPSS, or some other boxed system you may need to specify these. Otherwise it is 
	recommended that you do not include this section.
	
    "php":   	"/path/to/php",
    # The path to the php executable that the tasks will run.
    	
    "mysql": 	"/path/to/mysql",
    # The path to the mysql executable that the tasks will run.
    
    "behat": 	"/path/to/behat",
    # The path to the behat executable that the tasks will run.
    
    "drush":	"/path/to/drush"
	 # The path to the drush executable that the tasks will run.
  },
  "build": {
  	# This section is entirely optional as well. Anything that is omitted will be prompted for
  	or expected to be passed in on the command line as an option. If a setting is included
  	in this section no prompt will be presented to the user for this option. These 
  	configuration options can be overridden by options passed in on the command line.
  
    "webserver_root": 	"/Applications/MAMP/htdocs/",
    # the root path to your webserver. This must be an absolute path WITH the trailing slash.
    
    "environment": 		"local",
    # What type of environment you are building to. eg: local, sites, anchorage. This variable
    changes how, and what gets installed on your build site. For example, local builds come
    with debugging modules. Site builds come with webauth modules and configuration.
    
    "dbtype": 			"mysql",
    # The database type. Currently only supports mysql and pgsql.
    
    "dbwhere": 			"localhost",
    # The location of the database server. Most likely localhost.
    
    "dbuser": 			"root",
    # The user to connect to the database with. Omit if you want to be prompted for this each time.
    
    "dbpass": 			"root",
    # The user's password to connect to the database with. 
    Omit if you want to be prompted for this each time.
    
    "branch": 			"7.x-5.x"
    # For the Stanford Jumpstart Deployer (https://github.com/SU-SWS/stanford-jumpstart-deployer) 
    This can be a branch or a tag. Omit to be prompted for the option each time.
    
  },
  "sites": {
  	# This section is for interactions with the Stanford Sites environment. This section is 
  	completely optional but it is good practice to include it.
  
    "sunetid": "sheamck"
    # The sunetid you connect to sites.stanford.edu with. 
    
  }
}



```

Commands
----


####`build:install` 
Install a Drupal site installation profile. An equivalent function to `drush si`.

Options avilable:

```
--build-product  
--build-type  
--build-environment
--build-directory
--build-git-branch
--build-webserver-root
--build-database-type
--build-database-host
--build-database-user
--build-database-pass
--build-database-name
```

####`build:make`
Deploy Drupal site files. 

####`build:make:install`
Build and install a Drupal site. 

####`build:upgrade`
Update a Drupal sites files and run updates. 

####`local:drush-aliases`
Generate a drush alias file for your environment. 

####`clone:linky-clicky`
Get a fresh copy of the linky-clicky behat repository.

####`clone:repos`
Get a fresh copy of the git repositories used by this tool.

####`pull:deployer`
Pull the latest deployer branch.

####`sites:clone`
Get a copy of a site from sites. 

####`sites:drush-aliases`
Generate a drush alias file for the sites environment. 

####`shell:check-system-env`
Check system environment variables.


Options
----

```

system-drush
	The path to your systems drush executable. eg: /usr/local/bin/drush

system-mysql
	The path to your systems mysql executable. eg: /usr/local/bin/mysql

system-php
	The path to your systems php executable. eg: /usr/local/bin/php

system-behat
	The path to your systems behat executable. eg: /usr/local/bin/behat

build-product  
  	Which product are you installing. 
  	Options are: jumpstart, jumpstart-plus, jumpstart-academic, jumpstart-vpsa, jumpstart-engineering

build-environment
	What environment are you building to? Environment specifics define which modules are included
	in the drush make build and which configuration options are run during site installation.
	Options are: local, sites, anchorage

build-directory
	The Drupal root folder name. The directory that will contain the Drupal website build. 
	For example: If you want to build a site to /var/www/mysitename the build-directory
	option would be mysitename

build-webserver-root
	The absolute path to your webserver root. Please include trailing slash.
	For example if you want to buld a site to /var/www/mysitename the build-webserver-root option
	would be /var/www/

build-database-type
	The relational database type. eg: mysql or pgsql.

build-database-host
	The location of the database server. Most often localhost.
	eg: localhost, 127.0.0.1, mysql-user.stanford.edu

build-database-user
	The username used to connect to the database. This user should have the ability to create
	databases on the server if you are going to be using it to build and make.

build-database-pass
	The password for the database user. 

build-database-name
	The name of the database the task will use. If building and installing a new Drupal website
	and the database does not exist this will be the name of the new database.

build-git-branch
	The specific git branch or tag to set the Stanford Jumpstart Deployer to use when building
	a Drupal website. This must be version 7.x-5.x or greater. 

sites-drush-alias
	The drush alias of the Stanford Sites server environment instance you are working with.
	eg: @sse.sws-build-jsv. This alias must be defined in your ~/.drush directory.

sites-sunetid
	The sunet id used to connect to Stanford Sites servers. Used in ssh and drush commands.
	
```


Troubleshooting
----

If you are experiencing issues with this module try reverting the feature first. If you are still experiencing issues try posting an issue on the GitHub issues page.

Contribution / Collaboration
----

You are welcome to contribute functionality, bug fixes, or documentation to this module. If you would like to suggest a fix or new functionality you may add a new issue to the GitHub issue queue or you may fork this repository and submit a pull request. For more help please see [GitHub's article on fork, branch, and pull requests](https://help.github.com/articles/using-pull-requests)

TODO
----

* Run behat tests with suites on deploy (probably too complicated to do in this project. Needs integration with other projects.)
* Drush site alias integration: Generate sites.aliases.drushrc.php for all the sites stuff.
* Remote build and sync (sites?)
* Clone from remote (sites and anchorage)
* Systems check: Check to see all software and values (mysql/php/apache) are enough to run Drupal.
