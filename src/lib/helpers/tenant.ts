/**
 * Extract subdomain from host header
 * localhost:3000 -> null
 * firm-name.localhost:3000 -> "firm-name"
 * firm-name.casestream.com -> "firm-name"
 */
export function getSubdomainFromHost(host: string | null): string | null {
  if (!host) return null;

  // Remove port if present
  const hostWithoutPort = host.split(":")[0];

  // Split by dots
  const parts = hostWithoutPort.split(".");

  // If it's localhost or has less than 2 parts, no subdomain
  if (parts.length < 2 || hostWithoutPort === "localhost") {
    return null;
  }

  // If it's *.localhost:3000, return the subdomain (first part)
  if (
    parts[parts.length - 1] === "localhost" ||
    parts[parts.length - 2] === "localhost"
  ) {
    return parts[0];
  }

  // If it's *.casestream.com or similar, return the subdomain (first part)
  // Assuming domain is always the last 2 parts (casestream.com, example.com, etc.)
  if (parts.length >= 2) {
    return parts[0];
  }

  return null;
}

/**
 * Generate tenant-specific URLs based on deployment environment
 * Dev: http://firm-name.localhost:3000/dashboard
 * Prod: https://firm-name.casestream.com/dashboard
 */
export function getTenantUrl(
  accountSlug: string,
  pathname: string = "/dashboard",
): string {
  const isDev = process.env.NODE_ENV === "development";
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || "casestream.com";

  if (isDev) {
    // Development: http://firm-name.localhost:3000
    return `http://${accountSlug}.localhost:3000${pathname}`;
  }

  // Production: https://firm-name.{NEXT_PUBLIC_BASE_DOMAIN}
  return `https://${accountSlug}.${baseDomain}${pathname}`;
}
