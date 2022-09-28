namespace Server.Dto; 

public class AnswerOutputDto {

    public QuestionOutputDto Question { get; set; }
    
    public string CorrectAnswer { get; set; }
    
    public string UserAnswer { get; set; }
    
    public bool IsCorrect { get; set; }
    
}