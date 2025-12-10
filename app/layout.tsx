import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Age Calculator Pro - Calculate Your Age Precisely',
  description: 'Advanced age calculator with beautiful UI. Calculate your exact age in years, months, days, hours, minutes, and seconds. Discover fun facts about your birth date.',
  keywords: 'age calculator, calculate age, birth date calculator, age in days, age in hours',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
