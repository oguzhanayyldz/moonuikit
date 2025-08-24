# MoonUI Tema Özelleştirme Sistemi

MoonUI'ın tema özelleştirme sistemi, bileşen kütüphanesinin görünümünü ve hissini tam olarak uygulamanıza uygun şekilde özelleştirmenize olanak tanır. Bu belge, tema sisteminin nasıl kurulacağını ve kullanılacağını açıklamaktadır.

## Kurulum

Öncelikle, MoonUI tema sağlayıcısını uygulamanızın kök bileşenine eklemeniz gerekir:

```tsx
import { ThemeProvider } from '@moontra/moonui';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider 
    defaultColorMode="light"
    preset="default"
  >
    <App />
  </ThemeProvider>
);
```

## Temel Kullanım

ThemeProvider, varsayılan ayarlarla kullanılabilir veya özel temalar belirtilebilir:

```tsx
<ThemeProvider 
  defaultColorMode="dark"
  preset="modern"              // Hazır tema şablonu
  lightTheme={{
    colors: {
      primary: 'hsl(215, 70%, 45%)',
      secondary: 'hsl(280, 60%, 45%)'
    }
  }}
  darkTheme={{
    colors: {
      primary: 'hsl(215, 70%, 65%)',
      secondary: 'hsl(280, 60%, 65%)'
    }
  }}
  extensions={{                // Özel tema değişkenleri
    custom: {
      headerHeight: '60px',
      sidebarWidth: '280px',
      cardShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }
  }}
>
  {children}
</ThemeProvider>
```

## Tema Değişkenlerini Kullanma

Uygulama içinde mevcut temayı almak ve kullanmak için `useTheme` kancasını kullanabilirsiniz:

```tsx
import { useTheme } from '@moontra/moonui';

const MyComponent = () => {
  const { theme, colorMode, setColorMode, updateTheme, setThemePreset } = useTheme();

  // Tema renklerine erişim
  const primaryColor = theme.colors.primary;
  
  // Özel tema değişkenlerine erişim
  const headerHeight = theme.extensions?.custom?.headerHeight;
  
  // Renk modunu değiştirmek için
  const toggleTheme = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };
  
  // Dinamik olarak temayı güncellemek için
  const customizeTheme = () => {
    updateTheme({
      colors: {
        primary: 'hsl(180, 70%, 50%)'
      },
      extensions: {
        custom: {
          headerHeight: '80px' // Özel değişkeni güncelleme
        }
      }
    });
  };
  
  // Hazır tema şablonunu değiştirmek için
  const changeToModernTheme = () => {
    setThemePreset('modern');
  };

  return (
    <div>
      <button onClick={toggleTheme}>
        Tema Değiştir ({colorMode})
      </button>
      <button onClick={customizeTheme}>
        Teal Teması Uygula
      </button>
      <button onClick={changeToModernTheme}>
        Modern Tema Uygula
      </button>
      <div style={{ height: headerHeight }}>Header</div>
    </div>
  );
};
```

## Özelleştirilebilir Tema Değişkenleri

MoonUI'ın tema sistemi aşağıdaki değişkenleri destekler:

### Hazır Tema Şablonları (Presets)

MoonUI, hızlı tema uygulaması için önceden tanımlanmış şablonlar sunar:

```typescript
type ThemePreset = 'default' | 'modern' | 'rounded' | 'minimal';
```

- **default**: MoonUI'ın standart teması
- **modern**: Daha canlı renkler ve daha yuvarlak köşeler
- **rounded**: Tüm bileşenler için çok yuvarlak köşeler 
- **minimal**: Minimal, düz ve profesyonel görünüm

### Özel Değişkenler (Extensions)

Kendi özel CSS değişkenlerinizi eklemek için `extensions` özelliğini kullanabilirsiniz:

```typescript
extensions?: Record<string, Record<string, string> | string>;
```

Örneğin:

```tsx
<ThemeProvider
  extensions={{
    layout: {
      headerHeight: '60px',
      sidebarWidth: '280px',
      contentMaxWidth: '1200px'
    },
    animation: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    customColor: '#ff5500' // Doğrudan string değer de kullanılabilir
  }}
>
```

Bu değişkenler CSS'te şu şekilde erişilebilir olacaktır:

