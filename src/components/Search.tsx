import React from 'react';

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className='search'>
      <div>
        <img src="search.svg" alt="search" />
        <input
          name="search"
          type="text"
          placeholder="Search through thousands of movies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
