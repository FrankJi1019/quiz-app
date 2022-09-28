using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Repositories;

public class SessionRepository {

    private readonly DataContext _context;

    public SessionRepository(DataContext context) {
        this._context = context;
    }

    public ICollection<Session> GetUserSessions(string username, int quizId, SessionState state) {
        var userSessions = this._context.Sessions
            .Where(x => x.User.Username == username)
            .Where(x => quizId == -1 || x.Quiz.Id == quizId)
            .Where(x => state == 0 || x.State == state)
            .ToList();
        return userSessions;
    }

    public Session CreateUserSession(Session session) {
        var entityEntry = this._context.Sessions.Add(session);
        this._context.Quizzes.Update(session.Quiz);
        this._context.SaveChanges();
        return entityEntry.Entity;
    }

    public Session? DeleteSession(int id) {
        var session = this._context.Sessions.FirstOrDefault(x => x.Id == id);
        if (session == null) return null;
        var entityEntry = this._context.Sessions.Remove(session);
        this._context.SaveChanges();
        return entityEntry.Entity;
    }

    public Session? FinishSession(int id) {
        var session = this._context.Sessions.FirstOrDefault(x => x.Id == id);
        if (session == null) return null;
        session.State = SessionState.FINISHED;
        var entityEntry = this._context.Sessions.Update(session);
        this._context.SaveChanges();
        var updatedSession = this._context.Sessions
            .Where(x => x.Id == entityEntry.Entity.Id)
            .Include(x => x.User)
            .FirstOrDefault();
        return updatedSession;
    }

    public bool IsSessionExist(int id) {
        return this._context.Sessions.Any(x => x.Id == id);
    }

    public Session? GetOneById(int id) {
        return this._context.Sessions
            .Where(x => x.Id == id)
            .Include(x => x.Quiz)
            .Include(x => x.User)
            .FirstOrDefault();
    }
    
    

}