```css
:root {
  --layout-headerHeight: 60px;
  --layout-sidebarWidth: 280px;
  --layout-contentMaxWidth: 1200px;
  --animation-duration: 300ms;
  --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --customColor: #ff5500;
}
```

### Renkler

```typescript
colors: {
  primary: string;      // Ana vurgu rengi
  secondary: string;    // İkincil vurgu rengi
  success: string;      // Başarılı işlemler için renk
  warning: string;      // Uyarılar için renk
  error: string;        // Hata ve tehlikeli işlemler için renk
  background: string;   // Sayfa arkaplan rengi
  foreground: string;   // Ana metin rengi
  card: string;         // Kart arkaplan rengi
  cardForeground: string; // Kart metin rengi
  border: string;       // Kenarlık rengi
  muted: string;        // Pasif elementlerin arkaplan rengi
  mutedForeground: string; // Pasif metin rengi
  accent: string;       // Vurgu arkaplan rengi
  accentForeground: string; // Vurgu metin rengi
}
```

### Köşe Yuvarlama

```typescript
borderRadius: {
  sm: string;   // Küçük köşe yuvarlama (ör: '0.25rem')
  md: string;   // Orta köşe yuvarlama (ör: '0.375rem')
  lg: string;   // Büyük köşe yuvarlama (ör: '0.5rem')
  full: string; // Tam yuvarlak (ör: '9999px')
}
```

### Yazı Boyutları

```typescript
fontSizes: {
  xs: string;    // Çok küçük metin (ör: '0.75rem')
  sm: string;    // Küçük metin (ör: '0.875rem')
  base: string;  // Temel metin (ör: '1rem')
  lg: string;    // Büyük metin (ör: '1.125rem')
  xl: string;    // Çok büyük metin (ör: '1.25rem')
  '2xl': string; // 2x büyük metin (ör: '1.5rem')
  '3xl': string; // 3x büyük metin (ör: '1.875rem')
}
```

### Boşluklar

```typescript
spacing: {
  1: string;   // Çok küçük boşluk (ör: '0.25rem')
  2: string;   // Küçük boşluk (ör: '0.5rem')
  4: string;   // Orta boşluk (ör: '1rem')
  6: string;   // Büyük boşluk (ör: '1.5rem')
  8: string;   // Çok büyük boşluk (ör: '2rem')
}
```

## Tailwind CSS ile Kullanım

MoonUI tema değişkenleri, Tailwind CSS ile birlikte kullanılabilir. Tailwind config dosyanızı şu şekilde güncelleyin:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        // Diğer renk değişkenleri...
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
    },
  },
};
```

## Tema İçeriğini JSON Olarak Dışa Aktarma

Tema konfigürasyonunuzu JSON olarak dışa aktarmak istiyorsanız:

```tsx
import { useTheme, createCssVariables } from '@moontra/moonui';

