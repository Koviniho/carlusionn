#!/bin/bash

# Password file ka path
PASSWORD_FILE=~/.sudo_pass

# Check agar password file exist karti hai aur password ko ek baar read karein
if [ -f "$PASSWORD_FILE" ]; then
  sudo_pass=$(<"$PASSWORD_FILE")
else
  echo "Password file $PASSWORD_FILE exist nahi karti." >&2
  exit 1
fi

# Check if the build directory exists
if [ -d "dist" ]; then
  echo "Build directory exists."
else
  echo "Build directory does not exist." >&2
  exit 1
fi

# Remove the existing build directory if it exists
if [ -d "/var/www/html/car-lousion-fe-build" ]; then
  echo "Removing old build directory..."
  echo "$sudo_pass" | sudo -S rm -rf /var/www/html/car-lousion-fe-build
  echo "Old build directory removed."
else
  echo "No existing build directory to remove."
fi

# Copy the new build directory to the deployment location
echo "Copying new build directory..."
echo "$sudo_pass" | sudo -S cp -r dist /var/www/html/car-lousion-fe-build
echo "New build directory copied to /var/www/html/car-lousion-fe-build."

# Restart Nginx to apply changes
echo "Restarting Nginx service..."
echo "$sudo_pass" | sudo -S systemctl restart nginx || { echo "Failed to restart Nginx"; exit 1; }

# Deployment completed message
echo "Deployment completed successfully."
