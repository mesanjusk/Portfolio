import { useEffect, useState } from 'react';
import { fetchProfile } from '../api/client.js';

export default function About() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile()
      .then(setProfile)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return <div className="mx-auto max-w-5xl px-6 py-16 text-stone-500">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-10 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <div className="aspect-square overflow-hidden bg-stone-200">
            {profile.avatarUrl && (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <h1 className="font-serif text-3xl font-semibold">{profile.name}</h1>
          <p className="mt-1 text-stone-500">{profile.tagline}</p>
          <p className="mt-6 text-stone-600">{profile.bio}</p>

          <h2 className="mt-8 font-serif text-lg font-semibold">Education</h2>
          <p className="mt-2 text-stone-600">{profile.education}</p>

          <h2 className="mt-8 font-serif text-lg font-semibold">Skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.skills?.map((skill) => (
              <span
                key={skill}
                className="border border-stone-300 px-3 py-1 text-sm text-stone-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
