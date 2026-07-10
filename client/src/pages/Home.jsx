import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProfile, fetchProjects } from '../api/client.js';
import ProjectCard from '../components/ProjectCard.jsx';

const defaultStats = [
  ['25+', 'Projects stitched'],
  ['12', 'Craft stories'],
  ['4', 'Design domains'],
];

const defaultPromises = [
  { icon: '✂️', title: 'Affordable' },
  { icon: '🎨', title: 'Accessible' },
  { icon: '✨', title: 'Achievable' },
];

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

  const displayName = profile?.name || 'Your Name';
  const home = profile?.home || {};
  const stats = home.stats?.length ? home.stats : defaultStats.map(([value, label]) => ({ value, label }));
  const promises = home.promises?.length ? home.promises : defaultPromises;

  return (
    <div className="overflow-hidden bg-[#fff7cf]">
      <section className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div className="absolute left-4 top-12 hidden h-24 w-24 rounded-full border-4 border-dashed border-[#f06b4f]/50 md:block" />
        <div className="relative z-10">
          <p className="inline-flex rotate-[-2deg] rounded-full bg-[#f9a51a] px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#39251b] shadow-[4px_4px_0_#39251b]">
            {profile?.tagline || 'Design Portfolio'}
          </p>
          <h1 className="mt-8 max-w-3xl font-serif text-5xl font-black leading-[0.95] text-[#39251b] sm:text-7xl">
            {home.heroTitle || `Unleash the designer within with ${displayName}.`}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6b4a2d]">
            {profile?.bio ||
              'A joyful collection of fashion and textile projects exploring craft, sustainability, color, and form.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="rounded-full border-2 border-[#39251b] bg-[#ee5b3e] px-7 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[5px_5px_0_#39251b] transition-transform hover:-translate-y-1"
            >
              View Projects
            </Link>
            <Link
              to="/about"
              className="rounded-full border-2 border-[#39251b] bg-white px-7 py-3 text-sm font-black uppercase tracking-wide text-[#39251b] shadow-[5px_5px_0_#39251b] transition-transform hover:-translate-y-1"
            >
              My Story
            </Link>
          </div>
        </div>

        <div className="relative min-h-[430px]">
          <div className="absolute right-8 top-0 h-24 w-24 rounded-full bg-[#7ac7c4]" />
          <div className="absolute bottom-8 left-0 h-28 w-28 rounded-full bg-[#f06b4f]" />
          <div className="relative mx-auto w-full max-w-sm rotate-3 rounded-[2rem] border-4 border-[#39251b] bg-white p-4 shadow-[12px_12px_0_#39251b]">
            <div className="absolute -top-5 left-1/2 h-10 w-28 -translate-x-1/2 rotate-2 bg-[#f7d66b]/80" />
            <div className="aspect-[3/4] overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-[#f7d66b] via-[#f6a6bc] to-[#7ac7c4]">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt={displayName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center font-serif text-4xl font-black text-white">
                  Portfolio Studio
                </div>
              )}
            </div>
            <p className="pt-4 text-center font-hand text-2xl font-black text-[#39251b]">
              {home.imageCaption || 'click to see the journey'}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-4 border-[#39251b] bg-[#7ac7c4] py-8">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 sm:grid-cols-3">
          {stats.map(({ value, label }) => (
            <div key={label} className="rounded-3xl border-2 border-[#39251b] bg-white p-6 text-center shadow-[6px_6px_0_#39251b]">
              <p className="font-serif text-4xl font-black text-[#ee5b3e]">{value}</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-wide text-[#39251b]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-center text-lg font-bold text-[#6b4a2d]">{home.dreamIntro || 'The place where your fashion and design dream becomes'}</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {promises.map((promise) => (
            <div key={promise.title} className="rounded-[2rem] border-2 border-[#39251b] bg-white p-8 text-center shadow-[7px_7px_0_#39251b]">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#f9a51a] text-3xl">
                {promise.icon || '✨'}
              </div>
              <h2 className="font-serif text-3xl font-black text-[#39251b]">{promise.title}</h2>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-bold uppercase tracking-[0.3em] text-[#ee5b3e]">{home.featuredEyebrow || 'Welcome to the studio'}</p>
            <h2 className="mt-2 font-serif text-4xl font-black text-[#39251b]">{home.featuredTitle || 'Featured Work'}</h2>
          </div>
          <Link to="/projects" className="font-black uppercase text-[#39251b] underline decoration-[#ee5b3e] decoration-4 underline-offset-4">
            View all
          </Link>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        {!error && featured.length === 0 && (
          <p className="rounded-2xl border-2 border-dashed border-[#39251b] bg-white p-6 text-[#6b4a2d]">
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
