import { ThemeProvider } from '@/components/theme-provider';
import { IconProvider } from '@/lib/icons/IconProvider';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <IconProvider>
            {children}
          </IconProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}