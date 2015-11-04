# Friendly messages are fun.
echo "Site has been successfully built using the friendly SWS Geppetto"

# Initialize composer manager:
php modules/contrib/composer_manager/scripts/init.php

# Run composer_manager drupal-update
composer drupal-update
