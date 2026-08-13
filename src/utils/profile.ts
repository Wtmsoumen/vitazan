import type { User } from "@/context/AuthContext";

const PROFILE_UPLOAD_BASE =
  "https://vitazan.webtechnomind.in/public/uploads/profile/";

function withCacheBuster(url: string, updatedAt?: string): string {
  if (!updatedAt) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${encodeURIComponent(updatedAt)}`;
}

/** Prefer full image_url from API; fall back to profile_photo filename. */
export function getProfileImageUrl(
  user: Pick<User, "image_url" | "profile_photo" | "updated_at"> | null | undefined
): string | undefined {
  if (!user) return undefined;
  if (user.image_url) return withCacheBuster(user.image_url, user.updated_at);
  if (!user.profile_photo) return undefined;
  if (user.profile_photo.startsWith("http")) {
    return withCacheBuster(user.profile_photo, user.updated_at);
  }
  return withCacheBuster(`${PROFILE_UPLOAD_BASE}${user.profile_photo}`, user.updated_at);
}

export function buildProfileFormFromUser(user: User | null) {
  return {
    name: user?.name ?? "",
    gender: user?.gender ?? "",
    dob: user?.dob ?? "",
    address: user?.address ?? "",
    address_2: user?.address_2 ?? "",
    city: user?.city ?? "",
    country_id: user?.country_id != null ? String(user.country_id) : "",
    zipcode: user?.zipcode ?? "",
  };
}
