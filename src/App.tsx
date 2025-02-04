import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import useDebounce from './hooks/use-debounce';
import Search from './components/Search';
import { API_BASE_URL, API_OPTIONS } from './constants';
import Loader from './components/Loader';
import MovieCard from './components/MovieCard';
import Pagination from './components/Pagination';
import { Movie } from './types/types';
import { fetchMovies } from './fetchy/fetch';

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const loadTrendingMovies = async (page: number = 1) => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      
      if (!response.ok) {
        throw new Error('Error Fetching Movies.');
      }
      
      const result = await response.json();
      setTrendingMovies(result.results);
      setTotalPages(result.total_pages);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  useEffect(() => {
    if (debouncedSearchQuery !== '') {
      fetchMovies(debouncedSearchQuery, setMoviesList, setErrorMessage, setIsLoading, currentPage);
    } else {
      fetchMovies('', setMoviesList, setErrorMessage, setIsLoading, currentPage);
    }
  }, [debouncedSearchQuery, currentPage]);

  useEffect(() => {
    loadTrendingMovies(currentPage);
  }, [currentPage]);

  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <Header />
        <Search 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.id}>
                  <p>{index + 1}</p>
                  <img 
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                    alt={movie.title} 
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
        
        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="all-movies">
              {moviesList.length > 0 ? (
                moviesList.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    {...movie}
                  />
                ))
              ) : (
                <p>No movies found.</p>
              )}
            </ul>
          )}
          <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
        </section>
      </div>
    </main>
  );
};

export default App;