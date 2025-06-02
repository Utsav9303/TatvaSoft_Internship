using BooksApi.Entities.Context;
using BooksApi.Entities.Entities;
using BooksApi.Entities.Repositories.Interface;

namespace BooksApi.Entities.Repositories
{
    public class BookRepository(BookDbContext bookDbContext)   : IBookRepository
    {
        private readonly BookDbContext _dbContext = bookDbContext;

        public async Task InsertBook(BookDetails bookDetails)
        {
            await _dbContext.BookDetails.AddAsync(bookDetails);
            await _dbContext.SaveChangesAsync();
        }

        public BookDetails GetById(int id)
        {
            return _dbContext.BookDetails.Where(x => x.Id == id).FirstOrDefault();
        }
        
        public async Task DeleteBook(int id)
        {
            var book = _dbContext.BookDetails.FirstOrDefault(x => x.Id == id);
            if (book != null)
            {
                _dbContext.BookDetails.Remove(book);
                await _dbContext.SaveChangesAsync();
            }
        }
        
        public async Task UpdateBook(BookDetails bookDetails)
        {
            _dbContext.BookDetails.Update(bookDetails);
            await _dbContext.SaveChangesAsync();
        }
    }
}