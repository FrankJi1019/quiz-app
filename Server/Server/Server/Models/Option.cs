using System.ComponentModel.DataAnnotations;

namespace Server.Models; 

public class Option {
    
    public int Id { get; set; }

    [Required]
    public string Content { get; set; }

    [Required]
    public bool IsCorrect { get; set; }

    public Question Question { get; set; }

}