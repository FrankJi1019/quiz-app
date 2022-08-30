using Server.Data;
using Server.Models;

namespace Server.Repositories; 

public class UserRepository {

    private readonly DataContext _context;

    public UserRepository(DataContext context) {
        this._context = context;
    }

    public User? GetUser(string username) {
        return this._context.Users.FirstOrDefault(x => x.Username == username);
    }

    public Setting? GetUserSetting(string username) {
        return this._context.Settings.FirstOrDefault(x => x.Username == username);
    }

    public bool IsUserExist(string username) {
        return this._context.Users.Any(x => x.Username == username);
    }

    public User AddUser(string username) {
        var user = new User { Username = username };
        var setting = new Setting { Username = username };
        var entityEntry = this._context.Users.Add(user);
        this._context.Settings.Add(setting);
        this._context.SaveChanges();
        return entityEntry.Entity;
    }

    public Setting? UpdateSetting(string username, Setting setting) {
        setting.Username = username;
        if (!this.IsUserExist(username)) return null;
        var entityEntry = this._context.Settings.Update(setting);
        this._context.SaveChanges();
        return entityEntry.Entity;
    }

}
