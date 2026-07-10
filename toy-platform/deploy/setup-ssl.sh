#!/bin/bash
# ==========================================
# To'y Platform - SSL Setup with Let's Encrypt
# Run after deploy.sh
# ==========================================

set -e

echo "========================================="
echo "  SSL Certificate Setup"
echo "========================================="

# --- Check domain is pointed to server ---
echo "Make sure your domain (toyplatform.uz) points to this server's IP."
echo "Current server IP: $(hostname -I | awk '{print $1}')"
echo ""

read -p "Continue with SSL setup? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 1
fi

# --- Get SSL certificate ---
echo "Requesting SSL certificate..."
sudo certbot certonly --nginx \
  -d toyplatform.uz \
  -d www.toyplatform.uz \
  --non-interactive \
  --agree-tos \
  --email admin@toyplatform.uz

# --- Setup auto-renewal ---
echo "Setting up auto-renewal..."
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# --- Reload Nginx ---
echo "Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

# --- Create SSL directory for Docker ---
mkdir -p deploy/ssl
sudo cp -r /etc/letsencrypt deploy/ssl/
sudo chown -R $USER:$USER deploy/ssl/

echo ""
echo "========================================="
echo "  SSL setup complete!"
echo "========================================="
echo ""
echo "Your site is now available at:"
echo "  https://toyplatform.uz"
echo "  https://www.toyplatform.uz"
echo ""
echo "Auto-renewal is configured via certbot timer."
echo ""
