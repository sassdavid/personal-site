import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';

import profile from './profile.json';

export type ContactId =
  | 'linkedin'
  | 'github'
  | 'x'
  | 'instagram'
  | 'facebook'
  | 'email';

export interface ContactItem {
  id: ContactId;
  link: string;
  label: string;
  icon: IconDefinition;
}

const data: ContactItem[] = [
  {
    id: 'linkedin',
    link: 'https://www.linkedin.com/in/sassd',
    label: 'LinkedIn',
    icon: faLinkedinIn,
  },
  {
    id: 'github',
    link: 'https://github.com/sassdavid',
    label: 'GitHub',
    icon: faGithub,
  },
  {
    id: 'x',
    link: 'https://x.com/sassdavid14',
    label: 'X',
    icon: faTwitter,
  },
  {
    id: 'instagram',
    link: 'https://www.instagram.com/sdaviid',
    label: 'Instagram',
    icon: faInstagram,
  },
  {
    id: 'facebook',
    link: 'https://facebook.com/sass.david',
    label: 'Facebook',
    icon: faFacebookF,
  },
  {
    id: 'email',
    // One public address, shared with the contact CTA and JSON-LD.
    link: `mailto:${profile.email}`,
    label: 'Email',
    icon: faEnvelope,
  },
];

export default data;
