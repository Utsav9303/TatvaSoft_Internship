using BooksApi.Entities.Entities;
using BooksApi.Services.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BooksApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BookController : Controller
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService) 
        {
            _bookService = bookService;
        }

        [HttpPost]
        [Route("Add")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> AddBook([FromBody] Books book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _bookService.InsertBook(book);
            return Ok(new { message = "Book created successfully!", book });
        }

        [HttpGet]
        [Route("GetAll")]
        [Authorize(Roles = "Admin,User")]
        public ActionResult GetAll()
        {
            var books = _bookService.GetAll();
            return Ok(books);
        }

        [HttpGet]
        [Route("GetById/{id}")]
        [Authorize(Roles = "Admin,User")]
        public ActionResult GetById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid book ID");
            }

            var book = _bookService.GetBookById(id);

            if (book == null)
            {
                return NotFound("Book not found!");
            }

            return Ok(book);
        }

        // To Update Book
        // To Delete Book
    }
}
