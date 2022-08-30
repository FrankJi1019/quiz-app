namespace Server.Dto; 

public class CreateQuestionWithOptionDto {
    
    public string Content { get; set; }

    public string? Explanation { get; set; }
    
    public int QuizId { get; set; }
    
    public ICollection<CreateOptionDto> Options { get; set; }

}