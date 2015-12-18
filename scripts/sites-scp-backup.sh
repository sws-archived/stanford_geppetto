# Grab the backup from the sites environment
SUNET=$1
USERNAME=$2
WEBSERVERROOT=$3
DBUSER=$4
DBPASS=$5
DBWHERE=$6
DBNAME=$7
DEST=$8
INSTALLPATH=$WEBSERVERROOT$DEST

# Grab the files
echo "Grabbing tar ball from the sites environment"
/usr/bin/scp $SUNET@sites1.stanford.edu:/afs/ir/group/webservices/backups/$USERNAME-copy.tar.gz $WEBSERVERROOT/sites-copy.tar.gz

echo "Restoring site from tar ball"
if [ -d $INSTALLPATH ]; then
  echo "Directory already exists. Cannot restore on to an existing directory."
  exit;
fi

drush arr $WEBSERVERROOT/sites-copy.tar.gz --db-url=mysql://$DBUSER:$DBPASS@$DBWHERE/$DBNAME --destination=$INSTALLPATH --debug --db-su=$DBUSER --db-su-pw=$DBPASS

# chmod -Rf 0755 $INSTALLPATH
# chmod -Rf 0777 $INSTALLPATH/sites/default/files
# rm $INSTALLPATH/sites/default/settings.local.php
