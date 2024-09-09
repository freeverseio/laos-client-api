#!/bin/sh
echo "Replacing environment variables in env-config.js..."

# Use envsubst to replace placeholders with actual environment variable values
envsubst < /usr/share/nginx/html/env-config.js > /usr/share/nginx/html/env-config.js.tmp
mv /usr/share/nginx/html/env-config.js.tmp /usr/share/nginx/html/env-config.js

# Start Nginx
echo "Starting Nginx..."
exec "$@"
