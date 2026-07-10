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
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-serif text-3xl font-semibold">Projects</h1>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      <div className="mt-6 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`border px-4 py-1.5 text-sm transition-colors ${
              category === cat
                ? 'border-stone-900 bg-stone-900 text-stone-50'
                : 'border-stone-300 text-stone-600 hover:border-stone-900'
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
        <p className="mt-10 text-stone-500">No projects found.</p>
      )}
    </div>
  );
}
