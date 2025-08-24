#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

// Package root directory
const packageRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(packageRoot, 'dist');
const stylesDir = path.resolve(packageRoot, 'styles');
const distStylesDir = path.resolve(distDir, 'styles');

// Clean dist directory
console.log('Cleaning dist directory...');
fs.removeSync(distDir);
fs.ensureDirSync(distDir);
fs.ensureDirSync(distStylesDir);

// Build package
console.log('Building MoonUI components package...');
exec('npm run build', { cwd: packageRoot }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Build error: ${error}`);
    return;
  }
  
  console.log(stdout);
  
  if (stderr) {
    console.error(stderr);
  }
  
  // Copy styles if they exist
  if (fs.existsSync(stylesDir)) {
    console.log('Copying styles...');
    fs.copySync(stylesDir, distStylesDir);
  }
  
  // Create a clean package.json for publishing
  const packageJson = require('../package.json');
  
  // Remove dev dependencies and scripts from the published package.json
  delete packageJson.devDependencies;
  delete packageJson.scripts;
  
  // Write clean package.json to dist
  fs.writeJsonSync(path.resolve(distDir, 'package.json'), packageJson, { spaces: 2 });
  console.log('Created clean package.json for distribution');
  
  // Copy README if it exists
  const readmePath = path.resolve(packageRoot, 'README.md');
  if (fs.existsSync(readmePath)) {
    fs.copySync(readmePath, path.resolve(distDir, 'README.md'));
    console.log('Copied README.md to dist directory');
  }
  
  // Copy LICENSE if it exists
  const licensePath = path.resolve(packageRoot, 'LICENSE');
  if (fs.existsSync(licensePath)) {
    fs.copySync(licensePath, path.resolve(distDir, 'LICENSE'));
    console.log('Copied LICENSE to dist directory');
  }
  
  console.log('Build completed successfully!');
});
