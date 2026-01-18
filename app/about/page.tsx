export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          关于我
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              你好！欢迎来到我的个人博客。
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              这里是我分享技术、记录生活和思考的地方。我热衷于探索新技术，
              希望通过博客记录我的学习旅程和心得体会。
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              感谢你的访问，如果你对我的文章有任何想法或建议，欢迎与我交流。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
