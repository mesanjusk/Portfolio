import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProfile, fetchProjects } from '../api/client.js';
import ProjectCard from '../components/ProjectCard.jsx';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchProfile(), fetchProjects({ featured: 'true' })])
      .then(([profileData, projects]) => {
        setProfile(profileData);
        setFeatured(projects);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm uppercase tracking-widest text-stone-500">
          {profile?.tagline || 'Design Portfolio'}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
          {profile?.name || 'Your Name'}
        </h1>
        <p className="mt-6 max-w-2xl text-stone-600">
          {profile?.bio ||
            'A collection of fashion and textile design projects exploring craft, sustainability, and form.'}
        </p>
        <Link
          to="/projects"
          className="mt-8 inline-block border border-stone-900 px-6 py-3 text-sm font-medium transition-colors hover:bg-stone-900 hover:text-stone-50"
        >
          View Projects
        </Link>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-8 font-serif text-2xl font-semibold">Featured Work</h2>
        {error && <p className="text-red-600">{error}</p>}
        {!error && featured.length === 0 && (
          <p className="text-stone-500">
            No featured projects yet. Run the seed script and refresh.
          </p>
        )}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
