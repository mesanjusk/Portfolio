import { useEffect, useMemo, useState } from 'react';
import { fetchProjects } from '../api/client.js';
import ProjectCard from '../components/ProjectCard.jsx';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState('All');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch((err) => setError(err.message));
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set(projects.map((p) => p.category))],
    [projects]
  );

  const filtered =
    category === 'All' ? projects : projects.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-[#fff7cf] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-[#39251b] bg-[#f9a51a] p-8 shadow-[10px_10px_0_#39251b]">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#7ac7c4]" />
          <div className="absolute -bottom-12 right-32 h-28 w-28 rounded-full bg-[#ee5b3e]" />
          <p className="relative font-black uppercase tracking-[0.3em] text-white">Portfolio gallery</p>
          <h1 className="relative mt-3 font-serif text-5xl font-black text-[#39251b]">Projects</h1>
          <p className="relative mt-4 max-w-2xl text-lg font-medium text-[#6b4a2d]">
            Explore a curated, editable collection of fashion, textile, and design work.
          </p>
        </div>

        {error && <p className="mt-6 rounded-2xl bg-red-50 p-4 text-red-600">{error}</p>}

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full border-2 border-[#39251b] px-5 py-2 text-sm font-black uppercase tracking-wide shadow-[4px_4px_0_#39251b] transition-transform hover:-translate-y-1 ${
                category === cat
                  ? 'bg-[#ee5b3e] text-white'
                  : 'bg-white text-[#39251b]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        {!error && filtered.length === 0 && (
          <p className="mt-10 rounded-2xl border-2 border-dashed border-[#39251b] bg-white p-6 text-[#6b4a2d]">
            No projects found. Admin can add one from the dashboard.
          </p>
        )}
      </div>
    </div>
  );
}
