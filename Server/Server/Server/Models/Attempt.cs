namespace Server.Models; 

public class Attempt {
    
    public int Id { get; set; }
    
    public Question Question { get; set; }
    
    public Option Option { get; set; }
    
    public Session Session { get; set; }
    
}