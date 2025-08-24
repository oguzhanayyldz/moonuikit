#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Pro component listesi
const PRO_COMPONENTS = [
  'advanced-chart',
  'dashboard',
  'data-table',
  'form-wizard',
  'kanban',
  'rich-text-editor',
  'calendar-pro',
  'color-picker',
  'credit-card-input',
  'draggable-list',
  'file-upload',
  'floating-action-button',
  'gesture-drawer',
  'github-stars',
  'health-check',
  'hover-card-3d',
  'lazy-component',
  'magnetic-button',
  'memory-efficient-data',
  'navbar',
  'optimized-image',
  'performance-debugger',
  'performance-monitor',
  'phone-number-input',
  'pinch-zoom',
  'quiz-form',
  'sidebar',
  'spotlight-card',
  'swipeable-card',
  'timeline',
  'virtual-list',
  'avatar-pro',
  'moonui-quiz-form'
];

// Pro hooks ve utilities
const PRO_UTILITIES = [
  'use-paddle',
  'use-subscription',
  'use-license-check',
  'use-docs-pro-access',
  'useLicense',
  'license-validator',
  'paddle'
];

function cleanProReferences(targetDir) {
  console.log('🧹 Cleaning Pro component references...');
  
  // 1. packages/moonui/src/components/ui/index.ts dosyasını temizle
  const indexPath = path.join(targetDir, 'packages/moonui/src/components/ui/index.ts');
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // Pro component export'larını kaldır
    PRO_COMPONENTS.forEach(comp => {
      const regex = new RegExp(`export.*from.*['"\`].*${comp}.*['"\`];?\\n?`, 'gi');
      content = content.replace(regex, '');
    });
    
    fs.writeFileSync(indexPath, content);
    console.log('✅ Cleaned index.ts');
  }
  
  // 2. Pro component dosyalarını sil
  PRO_COMPONENTS.forEach(comp => {
    const componentPaths = [
      path.join(targetDir, `packages/moonui/src/components/ui/${comp}.tsx`),
      path.join(targetDir, `packages/moonui/src/components/ui/${comp}.ts`),
      path.join(targetDir, `packages/moonui/src/components/${comp}`)
    ];
    
    componentPaths.forEach(compPath => {
      if (fs.existsSync(compPath)) {
        if (fs.statSync(compPath).isDirectory()) {
          fs.rmSync(compPath, { recursive: true });
        } else {
          fs.unlinkSync(compPath);
        }
        console.log(`✅ Removed Pro component: ${comp}`);
      }
    });
  });
  
  // 3. Pro utility ve hook'ları kaldır
  PRO_UTILITIES.forEach(util => {
    const utilPaths = [
      path.join(targetDir, `packages/moonui/src/${util}.tsx`),
      path.join(targetDir, `packages/moonui/src/${util}.ts`),
      path.join(targetDir, `packages/moonui/src/hooks/${util}.ts`),
      path.join(targetDir, `packages/moonui/src/lib/${util}.ts`),
      path.join(targetDir, `packages/moonui/src/utils/${util}.tsx`)
    ];
    
    utilPaths.forEach(utilPath => {
      if (fs.existsSync(utilPath)) {
        fs.unlinkSync(utilPath);
        console.log(`✅ Removed Pro utility: ${util}`);
      }
    });
  });
  
  // 4. Tüm dosyalarda Pro import'ları temizle
  const files = glob.sync(`${targetDir}/packages/moonui/**/*.{ts,tsx,js,jsx}`, {
    ignore: ['**/node_modules/**', '**/dist/**']
  });
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Pro component import'larını kaldır
    PRO_COMPONENTS.forEach(comp => {
      const importRegex = new RegExp(`import.*from.*['"\`].*${comp}.*['"\`];?\\n?`, 'gi');
      if (importRegex.test(content)) {
        content = content.replace(importRegex, '');
        modified = true;
      }
    });
    
    // Pro utility import'larını kaldır
    PRO_UTILITIES.forEach(util => {
      const importRegex = new RegExp(`import.*${util}.*from.*['"\`].*['"\`];?\\n?`, 'gi');
      if (importRegex.test(content)) {
        content = content.replace(importRegex, '');
        modified = true;
      }
    });
    
    // License check kodlarını kaldır
    content = content.replace(/\/\/ License check[\s\S]*?\/\/ End license check\n?/g, '');
    content = content.replace(/if\s*\(.*isProComponent.*\)[\s\S]*?}\n?/g, '');
    
    if (modified) {
      fs.writeFileSync(file, content);
      console.log(`✅ Cleaned imports in: ${path.basename(file)}`);
    }
  });
  
  // 5. Package.json'dan Pro bağımlılıkları kaldır
  const packageJsonPath = path.join(targetDir, 'packages/moonui/package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Pro-only dependencies'i kaldır (varsa)
    const proDeps = ['@paddle/paddle-js', 'speakeasy'];
    proDeps.forEach(dep => {
      delete packageJson.dependencies?.[dep];
      delete packageJson.devDependencies?.[dep];
    });
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Cleaned package.json');
  }
  
  console.log('✨ Pro references cleaned successfully!');
}

// Script'i çalıştır
const targetDir = process.argv[2];
if (!targetDir) {
  console.error('❌ Please provide target directory');
  process.exit(1);
}

cleanProReferences(targetDir);