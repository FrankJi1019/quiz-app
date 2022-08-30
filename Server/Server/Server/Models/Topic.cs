using System.ComponentModel.DataAnnotations;

namespace Server.Models; 

public class Topic {
    
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }
    
    public ICollection<Quiz> Quizzes { get; set; }

}