import { fetchGraphQL } from '@/lib/graphql';
import { notFound } from 'next/navigation';

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
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Not Found' };
  
  return {
    title: `${post.title} | Ahaaq Auto Exchange`,
  };
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base text-gray-500">By {post.author?.node?.name}</p>
        </div>

        {post.featuredImage?.node && (
          <div className="mt-10 overflow-hidden rounded-xl">
            <img 
              src={post.featuredImage.node.sourceUrl} 
              alt={post.featuredImage.node.altText || post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <div 
          className="prose prose-lg prose-indigo mx-auto mt-16 max-w-3xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
