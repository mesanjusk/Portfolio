import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProject } from '../api/client.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setProject(null);
    setError(null);
    fetchProject(slug)
      .then(setProject)
      .catch((err) => setError(err.message));
  }, [slug]);

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-red-600">{error}</p>
        <Link to="/projects" className="mt-4 inline-block text-stone-600 underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  if (!project) {
    return <div className="mx-auto max-w-5xl px-6 py-16 text-stone-500">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link to="/projects" className="text-sm text-stone-500 hover:text-stone-900">
        &larr; Back to Projects
      </Link>

      <p className="mt-6 text-xs uppercase tracking-wide text-stone-500">
        {project.category} &middot; {project.year}
      </p>
      <h1 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-stone-600">{project.summary}</p>

      <div className="mt-10 aspect-[4/3] overflow-hidden bg-stone-200 sm:aspect-[16/9]">
        <img
          src={project.coverImage}
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-10 grid gap-10 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <h2 className="font-serif text-xl font-semibold">About the Project</h2>
          <p className="mt-3 whitespace-pre-line text-stone-600">{project.description}</p>
        </div>
        <div>
          <h2 className="font-serif text-xl font-semibold">Tools & Techniques</h2>
          <ul className="mt-3 space-y-1 text-stone-600">
            {project.tools?.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </div>

      {project.images?.length > 1 && (
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {project.images.slice(1).map((img) => (
            <div key={img} className="aspect-[4/3] overflow-hidden bg-stone-200">
              <img src={img} alt={project.title} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
