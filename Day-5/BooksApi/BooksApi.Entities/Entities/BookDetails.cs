using System.ComponentModel.DataAnnotations;

namespace BooksApi.Entities.Entities
{
    public class Books
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        [Required]
        [Range(0, 10000)]
        public decimal Price { get; set; }
    }
}
