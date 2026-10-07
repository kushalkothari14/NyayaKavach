#!/bin/bash
# Continuous Public Tunnel Auto-Reconnect Script
while true; do
  echo "Launching persistent public tunnel..."
  ssh -o StrictHostKeyChecking=no -o ServerAliveInterval=30 -p 443 -R 0:localhost:3001 a.pinggy.io
  sleep 3
done
