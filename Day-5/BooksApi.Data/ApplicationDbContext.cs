using Microsoft.EntityFrameworkCore;
using BooksApi.Entities;
using BC = BCrypt.Net.BCrypt;

namespace BooksApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed initial users
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Email = "admin@bookstore.com",
                    PasswordHash = BC.HashPassword("admin123"),
                    Role = "Admin",
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Id = 2,
                    Username = "user",
                    Email = "user@bookstore.com",
                    PasswordHash = BC.HashPassword("user123"),
                    Role = "User",
                    CreatedAt = DateTime.UtcNow
                }
            );

            // Seed initial books
            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = 1,
                    Title = "The Great Gatsby",
                    Author = "F. Scott Fitzgerald",
                    Description = "A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
                    Price = 9.99m,
                    Category = "Fiction",
                    PublishedDate = new DateTime(1925, 4, 10),
                    StockQuantity = 50,
                    ImageUrl = "https://example.com/gatsby.jpg"
                },
                new Book
                {
                    Id = 2,
                    Title = "To Kill a Mockingbird",
                    Author = "Harper Lee",
                    Description = "The story of racial injustice and the loss of innocence in the American South.",
                    Price = 12.99m,
                    Category = "Fiction",
                    PublishedDate = new DateTime(1960, 7, 11),
                    StockQuantity = 45,
                    ImageUrl = "https://example.com/mockingbird.jpg"
                }
            );
        }
    }
} 