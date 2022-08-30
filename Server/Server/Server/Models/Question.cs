using System.ComponentModel.DataAnnotations;

namespace Server.Models; 

public class Question {
    
    public int Id { get; set; }

    [Required]
    public string Content { get; set; }

    public string Explanation { get; set; }
    
    public Quiz Quiz { get; set; }
    
    public ICollection<Option> Options { get; set; }

}