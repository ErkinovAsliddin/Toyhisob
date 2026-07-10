#!/bin/bash
# ==========================================
# To'y Platform - Deploy Script
# Run this after setup-server.sh
# ==========================================

set -e

PROJECT_DIR="/opt/toy-platform"
COMPOSE_FILE="docker-compose.prod.yml"

echo "========================================="
echo "  To'y Platform - Deployment"
echo "========================================="

cd $PROJECT_DIR

# --- Check .env.production exists ---
if [ ! -f ".env.production" ]; then
  echo "ERROR: .env.production not found!"
  echo "Copy .env.production.example to .env.production and fill in values."
  exit 1
fi

# --- Load env vars ---
export $(cat .env.production | grep -v '^#' | xargs)

# --- Pull latest code ---
echo "[1/7] Pulling latest code..."
if [ -d ".git" ]; then
  git pull origin main
else
  echo "Not a git repo. Skipping pull."
fi

# --- Build Docker images ---
echo "[2/7] Building Docker images..."
docker compose -f $COMPOSE_FILE build --no-cache

# --- Stop existing containers ---
echo "[3/7] Stopping existing containers..."
docker compose -f $COMPOSE_FILE down

# --- Start database first ---
echo "[4/7] Starting database..."
docker compose -f $COMPOSE_FILE up -d db redis

echo "Waiting for database to be ready..."
sleep 10

# Wait for DB health check
for i in {1..30}; do
  if docker exec toy-platform-db pg_isready -U toy_user -d toy_platform -q 2>/dev/null; then
    echo "Database is ready!"
    break
  fi
  echo "Waiting for database... ($i/30)"
  sleep 2
done

# --- Run Prisma migrations ---
echo "[5/7] Running database migrations..."
docker compose -f $COMPOSE_FILE run --rm app npx prisma db push --skip-generate

# --- Seed data (only on first deploy) ---
if [ "$1" = "--seed" ]; then
  echo "Seeding vendor data..."
  docker compose -f $COMPOSE_FILE run --rm app npx tsx prisma/seed/vendors.ts
fi

# --- Start all services ---
echo "[6/7] Starting all services..."
docker compose -f $COMPOSE_FILE up -d

# --- Health check ---
echo "[7/7] Running health check..."
sleep 15

for i in {1..10}; do
  if curl -sf http://localhost:3000 > /dev/null 2>&1; then
    echo ""
    echo "========================================="
    echo "  Deployment successful!"
    echo "========================================="
    echo ""
    echo "App is running at: http://$(hostname -I | awk '{print $1}'):3000"
    echo ""
    echo "Useful commands:"
    echo "  docker compose -f $COMPOSE_FILE logs -f        # View logs"
    echo "  docker compose -f $COMPOSE_FILE restart app     # Restart app"
    echo "  docker compose -f $COMPOSE_FILE down            # Stop all"
    echo "  docker compose -f $COMPOSE_FILE ps              # Check status"
    echo ""
    exit 0
  fi
  echo "Waiting for app to start... ($i/10)"
  sleep 5
done

echo "WARNING: App may not be fully started yet. Check logs:"
echo "  docker compose -f $COMPOSE_FILE logs app"
