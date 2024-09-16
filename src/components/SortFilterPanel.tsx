import React from 'react';

const SortFilterPanel: React.FC<{
  onSortChange: (value: string) => void;
  onFilterChange: (filterType: string, value: string) => void;
}> = ({ onSortChange, onFilterChange }) => {
  return (
    <div className="sort-filter-panel">
      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="latest">Latest to Earliest</option>
        <option value="earliest">Earliest to Latest</option>
        <option value="title-asc">Title Ascending</option>
        <option value="title-desc">Title Descending</option>
      </select>

      {/* Filters for category and author */}
      <select onChange={(e) => onFilterChange('category', e.target.value)}>
        <option value="">All Categories</option>
        {/* Add dynamic categories */}
      </select>
      <select onChange={(e) => onFilterChange('author', e.target.value)}>
        <option value="">All Authors</option>
        {/* Add dynamic authors */}
      </select>
    </div>
  );
};

export default SortFilterPanel;
