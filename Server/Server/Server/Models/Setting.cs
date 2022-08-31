using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models; 

public class Setting {
    
    [Key]
    [ForeignKey("Users")]
    public string Username { get; set; }

    public int Theme { get; set; } = 0;

}
