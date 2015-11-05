SCRIPTPATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPOPATH=$SCRIPTPATH"/../stanford-jumpstart-deployer"
GITREMOTE="git@github.com:SU-SWS/stanford-jumpstart-deployer.git"
GITBRANCH="7.x-4.x"

if [ ! -d $REPOPATH ]; then
  git clone $GITREMOTE $REPOPATH
fi

cd $REPOPATH
git fetch origin
git checkout $GITBRANCH
