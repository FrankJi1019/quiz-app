using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Repositories; 

public class QuizRepository {

    private readonly DataContext _context;

    public QuizRepository(DataContext dataContext) {
        this._context = dataContext;
    }

    public ICollection<Quiz> GetAll(bool ignoreEmpty) {
        return this._context.Quizzes
            .Where(x => !ignoreEmpty || x.Questions.Count != 0)
            .Select(x => new Quiz {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                CreatedAt = x.CreatedAt,
                QuestionCount = x.Questions.Count,
                SessionCount = x.Sessions.Count,
                AuthorName = x.Author.Username,
                TopicList = x.Topics.Select(y => y.Name).ToList()
            })
            .OrderByDescending(x => x.CreatedAt)
            .ToList();
    }

    public ICollection<Quiz> GetAllNonEmpty() {
        return this._context.Quizzes
            .Where(x => x.Questions.Count != 0)
            .Include(x => x.Questions)
            .OrderByDescending(x => x.CreatedAt)
            .ToList();
    }

    public Quiz? GetOneById(int id) {
        return this._context.Quizzes
                .Where(x => x.Id == id)
                .Select(x => new Quiz {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    CreatedAt = x.CreatedAt,
                    QuestionCount = x.Questions.Count,
                    SessionCount = x.Sessions.Count,
                    AuthorName = x.Author.Username,
                    TopicList = x.Topics.Select(y => y.Name).ToList()
                })
                .OrderByDescending(x => x.CreatedAt)
                .FirstOrDefault();  
    }

    public bool IsQuizExist(int id) {
        return this._context.Quizzes.Any(x => x.Id == id);
    }

    /**
     * If the quiz exists, return the quiz
     * If the quiz does not exist, create the quiz and return the created quiz
     */
    public Quiz AddQuiz(Quiz quiz) {
        var existQuiz = this._context.Quizzes.FirstOrDefault(x => x.Equals(quiz));
        if (existQuiz != null) return quiz;
        var entityEntry = this._context.Quizzes.Add(quiz);
        this._context.SaveChanges();
        return entityEntry.Entity;
    }

    /**
     * If a quiz with the id exists, delete the quiz and return it
     * If no quiz with the id exists, return null
     */
    public Quiz? DeleteQuiz(int id) {
        var quiz = this._context.Quizzes
            .Where(x => x.Id == id)
            .Include(x => x.Topics)
            .FirstOrDefault();
        if (quiz == null) return null;
        this._context.Quizzes.Remove(quiz);
        this._context.SaveChanges();
        return quiz;
    }
    
    public Quiz? UpdateQuiz(int id, Quiz updatedQuizValue) {
        this._context.Update(updatedQuizValue);
        this._context.SaveChanges();
        return updatedQuizValue;
    }

    public ICollection<Question>? GetAllQuestions(int quizId) {
        var quiz = this.GetOneById(quizId);
        if (quiz == null) return null;
        return this._context.Questions.Where(x => x.Quiz.Id == quizId).ToList();
    }

    public int GetQuestionNumber(int quizId) {
        var quiz = this.GetOneById(quizId);
        if (quiz == null) return -1;
        return this._context.Questions.Count(x => x.Quiz.Id == quizId);
    }

    public ICollection<Quiz> GetQuizzesByUser(string user) {
        var quizzes = this._context.Quizzes
            .Where(x => x.Author.Username == user)
            .Select(x => new Quiz {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                CreatedAt = x.CreatedAt,
                QuestionCount = x.Questions.Count,
                SessionCount = x.Sessions.Count,
                AuthorName = x.Author.Username,
                TopicList = x.Topics.Select(y => y.Name).ToList()
            })
            .ToList();
        return quizzes;
    }

    public ICollection<Quiz> GetUserAttemptedQuizzes(string username) {
        var quizzes = this._context.Sessions
            .Where(x => x.User.Username == username && x.State == SessionState.FINISHED)
            .Include(x => x.Quiz)
            .Select(x => x.Quiz)
            .Distinct()
            .Select(x => new Quiz {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                CreatedAt = x.CreatedAt,
                QuestionCount = x.Questions.Count,
                SessionCount = x.Sessions.Count,
                AuthorName = x.Author.Username,
                TopicList = x.Topics.Select(y => y.Name).ToList()
            })
            .ToList();
        return quizzes;
    }

    public ICollection<Quiz> GetTopPicks(int limit) {
        return this._context.Quizzes
            .OrderByDescending(x => x.Sessions.Count)
            .Select(x => new Quiz {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                CreatedAt = x.CreatedAt,
                QuestionCount = x.Questions.Count,
                SessionCount = x.Sessions.Count,
                AuthorName = x.Author.Username,
                TopicList = x.Topics.Select(y => y.Name).ToList()
            })
            .Take(limit)
            .ToList();
    }

    public ICollection<Quiz>? GetRelatedQuizzes(int id) {
        var quiz = this._context
            .Quizzes
            .Where(x => x.Id == id)
            .Include(x => x.Topics)
            .Include(x => x.Questions)
            .FirstOrDefault();
        if (quiz == null) return null;
        return this._context
            .Quizzes
            .Where(x => x.Topics.Any(t => quiz.Topics.Contains(t)))
            .Where(x => x.Questions.Count != 0)
            .Where(x => x.Id != id)
            .Select(x => new Quiz {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                CreatedAt = x.CreatedAt,
                QuestionCount = x.Questions.Count,
                SessionCount = x.Sessions.Count,
                AuthorName = x.Author.Username,
                TopicList = x.Topics.Select(y => y.Name).ToList()
            })
            .ToList();
    }

    public Quiz? AddTopicToQuiz(int quizId, string topicString) {
        var topic = this._context.Topics.FirstOrDefault(x => x.Name == topicString);
        var quiz = this._context.Quizzes
            .Where(x => x.Id == quizId)
            .Include(x => x.Topics)
            .FirstOrDefault();
        if (quiz == null) return null;
        if (topic == null) {
            topic = this._context.Topics.Add(new Topic {
                Name = topicString
            }).Entity;
            this._context.SaveChanges();
        }
        if (quiz.Topics.Contains(topic)) return quiz;
        quiz.Topics.Add(topic);
        this._context.Update(quiz);
        this._context.Update(topic);
        this._context.SaveChanges();
        return quiz;
    }

    public Quiz? RemoveTopicFromQuiz(int quizId, string topicString) {
        var topic = this._context.Topics.FirstOrDefault(x => x.Name == topicString);
        var quiz = this._context.Quizzes
            .Where(x => x.Id == quizId)
            .Include(x => x.Topics)
            .FirstOrDefault();
        if (quiz == null) return null;
        if (topic == null) return null;
        quiz.Topics.Remove(topic);
        this._context.Update(quiz);
        this._context.Update(topic);
        this._context.SaveChanges();
        return quiz;
    }

}