import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block rotate-[-1deg] transition-transform hover:rotate-0 hover:-translate-y-2">
      <div className="rounded-[2rem] border-4 border-[#39251b] bg-white p-3 shadow-[8px_8px_0_#39251b]">
        <div className="aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-[#f7d66b]">
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ee5b3e]">{project.category}</p>
          <h3 className="mt-1 font-serif text-2xl font-black text-[#39251b]">{project.title}</h3>
        </div>
      </div>
    </Link>
  );
}
