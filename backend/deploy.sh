#!/bin/bash

# Password file ka path
PASSWORD_FILE=~/.sudo_pass

# Check agar password file exist karti hai aur password ko ek baar read karein
if [ -f "$PASSWORD_FILE" ]; then
  sudo_pass=$(<"$PASSWORD_FILE")
else
  echo "Password file $PASSWORD_FILE doesn't exist." >&2
  exit 1
fi

set -e

echo "Deployment started ..."

# Check if the process is running and restart/start accordingly
if pm2 describe carlusion-api > /dev/null 2>&1; then
  echo "Process carlusion-api is running"
  echo "Restarting carlusion-api"
  pm2 restart carlusion-api --update-env || { echo "Failed to restart process"; exit 1; }
else
  echo "Process carlusion-api is not running or does not exist"
  echo "Starting carlusion-api"
  pm2 start server.js --name "carlusion-api" || { echo "Failed to start process"; exit 1; }
fi

# Save PM2 status to synchronize processes
pm2 save || { echo "Failed to save PM2 process list"; exit 1; }

# Restart Nginx only if the deployment is successful
echo "Restarting Nginx ..."
# Read the password from the file and restart Nginx
echo $sudo_pass | sudo -S systemctl restart nginx || { echo "Failed to restart Nginx"; exit 1; }

echo "Deployment completed successfully!"
