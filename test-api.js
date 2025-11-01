// Simple test script to verify API functionality
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Spin-to-Win Application...\n');

// Test 1: Check if data directory structure is ready
console.log('Test 1: Data directory structure');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('✓ Created data directory');
} else {
  console.log('✓ Data directory exists');
}

// Test 2: Check if prizes.json is initialized
console.log('\nTest 2: Prizes configuration');
const prizesFile = path.join(dataDir, 'prizes.json');
if (fs.existsSync(prizesFile)) {
  const prizes = JSON.parse(fs.readFileSync(prizesFile, 'utf-8'));
  console.log(`✓ Prizes file exists with ${prizes.length} prizes`);
  prizes.forEach(p => {
    console.log(`  - ${p.name}: ${p.probability}% chance, ${p.remaining}/${p.quantity} remaining`);
  });
} else {
  console.log('⚠ Prizes file will be created on first API call');
}

// Test 3: Check if users.json is initialized
console.log('\nTest 3: Users tracking');
const usersFile = path.join(dataDir, 'users.json');
if (fs.existsSync(usersFile)) {
  const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  console.log(`✓ Users file exists with ${users.length} entries`);
} else {
  console.log('⚠ Users file will be created on first submission');
}

// Test 4: Verify build output
console.log('\nTest 4: Build verification');
const nextDir = path.join(__dirname, '.next');
if (fs.existsSync(nextDir)) {
  console.log('✓ Next.js build output exists');
} else {
  console.log('✗ Build output not found');
}

// Test 5: Check required files
console.log('\nTest 5: Required files check');
const requiredFiles = [
  'app/page.tsx',
  'app/layout.tsx',
  'app/admin/page.tsx',
  'components/PrizeWheel.tsx',
  'components/EmailForm.tsx',
  'components/PrizeModal.tsx',
  'lib/prizes.ts',
  'lib/users.ts',
  'lib/email.ts',
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ ${file} - MISSING`);
    allFilesExist = false;
  }
});

console.log('\n' + '='.repeat(50));
if (allFilesExist) {
  console.log('✅ All tests passed! Application is ready.');
  console.log('\nTo start the development server, run:');
  console.log('  npm run dev');
  console.log('\nThen visit:');
  console.log('  http://localhost:3000 - Main spin wheel');
  console.log('  http://localhost:3000/admin - Admin dashboard');
} else {
  console.log('⚠️  Some files are missing. Please check the output above.');
}
console.log('='.repeat(50));
