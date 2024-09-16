import React from 'react';
import ArticleCard from './ArticleCard';

type Article = {
  id: number;
  title: string;
  imageUrl: string;
  author: string;
  date: string;
};

const ArticleList: React.FC<{ articles: Article[] }> = ({ articles }) => (
  <div className="article-list">
    {articles.map(article => (
      <ArticleCard key={article.id} {...article} />
    ))}
  </div>
);

export default ArticleList;

