export default function Footer() {
  return (
    <footer className="border-t border-stone-200 py-8">
      <div className="mx-auto max-w-5xl px-6 text-sm text-stone-500">
        <p>&copy; {new Date().getFullYear()} Your Name. NIFT Design Portfolio.</p>
      </div>
    </footer>
  );
}
