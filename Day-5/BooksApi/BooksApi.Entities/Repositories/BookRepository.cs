using BooksApi.Entities.Context;
using BooksApi.Entities.Entities;
using BooksApi.Entities.Repositories.Interface;

namespace BooksApi.Entities.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly BookDbContext _dbContext;

        public BookRepository(BookDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task InsertBook(Books book)
        {
            await _dbContext.Books.AddAsync(book);
            await _dbContext.SaveChangesAsync();
        }

        public Books GetById(int id)
        {
            return _dbContext.Books.Where(x => x.Id == id).FirstOrDefault();
        }

        public IEnumerable<Books> GetAll()
        {
            return _dbContext.Books;
        }
    }
}
