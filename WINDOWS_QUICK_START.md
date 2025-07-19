# HireHand - Quick Start for Windows

## 🚀 Super Fast Start (No Database Required)

**Just double-click:** `start-memory-windows.bat`

That's it! Website opens at http://localhost:5000

## 📋 What You Need

1. **Node.js** - Download from https://nodejs.org/ (LTS version)
2. **Nothing else!** - No PostgreSQL required for memory version

## 🔧 Available Start Options

### Option 1: Memory Version (Recommended)
- **File:** `start-memory-windows.bat`
- **Features:** Fast, no database setup needed
- **Limitation:** Data lost when server stops

### Option 2: Simple Start
- **File:** `start-windows-simple.bat`  
- **Features:** Quick start with minimal setup

### Option 3: Full Setup
- **File:** `start-windows.bat`
- **Features:** Complete setup with database checks

## ⚡ Manual Commands (if needed)

```cmd
# Install dependencies
npm install

# Start server (memory version)
npx cross-env NODE_ENV=development tsx server/index.ts
```

## 🛠️ Troubleshooting

### Error: Node.js not found
**Solution:** Install Node.js from https://nodejs.org/ and check "Add to PATH"

### Error: Port 5000 busy
**Solution:** Close other applications using port 5000 or change PORT in .env

### Error: Dependencies missing
**Solution:** Run `npm install` in the project folder

## 📁 File Structure

```
project/
├── start-memory-windows.bat     # Memory version (recommended)
├── start-windows-simple.bat     # Simple start
├── start-windows.bat            # Full setup with database
├── .env.memory                  # Memory version settings
└── README_MEMORY.md            # Detailed memory version guide
```

---
**💡 Tip:** Use the memory version for quick demos and testing!