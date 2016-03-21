#[Stanford Geppetto](https://github.com/SU-SWS/stanford_geppetto)
##### Version: 7.0.0

[sherakama](https://github.com/sherakama)

A grunt task runner for building SWS Drupal sites and other tasks.

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
Update
----
To update this package from the root of the directory run:

```
git pull origin 7.0.0
or
git pull origin 8.0.0
then
npm update

```

Commands
----

####`grunt`
Get a list of all of the available functions. If you are going to remember one function remember this one.

####`grunt build:install` 
Install a Drupal site installation profile. An equivalent function to `drush si`.

Options available:

```
--build-product  
--build-environment
--build-directory
--build-webserver-root
--build-database-type
--build-database-host
--build-database-user
--build-database-pass
--build-database-name
--baseurl
--legacy
```

####`grunt build:make`
Deploy Drupal site's files. More or less a fancier `drush make`

Options available:

```
--build-product  
--build-type  
--build-environment
--build-directory
--build-git-branch
--build-webserver-root
--legacy
```

####`grunt build:make:install`
Build and install a Drupal site. 

Options available:

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
--baseurl
--legacy
```

####`grunt build:upgrade`
Update a Drupal sites files and run updates. 

Options available:

```
--features-revert-all
--build-product  
--build-type  
--build-environment
--build-directory
--build-git-branch
--build-webserver-root
--baseurl
--legacy
```

####`grunt build:upgrade:sites`
Update a site that has been cloned from the Stanford sites environment to your local environment. This 
function is slightly different than the `build:upgrade` function in that it has some specific to sites
functionality that allow for a smoother upgrade and re-sync to sites process.

Options available:

```
--features-revert-all
--build-product  
--build-type  
--build-environment
--build-directory
--build-git-branch
--build-webserver-root
--baseurl
--legacy
```

####`grunt local:drush-aliases`
Generate a drush alias file for your environment. This will place a file at 
`~/.drush/local.aliases.drushrc.php`. Once that file is there you may have to do some additional 
configuration to get it to work.

####`grunt sites:clone`
Get a copy of a site from sites. 

Options available:

```
--sites-drush-alias
--sites-sunetid
--build-directory
--build-webserver-root
--build-database-type
--build-database-host
--build-database-user
--build-database-pass
--build-database-name
--baseurl
```

####`grunt sites:sync-up`
Clone a local site up to the sites environment replacing what is currently on the sites environment.

Options available:

```
--local-drush-alias
--sites-drush-alias
--sites-sunetid
```

####`grunt sites:drush-aliases`
Generate a drush alias file for the sites environment. This will generate a file at `~/.drush/sites.aliases.drushrc.php`. Once
this file is in place you will then be able to use Drush aliases to run commands on Stanford Sites websites. eg: drush @sse.ds\_sws-build-jsv and @uat.ds\_sws-build-jsv.

####`grunt shell:check-system-env`
Check system environment variables. Outputs the paths to the environment software that this tool uses. If anything is missing please get your
nearest friendly developer to help.


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
	databases on the server if you are going to be using it to build and make. eg: root

build-database-pass
	The password for the database user. eg: root

build-database-name
	The name of the database the task will use. If building and installing a new Drupal website
	and the database does not exist this will be the name of the new database. eg: jumpstart_su_dev

build-git-branch
	The specific git branch or tag to set the Stanford Jumpstart Deployer to use when building
	a Drupal website. This must be version 7.x-5.x or greater.  eg: 7.x-4.7-dev+6

sites-drush-alias
	The drush alias of the Stanford Sites server environment instance you are working with.
	eg: @sse.sws-build-jsv. This alias must be defined in your ~/.drush directory.

sites-sunetid
	The sunet id used to connect to Stanford Sites servers. Used in ssh and drush commands. eg: sheamck

baseurl
    The base url for the site you are building. eg: http://jumpstart.su.dev. Works with site build
    and site clone.

legacy	
	A boolean value for wether or not the upgrade should use the 4.x drush make file structure. Set
	to true if using anything before Jumpstart 5.x. eg: TRUE

features-revert-all
	A boolean value for wether or not to execute `drush fra -y` after the rest of the 
	processes/updateshave completed. eg: TRUE
	
local-drush-alias
	The full drush alias of the local site which is being used. eg: @jsv.su.dev
	
sites-drush-alias
	The full drush alias of the Stanford Sites website that is being used. eg: @sse.ds_sws-build-jsv
```


Troubleshooting
----

If you are experiencing issues with this module try reverting the feature first. If you are still experiencing issues try posting an issue on the GitHub issues page.

Contribution / Collaboration
----

You are welcome to contribute functionality, bug fixes, or documentation to this module. If you would like to suggest a fix or new functionality you may add a new issue to the GitHub issue queue or you may fork this repository and submit a pull request. For more help please see [GitHub's article on fork, branch, and pull requests](https://help.github.com/articles/using-pull-requests)
