#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Free component listesi
const FREE_COMPONENTS = [
  'accordion',
  'alert',
  'aspect-ratio',
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'calendar',
  'card',
  'checkbox',
  'collapsible',
  'command',
  'dialog',
  'dropdown-menu',
  'input',
  'label',
  'pagination',
  'popover',
  'progress',
  'radio-group',
  'scroll-area',
  'select',
  'separator',
  'skeleton',
  'slider',
  'switch',
  'table',
  'tabs',
  'textarea',
  'toast',
  'toggle',
  'tooltip',
  'date-picker',
  'card-input',
  'tags-input',
  'phone-input',
  'simple-editor'
];

function copyFreeDocs(targetDir) {
  console.log('📄 Copying free component documentation...');
  
  // Docs dizinini oluştur
  const docsDir = path.join(targetDir, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  // components docs dizinini oluştur
  const componentsDocsDir = path.join(docsDir, 'components');
  if (!fs.existsSync(componentsDocsDir)) {
    fs.mkdirSync(componentsDocsDir, { recursive: true });
  }
  
  // 1. Free component dokümanlarını kopyala
  FREE_COMPONENTS.forEach(comp => {
    const docPaths = [
      path.join('src/app/docs/components', `${comp}`, 'page.tsx'),
      path.join('src/app/docs/components', `${comp}.mdx`),
      path.join('docs/components', `${comp}.md`)
    ];
    
    docPaths.forEach(docPath => {
      if (fs.existsSync(docPath)) {
        const fileName = path.basename(docPath);
        const targetPath = path.join(componentsDocsDir, `${comp}.md`);
        
        // TSX/MDX dosyalarını MD'ye dönüştür
        let content = fs.readFileSync(docPath, 'utf8');
        
        // Pro referansları temizle
        content = cleanProReferences(content, comp);
        
        // TSX'ten markdown'a basit dönüşüm
        if (docPath.endsWith('.tsx')) {
          content = convertTsxToMarkdown(content, comp);
        }
        
        fs.writeFileSync(targetPath, content);
        console.log(`✅ Copied docs for: ${comp}`);
      }
    });
  });
  
  // 2. Ana doküman dosyalarını kopyala
  const mainDocs = [
    'getting-started.md',
    'installation.md',
    'theming.md',
    'dark-mode.md',
    'typescript.md'
  ];
  
  mainDocs.forEach(doc => {
    const sourcePath = path.join('docs', doc);
    if (fs.existsSync(sourcePath)) {
      const targetPath = path.join(docsDir, doc);
      let content = fs.readFileSync(sourcePath, 'utf8');
      
      // Pro linklerini güncelle
      content = updateProLinks(content);
      
      fs.writeFileSync(targetPath, content);
      console.log(`✅ Copied: ${doc}`);
    }
  });
  
  // 3. README için component listesi oluştur
  createComponentsList(targetDir);
  
  console.log('✨ Documentation copied successfully!');
}

function cleanProReferences(content, componentName) {
  // Pro özellik referanslarını kaldır
  content = content.replace(/## Pro Features[\s\S]*?(?=##|$)/gi, '');
  content = content.replace(/### Pro Version[\s\S]*?(?=###|##|$)/gi, '');
  
  // Pro import'ları temizle
  content = content.replace(/import.*from.*moonui-pro.*\n/g, '');
  
  // Pro component kullanımlarını bilgilendirme mesajıyla değiştir
  content = content.replace(
    /<([A-Z]\w+Pro)[\s\S]*?\/>/g,
    '> 💎 This is a Pro component. [Upgrade to Pro](https://moonui.design/pricing) to access this feature.\n'
  );
  
  return content;
}

function convertTsxToMarkdown(content, componentName) {
  // Basit TSX to Markdown dönüşümü
  let markdown = `# ${componentName.charAt(0).toUpperCase() + componentName.slice(1)}\n\n`;
  
  // Meta bilgileri çıkar
  const metaMatch = content.match(/meta:\s*{([^}]+)}/s);
  if (metaMatch) {
    const meta = metaMatch[1];
    const descMatch = meta.match(/description:\s*["']([^"']+)["']/);
    if (descMatch) {
      markdown += `${descMatch[1]}\n\n`;
    }
  }
  
  // Installation bilgilerini çıkar
  const installMatch = content.match(/installation:\s*{([^}]+)}/s);
  if (installMatch) {
    markdown += `## Installation\n\n`;
    markdown += `\`\`\`bash\nnpm install @moontra/moonui\n\`\`\`\n\n`;
  }
  
  // Usage örneklerini çıkar
  const usageMatch = content.match(/usage:\s*{[\s\S]*?code:\s*`([^`]+)`/);
  if (usageMatch) {
    markdown += `## Usage\n\n`;
    markdown += `\`\`\`tsx\n${usageMatch[1]}\n\`\`\`\n\n`;
  }
  
  // API bilgilerini çıkar
  const apiMatch = content.match(/props:\s*\[([^\]]+)\]/s);
  if (apiMatch) {
    markdown += `## API Reference\n\n`;
    markdown += `| Prop | Type | Default | Description |\n`;
    markdown += `|------|------|---------|-------------|\n`;
    
    // Basit prop tablosu oluştur
    const props = apiMatch[1].match(/{[^}]+}/g);
    if (props) {
      props.forEach(prop => {
        const nameMatch = prop.match(/name:\s*["']([^"']+)["']/);
        const typeMatch = prop.match(/type:\s*["']([^"']+)["']/);
        const defaultMatch = prop.match(/default:\s*["']([^"']+)["']/);
        const descMatch = prop.match(/description:\s*["']([^"']+)["']/);
        
        if (nameMatch) {
          markdown += `| ${nameMatch[1]} | ${typeMatch?.[1] || '-'} | ${defaultMatch?.[1] || '-'} | ${descMatch?.[1] || '-'} |\n`;
        }
      });
    }
    markdown += '\n';
  }
  
  return markdown;
}

function updateProLinks(content) {
  // Pro component linklerini güncelle
  content = content.replace(
    /\[([^\]]+)\]\(\/docs\/components\/([\w-]+)-pro\)/g,
    '[$1](https://moonui.design/components/$2) 💎'
  );
  
  // Pro pricing linklerini ekle
  content = content.replace(
    /\[Upgrade to Pro\]/g,
    '[Upgrade to Pro](https://moonui.design/pricing)'
  );
  
  return content;
}

function createComponentsList(targetDir) {
  const listPath = path.join(targetDir, 'docs', 'components-list.md');
  
  let content = `# Available Components\n\n`;
  content += `MoonUI provides ${FREE_COMPONENTS.length}+ free components for building modern React applications.\n\n`;
  
  content += `## Free Components\n\n`;
  content += `| Component | Description | Status |\n`;
  content += `|-----------|-------------|--------|\n`;
  
  FREE_COMPONENTS.forEach(comp => {
    const name = comp.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    content += `| [${name}](./components/${comp}.md) | High-quality ${name.toLowerCase()} component | ✅ Stable |\n`;
  });
  
  content += `\n## Pro Components\n\n`;
  content += `> 💎 **Upgrade to Pro** to access 200+ premium components with advanced features.\n\n`;
  content += `[View Pro Components →](https://moonui.design/components)\n`;
  
  fs.writeFileSync(listPath, content);
  console.log('✅ Created components list');
}

// Script'i çalıştır
const targetDir = process.argv[2];
if (!targetDir) {
  console.error('❌ Please provide target directory');
  process.exit(1);
}

copyFreeDocs(targetDir);