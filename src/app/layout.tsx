import { RootProvider } from 'fumadocs-ui/provider/next';
import 'katex/dist/katex.min.css';
import './global.css';
import { Geist, JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('attic-font-size')||'md';document.documentElement.dataset.fontSize=s;var l=localStorage.getItem('attic-line-height')||'normal';document.documentElement.dataset.lineHeight=l;}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
