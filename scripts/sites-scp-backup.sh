#!/bin/bash
# Grab the backup from the sites environment
SUNET=$1
USERNAME=$2
WEBSERVERROOT=$3
DBUSER=$4
DBPASS=$5
DBNAME=$6
DBWHERE=$7
DEST=$8
TMPPATH=$9
TMPFILE="$TMPPATH"sites-copy.tar.gz
INSTALLPATH=$WEBSERVERROOT$DEST

# Grab the files
echo "Grabbing tar ball from the sites environment"
/usr/bin/scp $SUNET@sites1.stanford.edu:/afs/ir/group/webservices/backups/$USERNAME-copy.tar.gz $TMPFILE

echo "Restoring site to: " $INSTALLPATH

if [ -d $INSTALLPATH ]; then
  echo "Directory already exists. Cannot restore on to an existing directory."
  exit;
fi

drush arr $TMPFILE --db-url=mysql://$DBUSER:$DBPASS@$DBWHERE/$DBNAME --destination=$INSTALLPATH --debug --db-su=$DBUSER --db-su-pw=$DBPASS
