import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mohamed Ahmed | Video Editor & Color Grading Artist',
  description: 'Cinematic portfolio experience for Mohamed Ahmed.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
