using BooksApi.Entities.Entities;
using Microsoft.EntityFrameworkCore;

namespace BooksApi.Entities.Context
{
    public class BookDbContext : DbContext
    {
        public DbSet<Books> Books { get; set; }

        public DbSet<User> Users { get; set; }

        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }
    }
}
