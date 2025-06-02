using BooksApi.Data;
using BooksApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace BooksApi.Services;

public interface IBookService
{
    Task<IEnumerable<Book>> GetAllBooks();
    Task<Book?> GetBookById(int id);
    Task<Book> AddBook(Book book);
    Task<Book?> UpdateBook(int id, Book book);
    Task<bool> DeleteBook(int id);
    Task<IEnumerable<Book>> SearchBooks(string searchTerm);
}

public class BookService : IBookService
{
    private readonly ApplicationDbContext _context;

    public BookService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Book>> GetAllBooks()
    {
        return await _context.Books.ToListAsync();
    }

    public async Task<Book?> GetBookById(int id)
    {
        return await _context.Books.FindAsync(id);
    }

    public async Task<Book> AddBook(Book book)
    {
        _context.Books.Add(book);
        await _context.SaveChangesAsync();
        return book;
    }

    public async Task<Book?> UpdateBook(int id, Book book)
    {
        var existingBook = await _context.Books.FindAsync(id);
        if (existingBook == null)
            return null;

        existingBook.Title = book.Title;
        existingBook.Author = book.Author;
        existingBook.Description = book.Description;
        existingBook.Price = book.Price;
        existingBook.Category = book.Category;
        existingBook.PublishedDate = book.PublishedDate;
        existingBook.StockQuantity = book.StockQuantity;
        existingBook.ImageUrl = book.ImageUrl;

        await _context.SaveChangesAsync();
        return existingBook;
    }

    public async Task<bool> DeleteBook(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
            return false;

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Book>> SearchBooks(string searchTerm)
    {
        return await _context.Books
            .Where(b => 
                b.Title.Contains(searchTerm) || 
                b.Author.Contains(searchTerm) || 
                b.Description.Contains(searchTerm) ||
                b.Category.Contains(searchTerm))
            .ToListAsync();
    }
} 