using Server.Models;

namespace Server.Dto; 

public class SessionOutputDto {
    
    public int Id { get; set; }
    
    public DateTime StartedAt { get; set; }
    
    public int QuizId { get; set; }
    
    public string Username { get; set; }

    public SessionState State { get; set; }
    
}