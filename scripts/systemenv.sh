# Print out the paths that are being used for running tasks.
LNAMES=(PHP MYSQL DRUSH BEHAT COMPOSER GIT)
LANGS=($(which php) $(which mysql) $(which drush) $(which behat) $(which composer) $(which git))
LVERSION=("$(php --version)" "$(mysql --version)" "$(drush version)" "$(behat --version)" "$(composer --version)" "$(git --version)")
j=0
for i in ${LNAMES[@]}; do
  SPATH=${LANGS[$j]}
  if [[ -z "$SPATH" ]]; then
    SPATH="Missing"
  fi
  echo ${LNAMES[$j]}": "$SPATH
  echo ${LVERSION[$j]}"\n"
  j=$(expr $j + 1)
done

exit 0
