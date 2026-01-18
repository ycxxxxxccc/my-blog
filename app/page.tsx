import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            欢迎来到我的博客
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            分享技术、生活和思考
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              还没有文章，快去创建第一篇吧！
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              在 <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">posts</code> 目录下添加 <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">.md</code> 或 <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">.mdx</code> 文件
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
