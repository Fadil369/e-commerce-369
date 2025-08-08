#!/bin/bash

echo "🔄 Restarting Next.js development server with fixed configuration..."

# Kill any existing Next.js processes on multiple ports
echo "Stopping any existing Next.js processes..."
pkill -f "next dev" || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
lsof -ti:3002 | xargs kill -9 2>/dev/null || true

# Wait a moment
sleep 3

echo "🚀 Starting development server on port 3001..."
echo "📝 Fixed issues:"
echo "  ✅ Removed 'output: export' for development"
echo "  ✅ Removed experimental.runtime edge config"
echo "  ✅ Simplified config for i18n middleware support"
echo "  ✅ Using port 3001 to avoid conflicts"
echo ""
echo "🌍 Test URLs:"
echo "  📱 English: http://localhost:3001/en"
echo "  📱 Arabic:  http://localhost:3001/ar"
echo "  📱 Default: http://localhost:3001"
echo ""
echo "🔧 Alternative ports available:"
echo "  🟢 Port 3000: npm run dev:3000"
echo "  🟢 Port 3002: npm run dev:3002"
echo ""
echo "🛑 Press Ctrl+C to stop the server"
echo ""

npm run dev
