import ConvexClientProvider from '@/components/provider/convex-client-provider';
import { cn } from '@/utils/cn';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChatPulse',
  description: 'All your answers in one place.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' data-theme='light'>
      <body className={cn(inter.className, 'antialiased flex h-screen w-screen')}>
        <ClerkProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
