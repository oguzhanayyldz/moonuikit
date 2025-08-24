#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function updatePublicPackage(targetDir) {
  console.log('📦 Updating package.json for public repository...');
  
  const packageJsonPath = path.join(targetDir, 'packages/moonui/package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found at:', packageJsonPath);
    return;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Repository bilgilerini güncelle
  packageJson.repository = {
    type: 'git',
    url: 'https://github.com/oguzhanayyldz/moonuikit.git'
  };
  
  packageJson.homepage = 'https://github.com/oguzhanayyldz/moonuikit#readme';
  
  packageJson.bugs = {
    url: 'https://github.com/oguzhanayyldz/moonuikit/issues'
  };
  
  // Keywords'leri güncelle
  if (!packageJson.keywords) {
    packageJson.keywords = [];
  }
  
  const additionalKeywords = [
    'open-source',
    'mit-license',
    'free-components',
    'community-driven'
  ];
  
  packageJson.keywords = [...new Set([...packageJson.keywords, ...additionalKeywords])];
  
  // Pro bağımlılıkları kaldır
  const proDependencies = [
    '@paddle/paddle-js',
    'speakeasy',
    '@moontra/moonui-pro'
  ];
  
  proDependencies.forEach(dep => {
    delete packageJson.dependencies?.[dep];
    delete packageJson.devDependencies?.[dep];
    delete packageJson.peerDependencies?.[dep];
  });
  
  // Scripts'leri güncelle (publish komutlarını kaldır)
  if (packageJson.scripts) {
    delete packageJson.scripts.pub;
    delete packageJson.scripts['pub:minor'];
    delete packageJson.scripts['pub:major'];
    delete packageJson.scripts.prepublishOnly;
    
    // Geliştirme için yararlı script'ler ekle
    packageJson.scripts['dev'] = 'npm run build -- --watch';
    packageJson.scripts['test'] = 'jest';
    packageJson.scripts['test:watch'] = 'jest --watch';
    packageJson.scripts['lint'] = 'eslint src --ext .ts,.tsx';
    packageJson.scripts['format'] = 'prettier --write "src/**/*.{ts,tsx,js,jsx,json,md}"';
  }
  
  // Funding bilgisi ekle
  packageJson.funding = {
    type: 'github',
    url: 'https://github.com/sponsors/oguzhanayyldz'
  };
  
  // Contributors ekle
  if (!packageJson.contributors) {
    packageJson.contributors = [
      {
        name: 'Oğuzhan Ayyıldız',
        url: 'https://github.com/oguzhanayyldz'
      }
    ];
  }
  
  // Package.json'ı kaydet
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✅ Updated package.json');
  
  // Root package.json oluştur (public repo için)
  createRootPackageJson(targetDir);
}

function createRootPackageJson(targetDir) {
  const rootPackageJson = {
    name: 'moonuikit',
    version: '1.0.0',
    description: 'Open-source React UI components library with modern design',
    private: true,
    workspaces: [
      'packages/*',
      'examples/*'
    ],
    scripts: {
      'dev': 'npm run dev --workspace=packages/moonui',
      'build': 'npm run build --workspace=packages/moonui',
      'test': 'npm run test --workspaces --if-present',
      'lint': 'npm run lint --workspaces --if-present',
      'format': 'prettier --write "**/*.{ts,tsx,js,jsx,json,md}"',
      'prepare': 'husky install',
      'example:next': 'npm run dev --workspace=examples/nextjs-app',
      'example:vite': 'npm run dev --workspace=examples/vite-react'
    },
    repository: {
      type: 'git',
      url: 'https://github.com/oguzhanayyldz/moonuikit.git'
    },
    keywords: [
      'react',
      'ui-components',
      'design-system',
      'tailwindcss',
      'radix-ui',
      'nextjs',
      'typescript',
      'open-source'
    ],
    author: 'Oğuzhan Ayyıldız',
    license: 'MIT',
    bugs: {
      url: 'https://github.com/oguzhanayyldz/moonuikit/issues'
    },
    homepage: 'https://github.com/oguzhanayyldz/moonuikit#readme',
    devDependencies: {
      'prettier': '^3.0.0',
      'husky': '^8.0.0',
      'lint-staged': '^14.0.0'
    },
    'lint-staged': {
      '*.{ts,tsx,js,jsx}': [
        'eslint --fix',
        'prettier --write'
      ],
      '*.{json,md}': [
        'prettier --write'
      ]
    },
    engines: {
      node: '>=18.0.0',
      npm: '>=9.0.0'
    }
  };
  
  const rootPackageJsonPath = path.join(targetDir, 'package.json');
  fs.writeFileSync(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2) + '\n');
  console.log('✅ Created root package.json');
}

// Script'i çalıştır
const targetDir = process.argv[2];
if (!targetDir) {
  console.error('❌ Please provide target directory');
  process.exit(1);
}

updatePublicPackage(targetDir);