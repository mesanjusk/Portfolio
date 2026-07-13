import Image from "next/image";
import type { Profile } from "@/content/profile";
import { PageEnter } from "@/components/shared/page-enter";

export function HomeSection({ profile }: { profile: Profile }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
      <PageEnter className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        {profile.avatarUrl && (
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[45%_55%_60%_40%/45%_55%_45%_55%] border border-ink/10 sm:h-32 sm:w-32">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
        )}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {profile.role} · {profile.institute}
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-medium leading-snug text-ink sm:text-4xl">
            {profile.bio}
          </h2>
        </div>
      </PageEnter>

      <PageEnter delay={0.1}>
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {profile.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-ink/10 bg-paper-deep/40 p-5 text-center"
            >
              <p className="font-display text-3xl text-accent">{stat.value}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </PageEnter>

      <PageEnter delay={0.18}>
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {profile.values.map((value) => (
            <div key={value.title}>
              <h3 className="font-display text-xl text-ink">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </PageEnter>
    </div>
  );
}
