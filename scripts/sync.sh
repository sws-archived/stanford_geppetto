#!/bin/bash
# This file is tracked in the Geppetto repository but should exist on the
# Stanford Sites environment at /afs/ir/group/webservices/tools/geppetto/sync.sh

SCRIPTPATH=$(dirname "$0")
source $SCRIPTPATH/includes/common.inc

# This script expands an uploaded drush ard file from the stanford_geppetto project and
# then copies over the newer or different modules and themes to the production website
# in a similar fashion to the deployer found in tools/jumpstart-4.0/*.sh
# Then to complete the upgrade/sync, the database is copied over to the production
# website and all caches/registry are cleared.

DEST=/var/www/ds_$SHORTNAME/public_html
FP=/afs/ir/group/webservices/backups/$SUNET-sync.tar.gz
FP2=/afs/ir/group/webservices/backups/$SUNET-sync.tar
SOURCE=/tmp/$SUNET
drush=/afs/ir/group/webservices/dev/drush7/bin/drush
timestamp=$(date +%s)

if [ -z "$SUNET" ]; then
  echo "SUNET WAS NOT PROVIDED";
  exit 0;
fi

if [ -z "$SOURCE" ]; then
  echo "NO SOURCE PROVIDED";
  exit 0;
fi

if [ ! -d $DEST ]; then
 echo "NO DESTINATION FOUND";
 exit 0;
fi

if [ ! -f $FP ]; then
  echo "NO ARCHIVE FOUND";
  exit 0;
fi

if [ -d $SOURCE ]; then
  echo "Clearing out old sync files"
  chmod -Rf 0777 $SOURCE
  rm -R $SOURCE
fi

mkdir $SOURCE
echo "Expanding archive files"

# This is producing errors on some sites for some reason
# tar -zxvf $FP -C $SOURCE

if [ -f $FP2 ]; then
  rm $FP2
fi

# Because of the above errors we two step the process.
gunzip -c $FP > $FP2 &
wait
tar -xvf $FP2 -C $SOURCE &
wait

EXPANDED=$(find $SOURCE -mindepth 1 -maxdepth 1 -type d)
DBDUMP=$(find $SOURCE -name \*.sql -mindepth 1 -maxdepth 1 -type f)

if [ -z "$EXPANDED" ]; then
  echo "COULD NOT FIND EXPANDED DIRECTORY"
  exit 0;
fi

if [ -z "$DBDUMP" ]; then
  echo "COULD NOT FIND DATABASE FILE"
  exit 0;
fi

# At this point a copy of the site we want to have live is in the /tmp directory.
# Start the go live by backing up everything.
echo "Backing up exsiting website"
cd /var/www/ds_$SHORTNAME/public_html
$drush ard
$drush sql-dump > /afs/ir/group/webservices/backups/"$SHORTNAME"-"$timestamp".sql
echo "Database dumped to /afs/ir/group/webservices/backups/$SHORTNAME-$timestamp.sql"

# Ensure there is enough room
$VOLUMEINFO=$(fs lq /afs/ir/dist/drupal/ds_$SHORTNAME)
$VOLUMENAME=`expr "$VOLUMEINFO" : '.*\(drupal\.[a-z0-9|-]*\)'`
remctl lsdb afs quota $VOLUMENAME 2000

# Copy all of the new/update code over.
cd $DEST
# see includes/common.inc for documentation of get_excludes() and get_excludes_directories()

# SITES/ALL FIRST.

if [ -d $EXPANDED'/sites/all/modules/contrib/' ]; then
  EX6=$(get_excludes_directories $DEST'/sites/all/modules/contrib/' $EXPANDED'/sites/all/modules/contrib/');
  rsync rsync -u -r -h --progress $EX6 $EXPANDED'/sites/all/modules/contrib/' $DEST'/sites/default/modules/contrib'
fi

