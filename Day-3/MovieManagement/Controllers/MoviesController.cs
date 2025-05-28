using Microsoft.AspNetCore.Mvc;
using MovieManagement.Model;
using MovieManagement.Services;
using MovieManagement.Model;
using MovieManagement.Services;

namespace Movie_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MovieService _movieService;

        public MoviesController(MovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet("GetAllMovies")]
        public ActionResult<List<Movie>> GetAllMovies()
        {
            var movies = _movieService.GetMovies();
            return movies == null || movies.Count == 0 ? NotFound("No movies found") : Ok(movies);
        }

        [HttpGet("GetSingleMovie")]
        public ActionResult<Movie> GetMovie(int id)
        {
            var movie = _movieService.GetMovieById(id);
            return movie == null ? NotFound("Movie not found") : Ok(movie);
        }

        [HttpPost]
        public ActionResult AddMovie(Movie movie)
        {
            _movieService.AddMovie(movie);
            return Ok("Movie added successfully");
        }

        [HttpPut]
        public ActionResult UpdateMovie(Movie movieToBeUpdated)
        {
            var status = _movieService.UpdateMovie(movieToBeUpdated);
            return status == -1 ? NotFound("Movie not found") : Ok("Movie updated successfully");
        }

        [HttpDelete]
        public ActionResult DeleteMovie(int id)
        {
            var status = _movieService.DeleteMovie(id);
            return status == -1 ? NotFound("Movie not found") : Ok("Movie deleted successfully");
        }
    }
}
