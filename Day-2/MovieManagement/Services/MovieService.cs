using MovieManagement.Model;

namespace MovieManagement.Services
{
    public class MovieService
    {
        private List<Movie> movies;

        public MovieService()
        {
            movies = new List<Movie>()
            {
                new Movie() { Id = 1, Title = "Inception", Director = "Christopher Nolan", Genre = "Sci-Fi", ReleaseYear = 2010 },
                new Movie() { Id = 2, Title = "Interstellar", Director = "Christopher Nolan", Genre = "Sci-Fi", ReleaseYear = 2014 }
            };
        }

        public List<Movie> GetMovies() => movies;

        public Movie GetMovieById(int id) => movies.FirstOrDefault(m => m.Id == id);

        public void AddMovie(Movie movie)
        {
            movie.Id = movies.Count + 1;
            movies.Add(movie);
        }

        public int UpdateMovie(Movie updatedMovie)
        {
            var movie = GetMovieById(updatedMovie.Id);
            if (movie == null) return -1;

            movie.Title = updatedMovie.Title;
            movie.Director = updatedMovie.Director;
            movie.Genre = updatedMovie.Genre;
            movie.ReleaseYear = updatedMovie.ReleaseYear;
            return 1;
        }

        public int DeleteMovie(int id)
        {
            var movie = GetMovieById(id);
            if (movie == null) return -1;

            movies.Remove(movie);
            return 1;
        }
    }
}
