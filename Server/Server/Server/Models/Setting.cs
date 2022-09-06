using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models; 

public class Setting {
    
    public int Id { get; set; }

    public int Theme { get; set; } = 0;
    
    public User User { get; set; }
    [ForeignKey("User")]
    public string username { get; set; }
    
}
