import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/admin', label: 'Admin' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-[#39251b] bg-[#fff7cf]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="rounded-full border-2 border-[#39251b] bg-white px-4 py-2 font-serif text-lg font-black tracking-tight text-[#39251b] shadow-[4px_4px_0_#39251b]">
          PortfolioShala
        </NavLink>
        <ul className="flex gap-2 text-sm font-bold uppercase tracking-wide sm:gap-4">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 transition-colors ${
                    isActive
                      ? 'bg-[#ee5b3e] text-white'
                      : 'text-[#39251b] hover:bg-white'
                  }`
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
