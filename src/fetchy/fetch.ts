import { API_BASE_URL, API_OPTIONS } from "../constants";

export const fetchMovies = async (query,setMoviesList, setErrorMessage, setIsLoading, page) => {
    try {
      setIsLoading(true);
      let endpoint = `${API_BASE_URL}/discover/movie?page=${page}&sort_by=popularity.desc`;
      if (query) {
        endpoint = `${API_BASE_URL}/search/movie?query=${query}`;
      }

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Error Fetching Movies.');
      }

      const result = await response.json();

      if (result.Response === 'False') {
        setErrorMessage(result.Error || 'Failed to fetch movies');
        setMoviesList([]);
        return;
      }

      setMoviesList(result.results || []);
      setErrorMessage('');
    } catch (error: unknown) {
      console.error('Error:', error);
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
