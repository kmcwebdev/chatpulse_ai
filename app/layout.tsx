import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ReactQueryClientProvider from './ReactQueryClientProvider';
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
		<ClerkProvider>
			<ReactQueryClientProvider>
				<html lang='en' data-theme='light'>
					<body className={`${inter.className} antialiased flex h-screen w-screen`}>
					{ children }	
					</body>
				</html>
			</ReactQueryClientProvider>
		</ClerkProvider>
  );
}
