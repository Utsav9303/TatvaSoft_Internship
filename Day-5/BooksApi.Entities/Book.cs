using System.ComponentModel.DataAnnotations;

namespace BooksApi.Entities;

public class Book
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(100)]
    public string Author { get; set; } = string.Empty;
    
    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;
    
    [Required]
    public decimal Price { get; set; }
    
    public string Category { get; set; } = string.Empty;
    
    public DateTime PublishedDate { get; set; }
    
    public int StockQuantity { get; set; }
    
    public string ImageUrl { get; set; } = string.Empty;
} 