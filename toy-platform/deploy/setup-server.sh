#!/bin/bash
# ==========================================
# To'y Platform - Alibaba Cloud Server Setup
# Run this ONCE on a fresh Ubuntu 22.04/24.04 server
# ==========================================

set -e

echo "========================================="
echo "  To'y Platform - Server Setup"
echo "========================================="

# --- System Updates ---
echo "[1/10] Updating system packages..."
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install -y curl wget git unzip ufw software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# --- Create deploy user (optional but recommended) ---
echo "[2/10] Creating deploy user..."
if ! id "deploy" &>/dev/null; then
  sudo adduser --disabled-password --gecos "" deploy
  sudo usermod -aG sudo deploy
  sudo usermod -aG docker deploy 2>/dev/null || true
  echo "deploy ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/deploy
fi

# --- Install Docker ---
echo "[3/10] Installing Docker..."
if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com | sudo sh
  sudo systemctl enable docker
  sudo systemctl start docker
  sudo usermod -aG docker $USER
fi
echo "Docker version: $(docker --version)"

# --- Install Docker Compose ---
echo "[4/10] Installing Docker Compose..."
if ! command -v docker-compose &>/dev/null && ! docker compose version &>/dev/null; then
  sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
fi

# --- Install Node.js 20 (for local builds) ---
echo "[5/10] Installing Node.js 20..."
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
echo "Node version: $(node --version)"

# --- Install PM2 ---
echo "[6/10] Installing PM2..."
if ! command -v pm2 &>/dev/null; then
  sudo npm install -g pm2
fi

# --- Install Nginx ---
echo "[7/10] Installing Nginx..."
if ! command -v nginx &>/dev/null; then
  sudo apt-get install -y nginx
  sudo systemctl enable nginx
fi

# --- Install Certbot for SSL ---
echo "[8/10] Installing Certbot..."
if ! command -v certbot &>/dev/null; then
  sudo apt-get install -y certbot python3-certbot-nginx
fi

# --- Firewall ---
echo "[9/10] Configuring firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# --- Create directories ---
echo "[10/10] Creating project directories..."
sudo mkdir -p /opt/toy-platform
sudo mkdir -p /var/log/toy-platform
sudo chown -R deploy:deploy /opt/toy-platform
sudo chown -R deploy:deploy /var/log/toy-platform

echo ""
echo "========================================="
echo "  Server setup complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "  1. Clone the repo:"
echo "     sudo -u deploy git clone <your-repo-url> /opt/toy-platform"
echo ""
echo "  2. Set up environment:"
echo "     cd /opt/toy-platform"
echo "     cp .env.production.example .env.production"
echo "     nano .env.production"
echo ""
echo "  3. Run deployment:"
echo "     bash deploy/deploy.sh"
echo ""
echo "  4. Setup SSL:"
echo "     sudo certbot --nginx -d toyplatform.uz -d www.toyplatform.uz"
echo ""
