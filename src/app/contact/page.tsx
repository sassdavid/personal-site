import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import ContactIcons from '@/components/contact/ContactIcons';
import Main from '@/components/main';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact David Sass via email @ david.sass14@gmail.com',
};

const Contact = () => (
  <Main>
    <article className="post" id="contact">
      <header>
        <div className="title">
          <h2>
            <Link href="/contact">Contact</Link>
          </h2>
        </div>
      </header>
      <div className="email-at">
        <p>Feel free to get in touch. You can email me at: </p>
        <p>
          <a href="mailto:david.sass14@gmail.com">david.sass14@gmail.com</a>
        </p>
      </div>
      <ContactIcons />
    </article>
  </Main>
);

export default Contact;
