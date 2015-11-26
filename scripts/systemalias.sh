#Set working shell aliases for running these tasks.

# Drush
if [[ ! -z $1 ]] && [ $1 != "drush" ]; then
  echo "Set drush alias"
  alias drush="$1"
fi

# MYSQL
if [[ ! -z $2 ]] && [ $2 != "mysql" ]; then
  echo "Set mysql alias"
  alias mysql="$2"
fi

# PHP
if [[ ! -z $3 ]] && [ $3 != "php" ]; then
  echo "Set php alias"
  alias php="$3";
fi

# Behat
if [[ ! -z $4 ]] && [ $4 != "behat" ]; then
  echo "Set behat alias"
  alias behat="$4"
fi
