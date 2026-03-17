import { fetchGraphQL } from '@/lib/graphql';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

async function getCategoryData(slug) {
  const query = `
    query GetCategory($id: ID!) {
      category(id: $id, idType: SLUG) {
        name
        description
        posts {
          nodes {
            id
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL(query, { id: slug });
    return data.category;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export default async function CategoryPage({ params }) {
  const category = await getCategoryData(params.slug);

  if (!category) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="min-h-[50vh] flex items-center justify-center pt-32">
          <h1 className="text-2xl font-black tracking-tighter uppercase">Category not found</h1>
        </div>
        <Footer />
      </main>
    );
  }

  const posts = category.posts?.nodes || [];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-20 text-center">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 leading-none uppercase mb-8">
              {category.name}
            </h1>
            {category.description && (
              <p className="mx-auto max-w-2xl text-lg font-medium text-zinc-500 leading-relaxed uppercase tracking-wide">
                {category.description}
              </p>
            )}
            <div className="w-24 h-1 bg-zinc-900 mx-auto mt-12" />
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link key={post.id} href={`/${post.slug}`} className="group flex flex-col h-full bg-zinc-50 rounded-[2rem] overflow-hidden border border-zinc-100 transition-all hover:border-zinc-300 hover:shadow-xl">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {post.featuredImage?.node ? (
                      <Image 
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        src={post.featuredImage.node.sourceUrl} 
                        alt={post.featuredImage.node.altText || post.title} 
                        fill
                      />
                    ) : (
                      <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center text-zinc-400 font-bold text-xs uppercase tracking-widest">No Image</div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-10">
                    <div className="flex-1">
                      <time className="text-[10px] font-bold text-zinc-400 tracking-[0.2em] uppercase mb-4 block" dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString()}
                      </time>
                      <h3 className="text-2xl font-black text-zinc-900 tracking-tighter uppercase mb-4 group-hover:text-zinc-600 transition-colors">
                        {post.title}
                      </h3>
                      <div 
                        className="text-sm font-medium text-zinc-500 leading-relaxed line-clamp-3 uppercase tracking-tight" 
                        dangerouslySetInnerHTML={{ __html: post.excerpt }} 
                      />
                    </div>
                    <div className="mt-8 pt-8 border-t border-zinc-200 flex items-center justify-between">
                      <span className="text-[10px] font-black tracking-widest uppercase text-zinc-900 group-hover:translate-x-2 transition-transform">Read Article →</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-zinc-500 text-center col-span-full font-bold uppercase tracking-widest py-20">No articles found in this category.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
