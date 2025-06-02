using BooksApi.Entities.Entities;
using BooksApi.Entities.Repositories.Interface;
using BooksApi.Services.Services.Interface;

namespace BooksApi.Services.Services
{
    // For CRUD on books
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        // To Get All Books
        public IEnumerable<Books> GetAll()
        {
            return _bookRepository.GetAll();
        }

        // To Get Single Book
        public Books GetBookById(int id)
        {
            return _bookRepository.GetById(id);
        }

        public async Task InsertBook(Books book)
        {
            await _bookRepository.InsertBook(book);
        }

        // To Update Book
        // To Delete Book
    }
}
