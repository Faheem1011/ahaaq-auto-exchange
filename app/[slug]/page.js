import { fetchGraphQL } from '@/lib/graphql';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

async function getPostBySlug(slug) {
  const query = `
    query GetPost($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        content
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL(query, { id: slug });
    return data.post;
  } catch (err) {
    console.error('Error fetching post:', err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };
  
  return {
    title: `${post.title} | Ahaaq Auto Exchange`,
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-24">
        <article className="mx-auto max-w-4xl px-8">
          <header className="mb-12 text-center">
            <time className="text-xs font-bold text-zinc-400 tracking-widest uppercase mb-4 block" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 leading-tight uppercase mb-6">
              {post.title}
            </h1>
            <p className="text-sm font-bold text-zinc-500 tracking-widest uppercase">By {post.author?.node?.name}</p>
          </header>

          {post.featuredImage?.node && (
            <div className="mb-16 relative aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-100">
              <Image 
                src={post.featuredImage.node.sourceUrl} 
                alt={post.featuredImage.node.altText || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div 
            className="prose prose-zinc prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-zinc-600 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
      <Footer />
    </main>
  );
}
