import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden bg-stone-200">
        <img
          src={project.coverImage}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-3">
        <p className="text-xs uppercase tracking-wide text-stone-500">{project.category}</p>
        <h3 className="font-serif text-lg font-medium">{project.title}</h3>
      </div>
    </Link>
  );
}
