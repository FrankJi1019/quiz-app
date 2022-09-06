namespace Server.Models; 

public class Session {
    
    public int Id { get; set; }
    
    public DateTime StartedAt { get; set; } = DateTime.Now;
    
    public Quiz Quiz { get; set; }
    
    public User User { get; set; }

    public SessionState State { get; set; } = SessionState.ACTIVE;
    
    public ICollection<Attempt> Attempts { get; set; }

}