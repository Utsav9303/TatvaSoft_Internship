using BooksApi.Entities.Entities;

namespace BooksApi.Entities.Repositories.Interface
{
    public interface IBookRepository
    {
        Task InsertBook(Books book);
        Books GetById(int id);
        IEnumerable<Books> GetAll();
    }
}
