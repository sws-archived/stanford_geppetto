# Build command with flags.
drush make $1 $2 --working-copy -v --no-cache --ignore-checksums --prepare-install --concurrency=4
