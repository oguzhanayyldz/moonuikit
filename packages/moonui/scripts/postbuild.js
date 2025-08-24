#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Add 'use client' to the beginning of dist files
const files = ['dist/index.mjs', 'dist/index.js'];

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.startsWith("'use client'")) {
      content = "'use client';\n\n" + content;
      fs.writeFileSync(filePath, content);
      console.log(`✅ Added 'use client' to ${file}`);
    }
  }
});