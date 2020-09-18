import React from 'react';

import './styles.css';

type Props = {
  totalPages?: number;
  goToPage: Function;
  activePage: number;
};

const Pagination: React.FC<Props> = ({
  totalPages = 0,
  goToPage,
  activePage,
}) => {
  const paginationItems = Array.from(Array(totalPages).keys());

  return (
    <div className="pagination-container">
      {paginationItems.map((item) => (
        <button
          key={item}
          className={`pagination-item ${
            activePage === item ? 'active' : 'inactive'
          }`}
          onClick={() => goToPage(item)}
        >
          {item + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
