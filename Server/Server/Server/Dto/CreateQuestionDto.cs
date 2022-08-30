using Server.Models;

namespace Server.Dto; 

public class CreateQuestionDto {
    
    public string Content { get; set; }

    public string? Explanation { get; set; }
    
    public int QuizId { get; set; }
    
}