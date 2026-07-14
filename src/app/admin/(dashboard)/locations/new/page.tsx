import Link from "next/link";
import { NewRoomForm } from "@/components/admin/new-room-form";

export default function NewLocationPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm font-semibold text-ink-soft hover:text-ink">
        ← Back
      </Link>
      <h1 className="mt-4 font-display text-3xl text-ink">New room</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Add a new room to the map. Photos can be added once it&apos;s created.
      </p>
      <NewRoomForm />
    </div>
  );
}
