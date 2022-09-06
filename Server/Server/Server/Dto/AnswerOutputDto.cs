namespace Server.Dto; 

public class AnswerOutputDto {
    
    public int QuestionId { get; set; }
    
    public string QuestionContent { get; set; }
    
    public string CorrectAnswer { get; set; }
    
    public string UserAnswer { get; set; }
    
    public bool IsCorrect { get; set; }
    
}