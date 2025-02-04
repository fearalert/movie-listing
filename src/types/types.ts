// Movie Interface
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  original_language: string;
  release_date: string;
}

// Partial Movie Type for MovieCard
type PartialMovie = Partial<Movie>;