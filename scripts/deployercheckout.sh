# This script is responsible for pulling and syncing up the git repo
# with the make files. Passed in variable can be a specific branch or tag.
SCRIPTPATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPOPATH=$SCRIPTPATH"/../stanford-jumpstart-deployer"
GITREMOTE="git@github.com:SU-SWS/stanford-jumpstart-deployer.git"
GITREMOTENAME="origin"
GITBRANCH="7.x-4.x"
GITCHECKOUT=$GITREMOTENAME"/"$GITBRANCH

if [ ! -z "$1" ]; then
  GITBRANCH=$1
fi

if [ ! -d $REPOPATH ]; then
  git clone $GITREMOTE $REPOPATH
fi

cd $REPOPATH
git fetch $GITREMOTENAME
git fetch $GITREMOTENAME --tags
git checkout $GITCHECKOUT
