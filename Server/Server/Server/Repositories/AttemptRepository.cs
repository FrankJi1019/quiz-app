using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Repositories; 

public class AttemptRepository {

    private readonly DataContext _context;

    public AttemptRepository(DataContext context) {
        this._context = context;
    }

    public ICollection<Attempt> GetAttemptsBySession(int sessionId, bool eager = false) {
        var baseSet = this._context.Attempts.Where(x => x.Session.Id == sessionId);
        if (eager)
            baseSet = baseSet
                .Include(x => x.Question)
                .Include(x => x.Option);
        return baseSet.ToList();
    }

    public Attempt CreateAttempt(Attempt attempt) {
        var entityEntry = this._context.Attempts.Add(attempt);
        this._context.SaveChanges();
        return entityEntry.Entity;
    }

    public Attempt? GetAttemptBySessionAndQuestion(int sessionId, int questionId) {
        return this._context.Attempts
            .Where(x => x.Session.Id == sessionId && x.Question.Id == questionId)
            .Include(x => x.Option)
            .FirstOrDefault();
    }

    public Attempt ChangeOption(int attemptId, int optionId) {
        var option = this._context.Options.FirstOrDefault(x => x.Id == optionId)!;
        var attempt = this._context.Attempts.FirstOrDefault(x => x.Id == attemptId)!;
        attempt.Option = option;
        var entityEntry = this._context.Attempts.Update(attempt);
        this._context.SaveChanges();
        return entityEntry.Entity;
    }

    public Attempt? GetOneById(int id) {
        return this._context.Attempts
            .Where(x => x.Id == id)
            .Include(x => x.Question)
            .Include(x => x.Option)
            .FirstOrDefault();
    }

}