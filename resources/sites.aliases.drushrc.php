<?php

## STANFORD WILDCARD ###########################################################

// The command you just typed in shell.
$command = $_SERVER['argv'];
$remote_user = "[sunetid]";

// Look at every argument...
foreach ($command as $arg){

  // There aren't many cases where there are '.'...
  $test = explode('.',$arg);
  $first = array_shift($test);

  switch($first) {
    case "@sse":
      // Set the project to be whatever the alias was.
      $project_alias = str_replace('@', '', $arg);
      $project_name = "ds_" . array_pop($test);
      $shortname = str_replace("ds_", "", $project_name);
      $uri = "https://sites.stanford.edu/" . $shortname;
      $remote_host = "sites1.stanford.edu";
      break;

    case "@uat":
      // Set the project to be whatever the alias was.
      $project_alias = str_replace('@', '', $arg);
      $project_name = "ds_" . array_pop($test);
      $shortname = str_replace("ds_", "", $project_name);
      $uri = "https://sites-uat.stanford.edu/" . $shortname;
      $remote_host = "sites-uat.stanford.edu";
      break;

    case "@ppl":
      // Set the project to be whatever the alias was.
      $project_alias = str_replace('@', '', $arg);
      $project_name = "dp_" . array_pop($test);
      $shortname = str_replace("dp_", "", $project_name);
      $uri = "https://people.stanford.edu/" . $shortname;
      $remote_host = "people1.stanford.edu";
      break;

  }

}

// Project alias; this will be sse.ds_foo, uat.ds_foo, or ppl.dp_sunetid.
$aliases[$project_alias] = array(
  'remote-host' => $remote_host,
  'remote-user' => $remote_user,
  'root' => '/var/www/' . $project_name . '/public_html',
  'uri' => $uri,
  'path-aliases' => array(
    '%dump-dir' => '/tmp',
    '%drush' => '/afs/ir/group/webservices/dev/drush6',
    '%drush-script' => '/afs/ir/group/webservices/dev/drush6/drush',
  ),
);
