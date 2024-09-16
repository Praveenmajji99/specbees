import React from 'react';

type ArticleProps = {
  title: string;
  imageUrl: string;
  author: string;
  date: string;
};

const ArticleCard: React.FC<ArticleProps> = ({ title, imageUrl, author, date }) => (
  <div className="article-card">
    <img src={imageUrl} alt={title} />
    <h3>{title}</h3>
    <p>by {author} on {new Date(date).toLocaleDateString()}</p>
  </div>
);

export default ArticleCard;
