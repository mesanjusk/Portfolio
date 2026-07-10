export default function Footer() {
  return (
    <footer className="border-t-4 border-[#39251b] bg-[#39251b] py-10 text-[#fff7cf]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm">
        <p>&copy; {new Date().getFullYear()} PortfolioShala. NIFT Design Portfolio.</p>
        <p className="font-bold uppercase tracking-[0.25em]">Let&apos;s stay connected ✨</p>
      </div>
    </footer>
  );
}
