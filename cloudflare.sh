#!/usr/bin/env bash

set -e

echo "Purge Cloudflare cache (zone: ${Cloudflare_zone})"

curl -X DELETE "https://api.cloudflare.com/client/v4/zones/${Cloudflare_zone}/purge_cache" \
    -H "X-Auth-Email: arnaud@ligny.org" \
    -H "X-Auth-Key: ${Cloudflare_API}" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}'
