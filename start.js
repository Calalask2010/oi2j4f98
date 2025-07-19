// Railway entry point - alternative to npm start
const { spawn } = require('child_process');

// Determine which backend to use based on environment
const useNodeBackend = process.env.USE_NODE_BACKEND !== 'false';

if (useNodeBackend) {
  console.log('🚀 Starting Node.js backend...');
  const child = spawn('npm', ['run', 'start'], { stdio: 'inherit' });
  
  child.on('close', (code) => {
    console.log(`Node.js backend exited with code ${code}`);
    process.exit(code);
  });
} else {
  console.log('🐍 Starting Python backend...');
  const child = spawn('python3', ['main.py'], { stdio: 'inherit' });
  
  child.on('close', (code) => {
    console.log(`Python backend exited with code ${code}`);
    process.exit(code);
  });
}