const ExportTheme = () => {
  const { theme } = useTheme();
  
  const exportThemeToJson = () => {
    const jsonContent = JSON.stringify(theme, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // JSON dosyasını indirme
    const link = document.createElement('a');
    link.href = url;
    link.download = 'moonui-theme.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={exportThemeToJson}>
      Temayı JSON Olarak İndir
    </button>
  );
};
```

## Örnek Kullanım Senaryoları

### 1. Marka Renk Şeması Uygulama

```tsx
<ThemeProvider
  lightTheme={{
    colors: {
      primary: '#0052CC',     // Mavi marka rengi
      secondary: '#FF5630',   // Turuncu vurgu rengi
      success: '#36B37E',     // Yeşil başarı rengi
      warning: '#FFAB00',     // Sarı uyarı rengi
      error: '#FF5630',       // Kırmızı hata rengi
    }
  }}
>
  <App />
</ThemeProvider>
```

### 2. Özel Yuvarlaklık Değerleri

```tsx
<ThemeProvider
  lightTheme={{
    borderRadius: {
      sm: '2px',      // Minimal yuvarlaklık
      md: '4px',      // Standart yuvarlaklık
      lg: '8px',      // Büyük yuvarlaklık
      full: '9999px', // Tam yuvarlak
    }
  }}
>
  <App />
</ThemeProvider>
```

### 3. Tamamen Düz Tasarım

```tsx
<ThemeProvider
  lightTheme={{
    borderRadius: {
      sm: '0',
      md: '0',
      lg: '0',
      full: '0',
    },
    colors: {
      // Diğer renk ayarları...
      border: 'transparent', // Kenarlıkları kaldır
    }
  }}
>
  <App />
</ThemeProvider>
```

## Bileşen Örnekleri

### Alert Bileşeni

```tsx
// Tema ile entegre Alert kullanımı
import { Alert, AlertTitle, AlertDescription } from "@moontra/moonui";

export default function AlertExample() {
  return (
    <div className="space-y-4">
      <Alert variant="default">
        <AlertTitle>Bilgilendirme</AlertTitle>
        <AlertDescription>
          Bu bir standart bilgilendirme mesajıdır.
        </AlertDescription>
      </Alert>
      
      <Alert variant="primary">
        <AlertTitle>Dikkat</AlertTitle>
        <AlertDescription>
          Önemli bir bildirim mesajı.
        </AlertDescription>
      </Alert>
      
      <Alert variant="success">
        <AlertTitle>Başarılı</AlertTitle>
        <AlertDescription>
          İşleminiz başarıyla tamamlandı.
        </AlertDescription>
      </Alert>
      
      <Alert variant="warning">
        <AlertTitle>Uyarı</AlertTitle>
        <AlertDescription>
          Dikkatli olmanızı gerektiren bir durum var.
        </AlertDescription>
      </Alert>
      
      <Alert variant="error">
        <AlertTitle>Hata</AlertTitle>
        <AlertDescription>
          İşlem sırasında bir hata oluştu.
        </AlertDescription>
      </Alert>
    </div>
  );
}
```

### Toast Bildirimleri

```tsx
// Tema ile entegre Toast kullanımı
import { useToast } from "@moontra/moonui";

export default function ToastExample() {
  const { add } = useToast();
  
  const showSuccess = () => {
    add({
      variant: "success", 
      title: "Başarılı", 
      description: "İşleminiz başarıyla tamamlandı."
    });
  };
  
  const showError = () => {
    add({
      variant: "error", 
      title: "Hata", 
      description: "İşlem sırasında bir hata oluştu.",
      showProgress: true,
      duration: 5000
    });
  };
  
  return (
    <div className="space-x-2">
      <button onClick={showSuccess}>Başarı Bildirimi</button>
      <button onClick={showError}>Hata Bildirimi</button>
    </div>
  );
}
```

### Tooltip Kullanımı

```tsx
// Tema ile entegre Tooltip kullanımı
import { Tooltip, Button } from "@moontra/moonui";

export default function TooltipExample() {
  return (
    <div className="flex space-x-4">
      <Tooltip content="Bu bir ipucu metnidir">
        <Button>Butonun Üzerine Gel</Button>
      </Tooltip>
      
      <Tooltip 
        content="Özel stillendirilmiş ipucu"
        variant="primary"
        size="lg"
        radius="lg"
      >
        <Button variant="outline">Özel Tooltip</Button>
      </Tooltip>
    </div>
  );
}
```

### Checkbox ve Radio Butonları

```tsx
// Tema ile entegre Checkbox ve Radio kullanımı
import { 
  Checkbox, 
  CheckboxWithLabel, 
  RadioGroup,
  RadioItemWithLabel 
} from "@moontra/moonui";

export default function FormElementsExample() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <CheckboxWithLabel 
          label="Beni hatırla"
          variant="default" 
          size="md"
        />
        
        <CheckboxWithLabel 
          label="E-posta bildirimleri al"
          variant="outline"
          indeterminate
        />
      </div>
      
      <RadioGroup defaultValue="apple">
        <RadioItemWithLabel 
          value="apple" 
          label="Apple"
          variant="filled"  
        />
        <RadioItemWithLabel 
          value="banana" 
          label="Banana" 
        />
        <RadioItemWithLabel 
          value="orange" 
          label="Orange"
          disabled 
        />
      </RadioGroup>
    </div>
  );
}
```

### Progress (İlerleme) Bileşeni

```tsx
// Tema ile entegre Progress kullanımı
import { Progress } from "@moontra/moonui";

