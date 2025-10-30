import LogoutButton from "@/components/shared/LogoutButton";

export default async function TenantHome({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div>
      <h1>Welcome to {slug}</h1>
      <p>This is the tenant home page (subdomain-based).</p>
      <LogoutButton />
    </div>
  );
}