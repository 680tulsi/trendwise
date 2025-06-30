import Navbar from "@/components/Navbar";
import CommentsSection from "@/components/CommentsSection";

export default async function ArticlePage({ params }) {
  const { slug } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${slug}`, {
    cache: "no-store",
  });

  if (res.status !== 200) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-3xl font-bold">404 | Article Not Found</h1>
      </div>
    );
  }

  const article = await res.json();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-4xl font-extrabold mb-4 text-green-400">{article.title}</h1>

        {article.media?.map((url, index) => (
          <img key={index} src={url} alt="Article" className="w-full rounded-lg shadow-lg mb-6" />
        ))}

        <p className="text-lg leading-7 text-gray-300">{article.content}</p>

        <CommentsSection slug={article.slug} />
      </main>
    </div>
  );
}

