// Toast hook - şimdilik basit bir implementasyon
// Gerçek implementasyonda Toaster component'i ile entegre olacak

interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function toast(options: ToastOptions) {
  // Şimdilik console'a yazdıralım
  // Gerçek implementasyonda toast notification gösterilecek
  console.log('Toast:', options);
  
  // Browser'da alert gösterelim (geçici çözüm)
  if (typeof window !== 'undefined') {
    const message = options.description 
      ? `${options.title}\n\n${options.description}`
      : options.title;
    
    // Variant'a göre stil belirle
    if (options.variant === 'destructive') {
      console.error(message);
    } else {
      console.log(message);
    }
  }
}

export const useToast = () => {
  return { toast };
};