import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="font-serif text-lg font-semibold tracking-tight">
          Your Name
        </NavLink>
        <ul className="flex gap-6 text-sm">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'text-stone-900 font-medium'
                    : 'text-stone-500 hover:text-stone-900 transition-colors'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