export default function ProgressExample() {
  return (
    <div className="space-y-6">
      <Progress value={30} variant="primary" showValueLabel />
      
      <Progress 
        value={65} 
        variant="success" 
        size="lg" 
        radius="sm" 
        showValueLabel 
        valueLabel="65/100 tamamlandı"
      />
      
      <Progress 
        value={45} 
        variant="warning" 
        animation="smooth" 
        showValueLabel 
      />
      
      <Progress 
        indeterminate 
        variant="primary" 
        size="md" 
        radius="full" 
      />
    </div>
  );
}
```

### Skeleton (İskelet) Bileşenleri

```tsx
// Tema ile entegre Skeleton kullanımı
import { 
  Skeleton, 
  SkeletonText, 
  SkeletonAvatar, 
  SkeletonCard 
} from "@moontra/moonui";

export default function SkeletonExample() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  // 3 saniye sonra içeriğin yüklenmiş gibi simüle et
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="space-y-8">
      {/* Basit bir iskelet */}
      <div className="space-y-2">
        <h3>Basit İskelet</h3>
        <div className="flex items-center gap-4">
          <SkeletonAvatar size="3rem" />
          <div className="flex-1">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </div>
      
      {/* Metin iskeleti */}
      <div className="space-y-2">
        <h3>Metin İskeleti</h3>
        <SkeletonText 
          lines={4} 
          variant="primary" 
          animation="pulse" 
          randomWidths 
        />
      </div>
      
      {/* İçerik yükleme & değiştirme */}
      <div className="space-y-2">
        <h3>İçerik Yükleme</h3>
        <Skeleton 
          isLoaded={isLoaded} 
          className="h-20 w-full"
        >
          <div className="h-20 w-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
            İçerik Yüklendi!
          </div>
        </Skeleton>
      </div>
      
      {/* Kart iskeleti */}
      <div className="space-y-2">
        <h3>Kart İskeleti</h3>
        <SkeletonCard 
          contentLines={3} 
          variant="accent"
          animation="wave" 
        />
      </div>
    </div>
  );
}
```

### Popover (Açılır Kutu) Bileşeni

```tsx
// Tema ile entegre Popover kullanımı
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  PopoverHeader,
  PopoverFooter,
  PopoverSeparator
} from "@moontra/moonui";
import { Button } from "@moontra/moonui";

