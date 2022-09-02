namespace Server.Dto; 

public class QuizOutputDto {
    public int Id { get; set; }
    
    public string Name { get; set; }

    public string? Description { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public string AuthorId { get; set; }

    public ICollection<string> Topics { get; set; }

}