namespace Server.Dto; 

public class CreateQuizDto {

    public string Name { get; set; }

    public string? Description { get; set; }

    public string AuthorUsername { get; set; }
    
    public ICollection<string> TopicStrings { get; set; }

}