if [ -d $EXPANDED'/sites/all/modules/stanford/' ]; then
  EX7=$(get_excludes_directories $DEST'/sites/all/modules/stanford/' $EXPANDED'/sites/all/modules/stanford/');
  rsync rsync -u -r -h --progress $EX7 $EXPANDED'/sites/all/modules/stanford/' $DEST'/sites/default/modules/stanford'
fi

if [ -d $EXPANDED'/sites/all/modules/custom/' ]; then
  EX8=$(get_excludes_directories $DEST'/sites/all/modules/custom/' $EXPANDED'/sites/all/modules/custom');
  rsync rsync -u -r -h --progress $EX8 $EXPANDED'/sites/all/modules/custom/' $DEST'/sites/default/modules/custom'
fi

if [ -d $EXPANDED'/sites/all/themes/' ]; then
  EX9=$(get_excludes_directories $DEST'/sites/all/themes/' $EXPANDED'/sites/all/themes');
  rsync rsync -u -r -h --progress $EX9 $EXPANDED'/sites/all/themes/' $DEST'/sites/default/themes'
fi

if [ -d $EXPANDED'/sites/all/libraries/' ]; then
  EX10=$(get_excludes_directories $DEST'/sites/all/libraries/' $EXPANDED'/sites/all/libraries/');
  rsync rsync -u -r -h --progress $EX10 $EXPANDED'/sites/all/libraries/' $DEST'/sites/default/libraries'
fi

# DEFAULT SECOND.

if [ -d $EXPANDED'/sites/default/modules/contrib/' ]; then
  EX1=$(get_excludes_directories $DEST'/sites/all/modules/contrib/' $EXPANDED'/sites/default/modules/contrib/')
  rsync rsync -u -r -h --progress $EX1 $EXPANDED'/sites/default/modules/contrib/' $DEST'/sites/default/modules/contrib'
fi

if [ -d $EXPANDED'/sites/default/modules/stanford/' ]; then
  EX2=$(get_excludes_directories $DEST'/sites/all/modules/stanford/' $EXPANDED'/sites/default/modules/stanford/')
  rsync rsync -u -r -h --progress $EX2 $EXPANDED'/sites/default/modules/stanford/' $DEST'/sites/default/modules/stanford'
fi

if [ -d $EXPANDED'/sites/default/themes/' ]; then
  EX3=$(get_excludes_directories $DEST'/sites/all/themes/' $EXPANDED'/sites/default/themes/')
  rsync rsync -u -r -h --progress $EX3 $EXPANDED'/sites/default/themes/' $DEST'/sites/default/themes'
fi

if [ -d $EXPANDED'/sites/default/libraries/' ]; then
  EX4=$(get_excludes_directories $DEST'/sites/all/libraries/' $EXPANDED'/sites/default/libraries/')
  rsync rsync -u -r -h --progress $EX4 $EXPANDED'/sites/default/libraries/' $DEST'/sites/default/libraries'
fi

if [ -d $EXPANDED'/sites/default/modules/custom/' ]; then
  EX5=$(get_excludes_directories $DEST'/sites/all/modules/custom/' $EXPANDED'/sites/default/modules/custom/')
  rsync rsync -u -r -h --progress $EX5 $EXPANDED'/sites/default/modules/custom/' $DEST'/sites/default/modules/custom'
fi

# Copy the files over.
if [ -d $EXPANDED'/sites/all/files' ]; then
  rsync -u -r -h --progress $EXPANDED'/sites/all/files/' $DEST'/sites/default/files'
fi

if [ -d $EXPANDED'/sites/default/files' ]; then
  echo "Copying sites/default/files"
  rsync -u -r -h --progress $EXPANDED'/sites/default/files/' $DEST'/sites/default/files'
fi

# Install the database.
cd $DEST
$drush sql-drop -y

echo "Restoring database"
$drush sqlc < $DBDUMP

echo "Rebuilding registry"
$drush rr
$drush uli
