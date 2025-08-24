# MoonUI 🌙

A premium React component library built for modern web applications. MoonUI provides beautifully designed, accessible, and highly customizable components that help you build stunning user interfaces faster.

[![npm version](https://badge.fury.io/js/%40moontra%2Fmoonui.svg)](https://badge.fury.io/js/%40moontra%2Fmoonui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## ✨ Features

### 🎨 **Beautiful Design**
- **50+ Premium Components** - Carefully crafted with attention to detail
- **Modern Aesthetics** - Clean, minimalist design that works everywhere
- **Consistent Typography** - Harmonious text hierarchy and spacing
- **Smooth Animations** - Delightful micro-interactions powered by Framer Motion

### 🌙 **Dark Mode Ready**
- **Built-in Dark Mode** - Seamless light/dark theme switching
- **CSS Variables** - Easy customization with design tokens
- **Theme Provider** - Consistent theming across your application
- **Custom Themes** - Create your own color palettes

### ♿ **Accessibility First**
- **WCAG Compliant** - Meets accessibility standards
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Friendly** - Proper ARIA labels and descriptions
- **Focus Management** - Intuitive focus handling

### 🔧 **Developer Experience**
- **TypeScript** - Full type safety and IntelliSense
- **Tree Shaking** - Import only what you use
- **Zero Config** - Works out of the box
- **CLI Tool** - Easy installation with `moonui` CLI
- **Storybook** - Interactive component documentation

### 📱 **Responsive & Performance**
- **Mobile First** - Optimized for all screen sizes
- **Lightweight** - Minimal bundle impact
- **React 18+ Compatible** - Latest React features
- **SSR Ready** - Next.js and other SSR frameworks

## 🚀 Quick Start

### Installation

```bash
# Install the package
npm install @moontra/moonui

# Or use the CLI (recommended)
npx @moontra/moonui-cli@latest init
```

### CDN Usage (Browser/Artifacts)

For quick prototyping or artifact environments:

```html
<!-- Dependencies -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- MoonUI -->
<script src="https://cdn.jsdelivr.net/npm/@moontra/moonui@2.3.2/dist/index.global.js"></script>

<script>
  const { Button, Card } = window.MoonUI;
  
  function App() {
    return React.createElement(Card, null,
      React.createElement(Button, { variant: 'default' }, 'Hello MoonUI!')
    );
  }
  
  ReactDOM.render(React.createElement(App), document.getElementById('root'));
</script>
```

### Setup

1. **Configure Tailwind CSS** (required)

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@moontra/moonui/**/*.{js,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

2. **Import styles** (in your main CSS file)

```css
@import '@moontra/moonui/styles';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. **Start using components**

```jsx
import { Button, Card, Input } from '@moontra/moonui';

function App() {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to MoonUI</h1>
      <div className="space-y-4">
        <Input placeholder="Enter your name" />
        <Button variant="default" size="lg">
          Get Started
        </Button>
      </div>
    </Card>
  );
}
```

## 📚 Components

### Layout & Structure
- **Card** - Flexible content containers
- **Separator** - Visual content dividers
- **AspectRatio** - Responsive aspect ratio containers
- **ScrollArea** - Custom scrollable areas

### Navigation
- **Breadcrumb** - Hierarchical navigation
- **Pagination** - Page navigation controls
- **Tabs** - Tabbed interfaces
- **Navigation Menu** - Complex navigation structures

### Form Controls
- **Button** - Interactive buttons with variants
- **Input** - Text input fields
- **Textarea** - Multi-line text input
- **Select** - Dropdown selections
- **Checkbox** - Boolean selections
- **RadioGroup** - Single choice selections
- **Switch** - Toggle controls
- **Slider** - Range inputs
- **Label** - Form field labels

### Feedback & Overlays
- **Dialog** - Modal dialogs
- **AlertDialog** - Confirmation dialogs
- **Toast** - Notification messages
- **Alert** - Inline notifications
- **Tooltip** - Contextual information
- **Popover** - Floating content panels
- **HoverCard** - Hover-triggered content

### Data Display
- **Avatar** - User profile images
- **Badge** - Status indicators
- **Progress** - Loading indicators
- **Skeleton** - Loading placeholders
- **Table** - Structured data display
- **DataTable** - Advanced data tables
- **Accordion** - Collapsible content

### Media & Graphics
- **Calendar** - Date selection
- **DatePicker** - Date input controls
- **ColorPicker** - Color selection
- **FileUpload** - File upload interface

### Advanced
- **Command** - Command palette interface
- **Collapsible** - Expandable content
- **DropdownMenu** - Context menus
- **Menubar** - Application menu bars

## 🎨 Theming

### CSS Variables

MoonUI uses CSS variables for easy theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark theme variables */
}
```

### Theme Provider

```jsx
import { ThemeProvider } from '@moontra/moonui/theme';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Custom Colors

```css
:root {
  --primary: 142 76% 36%; /* Custom green */
  --secondary: 210 40% 95%;
}
```

## 🔧 CLI Tool

The MoonUI CLI helps you add components easily:

```bash
# Initialize MoonUI in your project
npx @moontra/moonui-cli@latest init

# Add specific components
npx @moontra/moonui-cli@latest add button
npx @moontra/moonui-cli@latest add card input

# Add multiple components
npx @moontra/moonui-cli@latest add button card input dialog
```

## 📖 Documentation

- **🌐 Website**: [moonui.dev](https://moonui.dev)
- **📚 Components**: [moonui.dev/docs/components](https://moonui.dev/docs/components)
- **🎨 Theming**: [moonui.dev/docs/theming](https://moonui.dev/docs/theming)
- **🔧 CLI**: [moonui.dev/docs/cli](https://moonui.dev/docs/cli)

## 🤖 AI Integration

MoonUI includes MCP (Model Context Protocol) support for AI assistants:

```bash
# Install MCP Server
npm install -g @moontra/moonui-mcp-server

# Configure in Claude Desktop
{
  "mcpServers": {
    "moonui": {
      "command": "npx",
      "args": ["@moontra/moonui-mcp-server"]
    }
  }
}
```

AI assistants can then help you:
- 🎯 Find the right components for your use case
- 🔧 Generate component code automatically
- 🐛 Fix import issues
- 🎨 Configure theming and customization
- 📱 Detect environment (CDN vs NPM) automatically

## 💼 Pro Version

Upgrade to MoonUI Pro for advanced components:

- **DataTable** - Advanced data grids with sorting, filtering, pagination
- **Charts** - Beautiful data visualizations
- **RichTextEditor** - WYSIWYG editor
- **FormWizard** - Multi-step forms
- **Calendar** - Advanced date/time pickers
- **DragDropList** - Sortable lists
- **TreeView** - Hierarchical data display
- **Timeline** - Event timelines
- **VideoPlayer** - Custom video controls
- **CodeEditor** - Syntax-highlighted code input

[Learn more about Pro →](https://moonui.dev/pricing)

## 🛠️ Development

### Requirements

- Node.js 18+ 
- React 18+
- TypeScript 5+
- Tailwind CSS 3+

### Local Development

```bash
git clone https://github.com/moontra/moonui
cd moonui/packages/moonui
npm install
npm run dev
```

### Building

```bash
npm run build      # Build for production
npm run build:dts  # Generate type definitions
npm run lint       # Lint code
npm run test       # Run tests
```

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

### Component Guidelines

- Follow accessibility best practices
- Include TypeScript types
- Add Storybook stories
- Write comprehensive tests
- Document props and usage

## 📦 Package Details

- **Bundle Size**: ~460KB (ESM), ~485KB (CJS)
- **CDN Bundle**: ~742KB (includes all dependencies)
- **Type Definitions**: Full TypeScript support
- **Tree Shaking**: Import individual components
- **Side Effects**: false (webpack optimization)

## 🔗 Ecosystem

- **[@moontra/moonui-pro](https://npmjs.com/package/@moontra/moonui-pro)** - Premium components
- **[@moontra/moonui-cli](https://npmjs.com/package/@moontra/moonui-cli)** - Command line tool
- **[@moontra/moonui-mcp-server](https://npmjs.com/package/@moontra/moonui-mcp-server)** - AI integration

## 📄 License

Licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Built with:
- [React](https://reactjs.org/)
- [Radix UI](https://radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

<div align="center">

**[Website](https://moonui.dev) • [Documentation](https://moonui.dev/docs) • [Components](https://moonui.dev/docs/components) • [GitHub](https://github.com/moontra/moonui)**

Made with ❤️ by the MoonUI team

</div>