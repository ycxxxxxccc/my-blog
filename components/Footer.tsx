export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} 我的博客. 保留所有权利。</p>
      </div>
    </footer>
  );
}
