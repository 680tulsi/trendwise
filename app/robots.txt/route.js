export async function GET() {
  const content = `
User-agent: *
Allow: /

Disallow: /admin

Sitemap: ${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/sitemap.xml
`.trim();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
