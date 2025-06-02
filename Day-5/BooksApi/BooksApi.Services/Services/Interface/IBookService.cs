using BooksApi.Entities.Entities;

namespace BooksApi.Services.Services.Interface
{
    public interface IBookService
    {
        IEnumerable<Books> GetAll();
        Task InsertBook(Books book);
        Books GetBookById(int id);
    }
}
