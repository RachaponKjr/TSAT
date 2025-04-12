// components/Article.tsx
import React from 'react';

const Article = ({ htmlContent }: { htmlContent: string }) => {
  return (
    <div
      className="article-container px-6 md:px-72 py-8"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default Article;
