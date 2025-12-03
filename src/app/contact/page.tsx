import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import PageWrapper from '@/app/components/PageWrapper';
import ContactIcons from '@/components/contact/ContactIcons';
import EmailLink from '@/components/contact/EmailLink';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact David Sass-Kovacs via email @ david.sass14@gmail.com',
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <article className="post" id="contact">
        <header>
          <div className="title">
            <h2>
              <Link href="/contact">Contact</Link>
            </h2>
          </div>
        </header>
        <div className="email-at">
          <p>Feel free to get in touch. You can email me at:</p>
          <EmailLink />
        </div>
        <ContactIcons />
      </article>
    </PageWrapper>
  );
}
