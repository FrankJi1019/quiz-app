using Server.Data;
using Server.Models;

namespace Server.Repositories; 

public class TopicRepository {
    
    private readonly DataContext _context;

    public TopicRepository(DataContext dataContext) {
        this._context = dataContext;
    }
    
    public ICollection<Topic> GetAll() {
        return this._context.Topics.ToList();
    }

    public Topic? GetOneById(int id) {
        return this._context.Topics.FirstOrDefault(x => x.Id == id);
    }
    
    public Topic? GetOneByName(string name) {
        return this._context.Topics.FirstOrDefault(x => x.Name == name);
    }

    public bool IsTopicExist(Topic topic) {
        return this._context.Topics.Any(x => x.Equals(topic));
    }
    
    public Topic AddTopic(Topic topic) {
        var existingTopic = this._context.Topics.FirstOrDefault(x => x.Equals(topic));
        if (existingTopic != null) return topic;
        topic.Name = topic.Name.ToLower();
        var entityEntry = this._context.Topics.Add(topic);
        this._context.SaveChanges();
        return entityEntry.Entity;
    }
    
    public Topic? DeleteTopic(int id) {
        var topic = this._context.Topics.FirstOrDefault(x => x.Id == id);
        if (topic == null) return null;
        var entityEntry = this._context.Topics.Remove(topic);
        this._context.SaveChanges();
        return entityEntry.Entity;
    }
    
    public Topic? UpdateTopic(int id, Topic topic) {
        topic.Id = id;
        if (!this.IsTopicExist(topic)) {
            return null;
        } else {
            var entityEntry = this._context.Topics.Update(topic);
            this._context.SaveChanges();
            return entityEntry.Entity;
        }
    }

    public ICollection<Quiz> GetQuizzesByTopic(Topic topic) {
        var quizzes = this._context.Quizzes
            .Where(x => x.Topics
                .Any(y => y.Id == topic.Id)
            )
            .ToList();
        return quizzes;
    } 
    
}