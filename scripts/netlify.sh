#!/bin/bash -e

echo "Downloading PHPoole"
curl -sSOL https://phpoole.org/phpoole.phar
php phpoole.phar --version

echo "Started PHPoole build"
if [ -z "$1" ]; then php phpoole.phar build --quiet; else echo "URL: $1" && php phpoole.phar build --baseurl=$1 --drafts; fi
echo "Finished PHPoole build"

exit 0
