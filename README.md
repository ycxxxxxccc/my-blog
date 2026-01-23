# 我的个人博客

一个使用 Next.js 14+ 构建的现代化个人博客，支持 Markdown 文章、深色模式和响应式设计。
这是一段测试文字。测试测试。

## 特性

- ✅ **现代化设计**：使用 Tailwind CSS 构建的精美响应式界面
- ✅ **Markdown 支持**：支持 Markdown 和 MDX 格式文章
- ✅ **深色模式**：内置深色/浅色主题切换
- ✅ **标签系统**：文章可以添加多个标签
- ✅ **代码高亮**：内置代码语法高亮
- ✅ **SEO 友好**：优化的元数据和结构
- ✅ **快速加载**：静态站点生成，性能卓越

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 添加新文章

1. 在 `posts/` 目录下创建一个新的 `.md` 或 `.mdx` 文件
2. 文件必须包含以下 frontmatter：

```yaml
---
title: 文章标题
date: YYYY-MM-DD
excerpt: 文章摘要
tags: [标签1, 标签2]
---
```

3. 在 frontmatter 下方编写你的 Markdown 内容

### 示例文章

```markdown
---
title: 我的第一篇文章
date: 2026-01-18
excerpt: 这是一篇示例文章
tags: [博客, 测试]
---

# 标题

这里是文章内容...

```javascript
const hello = 'world';
```

## 链接

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 部署

### Vercel

最简单的部署方式是使用 [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

### 其他平台

你也可以部署到 Netlify、Railway 等支持 Next.js 的平台。
