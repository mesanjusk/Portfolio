import { Mail, Camera, Briefcase, Palette } from "lucide-react";
import type { Profile } from "@/content/profile";
import { PageEnter } from "@/components/shared/page-enter";

export function ContactSection({ profile }: { profile: Profile }) {
  const links = [
    { key: "email", label: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { key: "instagram", label: "Instagram", href: profile.social.instagram, icon: Camera },
    { key: "behance", label: "Behance", href: profile.social.behance, icon: Palette },
    { key: "linkedin", label: "LinkedIn", href: profile.social.linkedin, icon: Briefcase },
  ];

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-10 sm:py-24">
      <PageEnter>
        <p className="text-balance text-lg leading-relaxed text-ink-soft">
          If any room behind you left a question, a commission idea, or just a
          hello — this door is always open.
        </p>
      </PageEnter>

      <PageEnter delay={0.1}>
        <ul className="mt-10 divide-y divide-ink/10 rounded-2xl border border-ink/10">
          {links.map(({ key, label, href, icon: Icon }) => (
            <li key={key}>
              <a
                href={href}
                target={key === "email" ? undefined : "_blank"}
                rel={key === "email" ? undefined : "noreferrer"}
                className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-ink/[0.03]"
              >
                <Icon className="h-5 w-5 text-accent" aria-hidden />
                <span className="font-display text-lg text-ink group-hover:text-accent">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </PageEnter>
    </div>
  );
}
