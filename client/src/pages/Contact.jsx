import { useEffect, useState } from 'react';
import { fetchProfile } from '../api/client.js';

const socialLinks = [
  { key: 'email', label: 'Email', hrefPrefix: 'mailto:' },
  { key: 'instagram', label: 'Instagram', hrefPrefix: '' },
  { key: 'linkedin', label: 'LinkedIn', hrefPrefix: '' },
  { key: 'behance', label: 'Behance', hrefPrefix: '' },
];

export default function Contact() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile()
      .then(setProfile)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-serif text-3xl font-semibold">Get in Touch</h1>
      <p className="mt-4 max-w-xl text-stone-600">
        Interested in collaborating, commissioning work, or just want to say hi? Reach out
        through any of the channels below.
      </p>

      {error && <p className="mt-6 text-red-600">{error}</p>}

      {profile && (
        <ul className="mt-8 space-y-3">
          {socialLinks.map(({ key, label, hrefPrefix }) => {
            const value = profile.social?.[key];
            if (!value) return null;
            return (
              <li key={key}>
                <a
                  href={`${hrefPrefix}${value}`}
                  target={hrefPrefix ? '_blank' : undefined}
                  rel="noreferrer"
                  className="text-lg text-stone-700 underline decoration-stone-300 underline-offset-4 hover:text-stone-900"
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
