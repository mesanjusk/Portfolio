import { HomeExperience } from "@/components/experience/home-experience";
import { getLocations } from "@/content/locations";
import { getProfile } from "@/content/profile";

export default async function Page() {
  const [locations, profile] = await Promise.all([getLocations(), getProfile()]);
  return <HomeExperience locations={locations} profile={profile} />;
}
