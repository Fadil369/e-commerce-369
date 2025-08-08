# 🔧 Troubleshooting 404 Issues

## Quick Fix Commands

```bash
# Try different ports
npm run dev        # Port 3001 (default)
npm run dev:3000   # Port 3000
npm run dev:3002   # Port 3002

# Or use the restart script
chmod +x restart-dev.sh
./restart-dev.sh
```

## 🔍 Common 404 Causes & Solutions

### 1. Port Conflicts

**Issue**: Another service using the same port
**Solution**:

```bash
# Check what's using port 3000
lsof -ti:3000

# Kill process if needed
lsof -ti:3000 | xargs kill -9

# Use different port
npm run dev:3001
```

### 2. Next.js Cache Issues

**Issue**: Stale cache causing routing problems
**Solution**:

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### 3. Middleware Configuration

**Issue**: Middleware not working with static export
**Solution**: ✅ Already fixed in next.config.js

### 4. Internationalization Routes

**Issue**: i18n routes not configured properly
**URLs to test**:

- `http://localhost:3001/` (should redirect)
- `http://localhost:3001/en` (English)
- `http://localhost:3001/ar` (Arabic)

### 5. Build Errors

**Issue**: TypeScript or build errors preventing start
**Solution**:

```bash
# Check for errors
npm run type-check
npm run lint

# Fix and restart
npm run dev
```

## 🧪 Test Checklist

1. **Server Starts**: ✅ No error messages
2. **Port Access**: ✅ Can access localhost:3001
3. **English Route**: ✅ /en loads correctly
4. **Arabic Route**: ✅ /ar loads correctly
5. **Language Switch**: ✅ Header switcher works
6. **RTL Layout**: ✅ Arabic shows right-to-left

## 🚀 Quick Start

```bash
# Clean start
rm -rf .next node_modules
npm install
npm run dev

# Test URLs
open http://localhost:3001/en
open http://localhost:3001/ar
```

## 🆘 If Still Getting 404

1. **Check the terminal output** for specific error messages
2. **Try building first**: `npm run build` to see if there are build errors
3. **Check file structure**: Ensure all files are in correct locations
4. **Browser cache**: Try incognito/private browsing mode
5. **Different browser**: Test in Chrome, Safari, Firefox

## 📞 Need Help?

Share the terminal output when running `npm run dev` to debug further!
