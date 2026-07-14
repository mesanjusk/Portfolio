"use client";

import { useState } from "react";
import { deleteLocationAction } from "@/app/admin/(dashboard)/actions";

export function DeleteRoomButton({ locationId }: { locationId: string }) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="text-xs font-semibold uppercase tracking-wide text-red-700"
      >
        Delete room
      </button>
    );
  }

  return (
    <form action={deleteLocationAction.bind(null, locationId)}>
      <button
        type="submit"
        className="text-xs font-semibold uppercase tracking-wide text-red-700 underline"
      >
        Confirm delete — this can&apos;t be undone
      </button>
    </form>
  );
}