export default function PopoverExample() {
  return (
    <div className="flex gap-8 flex-wrap">
      {/* Basit Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button>Temel Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <h3 className="font-medium mb-2">Popover Başlığı</h3>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Bu içerik temayla tam entegre bir popover içeriğidir.
          </p>
        </PopoverContent>
      </Popover>
      
      {/* Varyantlı Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Varyantlar ve Başlık</Button>
        </PopoverTrigger>
        <PopoverContent variant="outline" size="lg" radius="lg" shadow="lg">
          <PopoverHeader>
            <h3 className="font-medium">Ayarlar</h3>
            <p className="text-xs text-[var(--color-muted-foreground)]">
              Tercihlerinizi ayarlayın
            </p>
          </PopoverHeader>
          <div className="py-2">
            <div className="flex items-center justify-between py-1">
              <span className="text-sm">Bildirimler</span>
              <Button size="sm" variant="ghost">Aç</Button>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm">Otomatik kaydedici</span>
              <Button size="sm" variant="ghost">Kapat</Button>
            </div>
          </div>
          <PopoverSeparator />
          <div className="py-2">
            <p className="text-sm text-[var(--color-muted-foreground)]">
              Önemli bilgiler burada görüntülenebilir.
            </p>
          </div>
          <PopoverFooter className="flex justify-between">
            <Button size="sm" variant="ghost">Sıfırla</Button>
            <Button size="sm" variant="primary">Uygula</Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
      
      {/* Varyantlı Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="destructive">Uyarı Popover</Button>
        </PopoverTrigger>
        <PopoverContent variant="destructive" backdrop={true}>
          <h3 className="font-medium mb-2">İşlemi Onaylıyor musunuz?</h3>
          <p className="text-sm mb-4">
            Bu işlem geri alınamaz ve tüm verileri silecektir.
          </p>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="ghost">İptal</Button>
            <Button size="sm" variant="destructive">Sil</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
```

### Breadcrumb (Gezinti Yolu) Bileşeni

```tsx
// Tema ile entegre Breadcrumb kullanımı
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbSeparator,
  BreadcrumbEllipsis 
} from "@moontra/moonui";

export default function BreadcrumbExample() {
  return (
    <div className="space-y-6">
      {/* Basit Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem href="/">
            Ana Sayfa
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href="/urunler">
            Ürünler
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href="/urunler/teknoloji">
            Teknoloji
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem isCurrent>
            Akıllı Telefonlar
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      {/* Varyantlı Breadcrumb */}
      <Breadcrumb variant="primary" size="md">
        <BreadcrumbList>
          <BreadcrumbItem href="/">
            Dashboard
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href="/projeler">
            Projeler
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem isCurrent>
            MoonUI Projesi
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      {/* Daraltılmış Breadcrumb */}
      <Breadcrumb variant="ghost">
        <BreadcrumbList collapsed>
          <BreadcrumbItem href="/">
            Ana Sayfa
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href="/kategoriler">
            Kategoriler
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href="/kategoriler/elektronik">
            Elektronik
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href="/kategoriler/elektronik/bilgisayar">
            Bilgisayarlar
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href="/kategoriler/elektronik/bilgisayar/dizustu">
            Dizüstü Bilgisayarlar
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem isCurrent>
            Gaming Laptop Modelleri
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
```

### Accordion (Akordiyon) Bileşeni

```tsx
// Tema ile entegre Accordion kullanımı
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@moontra/moonui";

export default function AccordionExample() {
  return (
    <div className="space-y-8">
      {/* Basit Accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Sık Sorulan Soru #1</AccordionTrigger>
          <AccordionContent>
            MoonUI, tamamen özelleştirilebilir, modern ve erişilebilir bir React 
            bileşen kütüphanesidir. Tema sistemi ile kolaylıkla markanıza 
            uygun hale getirebilirsiniz.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Sık Sorulan Soru #2</AccordionTrigger>
          <AccordionContent>
            MoonUI'yi npm veya yarn kullanarak projenize ekleyebilirsiniz. 
            Kurulum sonrası ThemeProvider ile projenizi sarmalamanız yeterlidir.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Sık Sorulan Soru #3</AccordionTrigger>
          <AccordionContent>
            MoonUI, tüm bileşenleri için tam tema desteği sunar. Renkler, boyutlar, 
            gölgeler, yarıçaplar ve daha fazlasını özelleştirebilirsiniz.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Varyantlı ve Boyutlu Accordion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Accordion type="multiple">
          <AccordionItem variant="outline" value="item-1">
            <AccordionTrigger variant="outline" size="md">
              Özellikler
            </AccordionTrigger>
            <AccordionContent variant="outline">
              <ul className="list-disc pl-5 space-y-1">
                <li>Tam tema desteği</li>
                <li>100+ bileşen</li>
                <li>Türkçe dökümantasyon</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem variant="outline" value="item-2">
            <AccordionTrigger variant="outline" size="md">
              Tarayıcı Desteği
            </AccordionTrigger>
            <AccordionContent variant="outline">
              MoonUI, tüm modern tarayıcıları destekler: Chrome, Firefox, 
              Safari, Edge ve Opera.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Accordion type="single" collapsible>
          <AccordionItem variant="card" value="item-1">
            <AccordionTrigger variant="ghost" size="sm">
              Özelleştirme
            </AccordionTrigger>
            <AccordionContent size="sm">
              Tema değişkenlerini kullanarak tüm bileşenlerin görünümünü 
              markanıza uygun şekilde değiştirebilirsiniz.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem variant="card" value="item-2">
            <AccordionTrigger variant="ghost" size="sm">
              Erişilebilirlik
            </AccordionTrigger>
            <AccordionContent size="sm">
              Tüm bileşenler WCAG standartlarına uygun olarak geliştirilmiştir 
              ve ekran okuyucularda sorunsuz çalışır.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem variant="card" value="item-3">
            <AccordionTrigger variant="ghost" size="sm">
              Performans
            </AccordionTrigger>
            <AccordionContent size="sm">
              MoonUI, yüksek performans için optimize edilmiştir ve 
              bundle size minimuma indirgenmiştir.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
```

### Collapsible (Daraltılabilir) Bileşeni

```tsx
// Tema ile entegre Collapsible kullanımı
import { 
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@moontra/moonui";

export default function CollapsibleExample() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const [isOpen3, setIsOpen3] = React.useState(false);
  
  return (
    <div className="space-y-8">
      {/* Temel Collapsible */}
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="max-w-lg mx-auto"
      >
        <CollapsibleTrigger>
          Detayları Göster/Gizle
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>
            MoonUI, modern web uygulamaları geliştirmek için gerekli tüm bileşenleri 
            içeren kapsamlı bir React kütüphanesidir. Tüm bileşenler tema sistemi ile 
            tamamen özelleştirilebilir.
          </p>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Varyantlı ve Boyutlu Collapsible */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Collapsible open={isOpen2} onOpenChange={setIsOpen2}>
          <CollapsibleTrigger variant="outline" size="md" className="w-full">
            Teknik Özellikler
          </CollapsibleTrigger>
          <CollapsibleContent variant="outline">
            <ul className="list-disc pl-5 space-y-2">
              <li>React 18+ desteği</li>
              <li>TypeScript ile tam tip güvenliği</li>
              <li>Tailwind CSS entegrasyonu</li>
              <li>Tema değişkenleri ile özelleştirme</li>
              <li>100+ bileşen</li>
            </ul>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible open={isOpen3} onOpenChange={setIsOpen3}>
          <CollapsibleTrigger variant="ghost" size="sm" className="w-full">
            Kurulum ve Kullanım
          </CollapsibleTrigger>
          <CollapsibleContent variant="ghost" size="sm">
            <div className="bg-[var(--color-muted)]/10 p-3 rounded text-[var(--font-size-sm)] font-mono">
              npm install @moontra/moonui
            </div>
            <p className="mt-2 mb-2">
              Kurulumdan sonra ThemeProvider ile projenizi sarmalayın ve bileşenleri 
              kullanmaya başlayın.
            </p>
            <div className="bg-[var(--color-muted)]/10 p-3 rounded text-[var(--font-size-sm)] font-mono">
              {`import { ThemeProvider } from '@moontra/moonui';`}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
```

### Aspect Ratio (En-Boy Oranı) Bileşeni

```tsx
// Tema ile entegre Aspect Ratio kullanımı
import { AspectRatio } from "@moontra/moonui";
import Image from "next/image";

export default function AspectRatioExample() {
  return (
    <div className="space-y-8">
      {/* Temel En-Boy Oranı (16:9) */}
      <div className="max-w-md mx-auto">
        <h3 className="text-[var(--font-size-lg)] font-medium mb-2">Video Formatı (16:9)</h3>
        <AspectRatio ratio={16 / 9} className="bg-[var(--color-muted)]/20">
          <div className="flex items-center justify-center h-full">
            <p className="text-[var(--color-muted-foreground)]">
              16:9 en-boy oranı (video formatı)
            </p>
          </div>
        </AspectRatio>
      </div>
      
      {/* Çeşitli En-Boy Oranları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kare Format (1:1) */}
        <div>
          <h4 className="text-[var(--font-size-sm)] font-medium mb-2">Kare Format (1:1)</h4>
          <AspectRatio 
            ratio={1 / 1} 
            variant="outline"
            radius="md"
          >
            <div className="flex items-center justify-center h-full">
              <p className="text-[var(--color-muted-foreground)] text-center text-[var(--font-size-sm)]">
                1:1 Oranı
              </p>
            </div>
          </AspectRatio>
        </div>
        
        {/* Instagram Format (4:5) */}
        <div>
          <h4 className="text-[var(--font-size-sm)] font-medium mb-2">Instagram (4:5)</h4>
          <AspectRatio 
            ratio={4 / 5} 
            variant="card"
            radius="lg"
          >
            <div className="flex items-center justify-center h-full">
              <p className="text-[var(--color-muted-foreground)] text-center text-[var(--font-size-sm)]">
                4:5 Oranı
              </p>
            </div>
          </AspectRatio>
        </div>
        
        {/* Klasik Format (4:3) */}
        <div>
          <h4 className="text-[var(--font-size-sm)] font-medium mb-2">Klasik (4:3)</h4>
          <AspectRatio 
            ratio={4 / 3} 
            variant="ghost"
            radius="sm"
            className="bg-[var(--color-primary)]/5"
          >
            <div className="flex items-center justify-center h-full">
              <p className="text-[var(--color-muted-foreground)] text-center text-[var(--font-size-sm)]">
                4:3 Oranı
              </p>
            </div>
          </AspectRatio>
        </div>
      </div>
      
      {/* Resim Örneği */}
      <div className="max-w-sm mx-auto">
        <h4 className="text-[var(--font-size-md)] font-medium mb-2">Resim İçerik Örneği</h4>
        <AspectRatio ratio={3 / 2} className="bg-[var(--color-card)] rounded-[var(--radius-lg)] overflow-hidden">
          <div className="relative h-full w-full">
            {/* Next.js Image komponenti veya normal img kullanılabilir */}
            <img 
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Örnek görsel"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <p className="text-white font-medium">
                MoonUI ile responsive görsel oranı
              </p>
            </div>
          </div>
        </AspectRatio>
      </div>
    </div>
  );
}
```

### Command (Komut Paleti) Bileşeni

```tsx
// Tema ile entegre Command kullanımı
import { 
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut
} from "@moontra/moonui";
import { useState } from "react";

export default function CommandExample() {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      {/* Temel Komut Paleti */}
      <div className="rounded-md border border-[var(--color-border)]">
        <Command>
          <CommandInput placeholder="Arama yapın..." />
          <CommandList>
            <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
            <CommandGroup heading="Öneriler">
              <CommandItem>
                <span>Ana Sayfa</span>
                <CommandShortcut>⌘H</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Ayarlar</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <span>Profil</span>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Diğer">
              <CommandItem variant="destructive">
                <span>Çıkış Yap</span>
              </CommandItem>
              <CommandItem variant="subtle" disabled>
                <span>Yardım</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      
      {/* Modal Dialog olarak Komut Paleti */}
      <div>
        <h3 className="text-[var(--font-size-lg)] font-medium mb-2">Dialog Olarak</h3>
        <p className="text-[var(--color-muted-foreground)] mb-4">
          Komut paletini herhangi bir yerde açabilir ve klavye kontrolü ekleyebilirsiniz.
        </p>
        
        <button 
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)]"
        >
          Komut Paletini Aç (⌘K)
        </button>
        
        <CommandDialog open={open} onOpenChange={setOpen} commandClassName="bg-[var(--color-card)]">
          <CommandInput placeholder="Komut arayın..." />
          <CommandList>
            <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
            <CommandGroup heading="Sayfalar">
              <CommandItem onSelect={() => {alert('Ana sayfa seçildi!'); setOpen(false);}}>
                <span>Ana Sayfa</span>
              </CommandItem>
              <CommandItem>
                <span>Belgeler</span>
              </CommandItem>
              <CommandItem>
                <span>Bileşenler</span>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Tema">
              <CommandItem>
                <span>Açık Tema</span>
              </CommandItem>
              <CommandItem>
                <span>Koyu Tema</span>
              </CommandItem>
              <CommandItem>
                <span>Sistem</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </div>
  );
}
```

## İpuçları ve En İyi Uygulamalar

1. **Renk Sistematiği**: HSL renk formatını kullanarak (örn. 'hsl(210, 100%, 50%)') renkleri daha sistematik olarak düzenleyebilirsiniz.

2. **A11y Uyumluluğu**: Özelleştirilmiş renkler seçerken kontrast oranlarının WCAG 2.1 AA standardını (minimum 4.5:1) karşıladığından emin olun.

3. **Dark Mode Geçişi**: Dark mode ve light mode arasında geçiş yaparken ani değişiklikler yerine yumuşak geçişler için `transition` özelliğini kullanın:

```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

4. **Hazır Tema Kullanımı**: Uygulamanızın genel görünümünü hızlıca değiştirmek için hazır tema şablonlarını kullanın:

```tsx
// Başlangıçta bir şablon belirtin
<ThemeProvider preset="modern">

// Veya çalışma zamanında değiştirin
const { setThemePreset } = useTheme();
setThemePreset('rounded');
```

5. **Özel Değişkenleri Organize Etme**: Özel değişkenlerinizi mantıksal gruplar halinde organize edin:

```tsx
extensions={{
  layout: { ... },  // Düzen ile ilgili değişkenler
  typography: { ... }, // Tipografi ile ilgili değişkenler
  animation: { ... }, // Animasyon ile ilgili değişkenler
}}
```

6. **Performans**: Tema değişikliklerinin performansını artırmak için, sık değişen değerler için CSS değişkenlerini kullanın ve yeniden-render'ı minimize edin.
