using System.ComponentModel.DataAnnotations;

namespace Server.Models; 

public class User {
    
    [Key]
    public string Username { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;

}