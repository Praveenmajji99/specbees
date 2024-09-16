import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SortControl from '../components/SortControl';

type Article = {
  id: number;
  title: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
};

type SortOption = 'dateAsc' | 'dateDesc' | 'titleAsc' | 'titleDesc';

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('dateDesc');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://dummy-rest-api.specbee.site/api/v1/news');
        const fetchedArticles: Article[] = Array.isArray(response.data) ? response.data : [];
        setArticles(fetchedArticles);
        setFilteredArticles(fetchedArticles);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch articles.');
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const compareArticles = useCallback(
    (a: Article, b: Article, sortBy: SortOption) => {
      if (sortBy === 'dateAsc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === 'dateDesc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === 'titleAsc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'titleDesc') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    },
    []
  );

  const handleSort = useCallback((sortedItems: Article[]) => {
    console.log('handleSort called');
    // Only update filteredArticles if it actually changes to prevent unnecessary re-renders
    if (JSON.stringify(sortedItems) !== JSON.stringify(filteredArticles)) {
      setFilteredArticles(sortedItems);
    }
  }, [filteredArticles]);

  return (
    <div>
      <div>
        <label>Sort by: </label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value as SortOption)}>
          <option value="dateDesc">Date (Latest to Earliest)</option>
          <option value="dateAsc">Date (Earliest to Latest)</option>
          <option value="titleAsc">Title (A-Z)</option>
          <option value="titleDesc">Title (Z-A)</option>
        </select>
      </div>

      {!loading && !error && (
        <SortControl
          items={filteredArticles}
          sortBy={sortOption}
          onSort={handleSort}
          compareFn={compareArticles}
        />
      )}

      {loading ? (
        <p>Loading articles...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div key={article.id}>
                <h2>{article.title}</h2>
                <p>By {article.author} on {article.date}</p>
                <p>{article.category}</p>
              </div>
            ))
          ) : (
            <p>No articles available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
