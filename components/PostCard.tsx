import Link from 'next/link';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import type { Post } from '@/lib/posts';

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {post.title}
        </h2>
      </Link>
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <time dateTime={post.date}>
          {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
        </time>
        {post.tags.length > 0 && (
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
        {post.excerpt || post.content.slice(0, 200).replace(/[#*`]/g, '') + '...'}
      </p>
    </article>
  );
}
