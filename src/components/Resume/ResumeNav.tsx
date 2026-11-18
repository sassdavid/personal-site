'use client';

import SectionNav from '@/components/Template/SectionNav';

const sections = [
  { title: 'Experience', id: 'experience' },
  { title: 'Education', id: 'education' },
  { title: 'Skills', id: 'skills' },
  { title: 'Tools', id: 'tools' },
] as const;

export default function ResumeNav() {
  return (
    <SectionNav
      label="Resume sections"
      className="resume-nav"
      sections={sections}
    />
  );
}
