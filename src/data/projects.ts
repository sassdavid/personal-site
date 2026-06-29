export interface Project {
  title: string;
  subtitle?: string;
  link?: string;
  image: string;
  date: string;
  desc: string;
  tech?: string[];
  featured?: boolean;
}

// Archive of projects/experiments rendered on /projects. Empty for now — add
// entries here (and drop images under public/images/projects/) to populate the
// archive. `featured: true` surfaces an item in the "Featured" group.
const data: Project[] = [];

export default data;
