import { fetchGraphQL } from '@/lib/graphql';
import Link from 'next/link';

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
      <div className="min-h-[50vh] flex items-center justify-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
      </div>
    );
  }

  const posts = category.posts?.nodes || [];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 pb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {category.name}
          </h1>
          {category.description && (
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              {category.description}
            </p>
          )}
        </div>
        
        <div className="mx-auto mt-16 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                  {post.featuredImage?.node ? (
                    <img className="h-48 w-full object-cover" src={post.featuredImage.node.sourceUrl} alt={post.featuredImage.node.altText || post.title} />
                  ) : (
                    <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                    <Link href={`/${post.slug}`} className="mt-2 block">
                      <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                      <div 
                        className="mt-3 text-base text-gray-500 line-clamp-3" 
                        dangerouslySetInnerHTML={{ __html: post.excerpt }} 
                      />
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="ml-3">
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No posts found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}
