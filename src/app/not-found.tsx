import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 Not Found',
  description: 'The content you are looking for cannot be found.',
};

const NotFoundPage = () => (
  <>
    <div className="not-found">
      <h1>David Not Found</h1>
      <p>
        :) Go back and find me <Link href="/">here</Link>.
      </p>
    </div>
  </>
);

export default NotFoundPage;
