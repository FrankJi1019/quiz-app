using Server.Data;
using Server.Dto;
using Server.Models;

namespace Server.Repositories; 

public class QuestionRepository {
    
    private readonly DataContext _context;

    public QuestionRepository(DataContext dataContext) {
        this._context = dataContext;
    }

    public ICollection<Question> GetAll() {
        return this._context.Questions.ToList();
    }

    public Question? GetOneById(int id) {
        return this._context.Questions.FirstOrDefault(x => x.Id == id);
    }

    public bool IsQuestionExist(int id) {
        return this._context.Questions.Any(x => x.Id == id);
    }

    public Question AddQuestion(Question question) {
        var existingQuestion = this._context.Questions.FirstOrDefault(x => x.Equals(question));
        if (existingQuestion != null) return question;
        var entityEntry = this._context.Questions.Add(question);
        this._context.SaveChanges();
        return entityEntry.Entity;
    }
    
    public Question? DeleteQuestion(int id) {
        var question = this._context.Questions.FirstOrDefault(x => x.Id == id);
        if (question == null) return null;
        var entityEntry = this._context.Questions.Remove(question);
        this._context.SaveChanges();
        return entityEntry.Entity;
    }
    
    public Question? UpdateQuestion(int id, Question question) {
        question.Id = id;
        if (!this.IsQuestionExist(question.Id)) {
            return null;
        } else {
            var entityEntry = this._context.Questions.Update(question);
            this._context.SaveChanges();
            return entityEntry.Entity;
        }
    }

    public Option? GetAnswer(int questionId) {
        var answer = this._context.Options.FirstOrDefault(x => x.Question.Id == questionId && x.IsCorrect);
        return answer;
    }

    public ICollection<Option>? GetOptionsOfQuestion(int questionId) {
        if (!this.IsQuestionExist(questionId)) return null;
        var options = this._context.Options.Where(x => x.Question.Id == questionId).ToList();
        return options;
    }

    public Question? GetQuestionByOption(int optionId) {
        return this._context.Questions
            .FirstOrDefault(x => x.Options.Any(y => y.Id == optionId));
    }

}