<?php

## LOCAL ##########################################################

// The command you just typed in shell.
$command = $_SERVER['argv'];
// Webserver root.
$local_sites = '[webserver_root]';
// Project folder name.
$project = NULL;

// Look at every argument...
foreach ($command as $arg) {

  // There aren't many cases where there are '.'...
  $test = explode('.', $arg);

  // There is only one case where there is ".dev" as the last item.
  // eg: jsa.dev.
  $last = array_pop($test);

  if ($last == "dev") {
    // Set the project to be whatever the alias was.
    $project = str_replace('@', '', $arg);
    // Remove the .dev tacked on thingymagig.
    $project = str_replace(".dev", "", $project);
  }

}

// Only act if we have something.
if (!is_null($project)) {

  // This will be project.dev.
  $aliases[$project] = array(
    // Where the local Drupal root is at. Something like /var/www/jsv.
    'root' => $local_sites . $project,
    'path-aliases' => array(
      '%dump-dir' => '/tmp',
    )
  );
}
