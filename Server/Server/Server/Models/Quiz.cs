using System.ComponentModel.DataAnnotations;

namespace Server.Models; 

public class Quiz {
    
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }

    public string? Description { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    
    [Required]
    public string AuthorId { get; set; }
    
    public ICollection<Topic> Topics { get; set; }
    
    public ICollection<Question> Questions { get; set; }

    public override bool Equals(object? obj) {
        if (obj == null) {
            return false;
        } else if (this.GetType() != obj.GetType()) {
            return false;
        }
        var quiz = (Quiz) obj;
        return this.Id == quiz.Id;
    }
}