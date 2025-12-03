import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about David Sass-Kovacs',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
