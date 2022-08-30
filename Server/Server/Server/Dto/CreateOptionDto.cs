namespace Server.Dto; 

public class CreateOptionDto {
    
    public string Content { get; set; }

    public bool IsCorrect { get; set; }
    
    public int QuestionId { get; set; }
    
}